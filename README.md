# WebGenerator

Monorepo for the AI Business Platform.

This repository contains the initial scaffold for the platform architecture described in the documentation.

## Workspace layout

- `apps/api`: API server
- `apps/worker`: background workers
- `packages/business-model`: shared domain model
- `packages/shared`: shared utilities and types
- `packages/capabilities/business-import`: example capability

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Build the workspace:

```bash
npm run build
```

3. Start the API server:

```bash
npm run dev:api
```

4. Start the worker process:

```bash
npm run dev:worker
```

## API Endpoints

### Root

- `GET /`
- Confirms the API is running and returns metadata.

### Health

- `GET /health`
- Returns uptime, timestamp, version, and health status.

### API documentation

- `GET /docs`
- Returns available routes and example usage.

### Create Business

- `POST /api/v1/businesses`

Request example:

```bash
curl -X POST http://localhost:4000/api/v1/businesses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Imported Business",
    "source": {
      "type": "instagram",
      "url": "https://instagram.com/example"
    }
  }'
```

A lighter alias payload is also accepted:

```bash
curl -X POST http://localhost:4000/api/v1/businesses \
  -H "Content-Type: application/json" \
  -d '{
    "instagramUrl": "https://instagram.com/example"
  }'
```

Expected success response:

```json
{
  "id": "business_1",
  "status": "created"
}
```

### Get Job

- `GET /api/v1/jobs/{jobId}`

Example:

```bash
curl http://localhost:4000/api/v1/jobs/job_1
```

Expected success response:

```json
{
  "id": "job_1",
  "businessId": "business_1",
  "type": "website-generation",
  "status": "running",
  "progress": 10,
  "currentTask": "import",
  "tasks": [],
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Error responses

The API returns structured errors in the form:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "instagramUrl is required"
  }
}
```

## Developer experience

On startup, the API prints the available endpoints and the listening address.

## Workspace layout

- `apps/api`: API server
- `apps/worker`: background workers
- `packages/business-model`: shared domain model
- `packages/shared`: shared utilities and types
- `packages/capabilities/business-import`: example capability

## Next steps

- Implement persistence for business and job entities
- Add monitoring and retry support for worker jobs
- Expand capability coverage and enrichment pipelines
