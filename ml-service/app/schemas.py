from pydantic import BaseModel, Field


class StreamPoint(BaseModel):
    source: str
    timestamp: str
    value: float
    volume: float = 0
    sentiment: float = 0
    anomalyScore: float = Field(default=0.0, alias="anomalyScore")
    confidence: float = 0.0
    cluster: int = 0
    category: str = ""


class PredictionResponse(BaseModel):
    prediction: float
    confidence: float
    anomaly: bool
    sentimentLabel: str
    cluster: int


class ForecastResponse(BaseModel):
    forecast: list[float]
    lower: list[float]
    upper: list[float]


class MetricResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float

