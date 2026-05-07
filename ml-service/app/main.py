from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import StreamPoint, PredictionResponse, ForecastResponse, MetricResponse
from app.services import analytics

app = FastAPI(title="Real-Time Data Stream ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "ml-service"}


@app.post("/predict", response_model=PredictionResponse)
def predict(point: StreamPoint):
    return analytics.predict(point)


@app.post("/anomaly")
def anomaly(point: StreamPoint):
    return analytics.detect_anomaly(point)


@app.post("/cluster")
def cluster(point: StreamPoint):
    return analytics.cluster_point(point)


@app.post("/forecast", response_model=ForecastResponse)
def forecast(point: StreamPoint):
    return analytics.forecast(point)


@app.get("/metrics", response_model=MetricResponse)
def metrics():
    return analytics.model_metrics()


@app.post("/sentiment")
def sentiment(payload: dict):
    return analytics.sentiment_analysis(str(payload.get("text", "")))


@app.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    return await analytics.analyze_uploaded_file(file)

