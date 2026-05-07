# Deployment Guide

## Local Development

1. Create a `.env` file from `.env.example`.
2. Install dependencies for `frontend` and `backend`.
3. Install Python requirements in `ml-service`.
4. Start MongoDB and Redis locally.
5. Run `npm run dev` from the repository root.

## Docker Compose

```bash
docker compose up --build
```

This launches MongoDB, Redis, backend API, frontend, and the ML microservice.

## Environment Variables

- `MONGODB_URI` - Mongo connection string
- `JWT_SECRET` - JWT signing secret
- `CLIENT_URL` - Allowed frontend origin
- `FASTAPI_URL` - Python service URL
- `STREAM_INTERVAL_MS` - Stream tick interval

## Production Notes

- Put the frontend behind a CDN or static hosting service.
- Run MongoDB and Redis as managed services in production.
- Set secure JWT secrets and rotate credentials regularly.
- Use HTTPS and restrict CORS to the deployed frontend domain.
