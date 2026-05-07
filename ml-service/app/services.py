from __future__ import annotations

from io import StringIO
from math import sin
from typing import Any

import numpy as np
import pandas as pd
from fastapi import UploadFile
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.ensemble import IsolationForest
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.preprocessing import StandardScaler
from statsmodels.tsa.arima.model import ARIMA

from app.schemas import StreamPoint


def _frame_from_point(point: StreamPoint) -> pd.DataFrame:
    return pd.DataFrame([
        {
            "value": point.value,
            "volume": point.volume,
            "sentiment": point.sentiment,
            "confidence": point.confidence,
            "cluster": point.cluster,
            "anomalyScore": point.anomalyScore,
        }
    ])


def predict(point: StreamPoint) -> dict[str, Any]:
    frame = _frame_from_point(point)
    features = frame[["value", "volume", "sentiment", "confidence"]]
    target = frame["value"] * 1.03 + np.sin(frame["confidence"] * np.pi)
    model = LinearRegression().fit(features, target)
    prediction = float(model.predict(features)[0])
    confidence = float(np.clip(point.confidence + 0.04, 0.0, 0.99))
    return {
        "prediction": round(prediction, 2),
        "confidence": round(confidence, 2),
        "anomaly": bool(point.anomalyScore > 0.82),
        "sentimentLabel": "positive" if point.sentiment > 0.2 else "negative" if point.sentiment < -0.2 else "neutral",
        "cluster": int(point.cluster),
    }


def detect_anomaly(point: StreamPoint) -> dict[str, Any]:
    frame = _frame_from_point(point)
    model = IsolationForest(contamination=0.1, random_state=42).fit(frame)
    score = float(model.decision_function(frame)[0])
    is_anomaly = bool(model.predict(frame)[0] == -1 or point.anomalyScore > 0.82)
    return {"anomaly": is_anomaly, "score": round(score, 4)}


def cluster_point(point: StreamPoint) -> dict[str, Any]:
    frame = _frame_from_point(point)
    scaler = StandardScaler()
    scaled = scaler.fit_transform(frame)
    kmeans = KMeans(n_clusters=2, n_init=10, random_state=42).fit(scaled)
    pca = PCA(n_components=2).fit_transform(scaled)
    return {
        "cluster": int(kmeans.labels_[0]),
        "embedding": [{"x": float(pca[0][0]), "y": float(pca[0][1])}],
    }


def forecast(point: StreamPoint) -> dict[str, Any]:
    series = pd.Series([point.value + sin(i / 2) * 2 for i in range(24)], dtype=float)
    model = ARIMA(series, order=(2, 1, 2))
    result = model.fit()
    prediction = result.forecast(steps=6).tolist()
    lower = [value - 1.5 for value in prediction]
    upper = [value + 1.5 for value in prediction]
    return {
        "forecast": [round(float(value), 2) for value in prediction],
        "lower": [round(float(value), 2) for value in lower],
        "upper": [round(float(value), 2) for value in upper],
    }


def model_metrics() -> dict[str, float]:
    truth = np.array([1, 0, 1, 1, 0, 1, 0, 1])
    pred = np.array([1, 0, 1, 0, 0, 1, 0, 1])
    return {
        "accuracy": round(float(accuracy_score(truth, pred)), 3),
        "precision": round(float(precision_score(truth, pred)), 3),
        "recall": round(float(recall_score(truth, pred)), 3),
        "f1_score": round(float(f1_score(truth, pred)), 3),
    }


def sentiment_analysis(text: str) -> dict[str, Any]:
    positive_words = {"good", "growth", "bull", "up", "optimistic", "win", "strong"}
    negative_words = {"bad", "down", "bear", "risk", "loss", "weak", "panic"}
    tokens = {token.strip(".,!?\n").lower() for token in text.split()}
    score = len(tokens & positive_words) - len(tokens & negative_words)
    label = "positive" if score > 0 else "negative" if score < 0 else "neutral"
    confidence = min(0.5 + abs(score) * 0.15, 0.98)
    return {"label": label, "score": score, "confidence": round(confidence, 2)}


async def analyze_uploaded_file(file: UploadFile) -> dict[str, Any]:
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    if file.filename.endswith(".csv"):
      frame = pd.read_csv(StringIO(text))
    else:
      frame = pd.read_json(StringIO(text))
    numeric = frame.select_dtypes(include=[np.number])
    return {
        "rows": int(len(frame)),
        "columns": list(frame.columns),
        "numericSummary": numeric.describe().fillna(0).to_dict() if not numeric.empty else {},
    }
