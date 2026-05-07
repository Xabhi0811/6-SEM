# Real-Time Data Stream Visualization Dashboard

Premium full-stack data science dashboard with React, Express, FastAPI, Socket.IO, MongoDB, and real-time synthetic streams for IoT, markets, and social sentiment.

## Features

- Real-time streaming charts, anomaly detection, forecasting, clustering, and confidence visualization
- Dark/light mode, glassmorphism UI, responsive admin layout, and animated KPI cards
- JWT authentication with role-based access
- CSV/JSON dataset upload and live inference API
- MongoDB persistence and Socket.IO live updates
- Dockerized services for frontend, backend, and Python ML microservice

## Project Structure

- `frontend` - React + Vite + Tailwind dashboard
- `backend` - Node.js + Express + Socket.IO API
- `ml-service` - FastAPI machine learning microservice
- `docker` - Dockerfiles and compose configuration
- `sample-data` - synthetic stream and dataset examples
- `postman` - API testing collection

## Quick Start

1. Copy `.env.example` to `.env` and update secrets if needed.
2. Install dependencies in each workspace.
3. Start MongoDB and Redis locally or use Docker Compose.
4. Run `npm run dev` from the repository root.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### ML Service

```bash
cd ml-service
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Docker

Use `docker compose up --build` to launch the dashboard stack.

## Notes

- The system includes synthetic streaming generators for demo data.
- The ML service exposes prediction, anomaly detection, clustering, and forecasting endpoints.
- Sample auth credentials are controlled through environment variables in `.env`.
