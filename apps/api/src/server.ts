import http from "http";
import { handleCreateBusiness, handleGetBusiness, handleGetBusinessProfile, handleGetJob, handleGenerateWebsite, handleSaveWebsite, handleLoadWebsitePage, handleListCapabilities, handleExecuteCapability, handleRunWorkflow } from "./index.js";
import { BusinessSource } from "@webgenerator/shared";
import { BusinessType } from "@webgenerator/business-model";

const APP_NAME = "Business OS API";
const APP_VERSION = "0.1.0";
const ENVIRONMENT = process.env.NODE_ENV?.trim() || "development";
const PORT = Number(process.env.PORT ?? 4000);
const DOCS_PATH = "/docs";

class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

function sendJson(res: http.ServerResponse, status: number, payload: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function sendHtml(res: http.ServerResponse, status: number, html: string) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function sendError(res: http.ServerResponse, status: number, code: string, message: string) {
  sendJson(res, status, { error: { code, message } });
}

function getRequestDurationMs(start: bigint): number {
  return Number(process.hrtime.bigint() - start) / 1_000_000;
}

async function parseRequestBody(req: http.IncomingMessage) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  if (!body.trim()) {
    throw new ApiError(400, "VALIDATION_ERROR", "Request body is required");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new ApiError(400, "VALIDATION_ERROR", "Request body must be valid JSON");
  }
}

function normalizeCreateBusinessPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    throw new ApiError(400, "VALIDATION_ERROR", "Request payload must be an object");
  }

  const typedPayload = payload as Record<string, unknown>;
  const sourceCandidate = typedPayload.source ??
    (typeof typedPayload.instagramUrl === "string"
      ? { type: "instagram", url: String(typedPayload.instagramUrl) }
      : undefined);

  if (!sourceCandidate || typeof sourceCandidate !== "object") {
    throw new ApiError(400, "VALIDATION_ERROR", "source is required");
  }

  const source = {
    type: String((sourceCandidate as Record<string, unknown>).type ?? "").trim(),
    url: String((sourceCandidate as Record<string, unknown>).url ?? "").trim(),
  } as BusinessSource;

  if (!source.type) {
    throw new ApiError(400, "VALIDATION_ERROR", "source.type is required");
  }

  if (!source.url) {
    throw new ApiError(400, "VALIDATION_ERROR", "source.url is required");
  }

  const allowedTypes = ["instagram", "google_business", "facebook", "website", "manual"];
  if (!allowedTypes.includes(source.type)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      `source.type must be one of: ${allowedTypes.join(", ")}`
    );
  }

  const nameValue = String(typedPayload.name ?? "").trim();
  const name = nameValue || "Imported Business";

  return { name, source };
}

function normalizeGenerateWebsitePayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    throw new ApiError(400, "VALIDATION_ERROR", "Request payload must be an object");
  }

  const typedPayload = payload as Record<string, unknown>;
  const nameValue = String(typedPayload.name ?? "").trim();
  if (!nameValue) {
    throw new ApiError(400, "VALIDATION_ERROR", "name is required");
  }

  const rawBusinessType = typeof typedPayload.businessType === "string" ? String(typedPayload.businessType).trim() : undefined;
  const allowedTypes: BusinessType[] = [
    "restaurant",
    "cafe",
    "bar",
    "bakery",
    "hotel",
    "clinic",
    "gym",
    "retail",
    "service",
  ];
  const businessType = rawBusinessType
    ? allowedTypes.includes(rawBusinessType as BusinessType)
      ? (rawBusinessType as BusinessType)
      : (() => {
          throw new ApiError(
            400,
            "VALIDATION_ERROR",
            `businessType must be one of: ${allowedTypes.join(", ")}`
          );
        })()
    : undefined;

  const description = typeof typedPayload.description === "string" ? String(typedPayload.description).trim() : undefined;
  const brand = typedPayload.brand && typeof typedPayload.brand === "object" ? typedPayload.brand : undefined;
  const contact = typedPayload.contact && typeof typedPayload.contact === "object" ? typedPayload.contact : undefined;
  const location = typedPayload.location && typeof typedPayload.location === "object" ? typedPayload.location : undefined;
  const openingHours = Array.isArray(typedPayload.openingHours) ? typedPayload.openingHours : undefined;
  const socialProfiles = Array.isArray(typedPayload.socialProfiles) ? typedPayload.socialProfiles : undefined;
  const menuItems = Array.isArray(typedPayload.menuItems) ? typedPayload.menuItems : undefined;
  const images = Array.isArray(typedPayload.images) ? typedPayload.images.map(String) : undefined;

  return {
    name: nameValue,
    businessType,
    description,
    brand,
    contact,
    location,
    openingHours,
    socialProfiles,
    menuItems,
    images,
  };
}

function getDocsResponse() {
  return {
    name: APP_NAME,
    version: APP_VERSION,
    environment: ENVIRONMENT,
    routes: [
      { method: "GET", path: "/" },
      { method: "GET", path: "/health" },
      { method: "GET", path: "/docs" },
      { method: "POST", path: "/api/v1/businesses" },
      { method: "POST", path: "/api/v1/businesses/generate" },
      { method: "POST", path: "/api/v1/businesses/generate-html" },
      { method: "POST", path: "/api/v1/businesses/generate-save" },
      { method: "GET", path: "/api/v1/pages/:slug" },
      { method: "GET", path: "/api/v1/jobs/:id" },
      { method: "GET", path: "/api/v1/businesses/:id" },
      { method: "GET", path: "/api/v1/businesses/:id/profile" },
      { method: "POST", path: "/api/v1/workflows/generate" },
    ],
    examples: {
      createBusiness: `curl -X POST http://localhost:${PORT}/api/v1/businesses -H "Content-Type: application/json" -d '{"name":"Imported Business","source":{"type":"instagram","url":"https://instagram.com/example"}}'`,
      generateWebsite: `curl -X POST http://localhost:${PORT}/api/v1/businesses/generate -H "Content-Type: application/json" -d '{"name":"Mi Negocio","description":"Una empresa local dedicada a...","businessType":"service","contact":{"email":"hola@miempresa.com"}}'`,
      generateWebsiteHtml: `curl -X POST http://localhost:${PORT}/api/v1/businesses/generate-html -H "Content-Type: application/json" -d '{"name":"Mi Negocio","description":"Una empresa local dedicada a...","businessType":"service","contact":{"email":"hola@miempresa.com"}}'`,
      generateWebsiteSave: `curl -X POST http://localhost:${PORT}/api/v1/businesses/generate-save -H "Content-Type: application/json" -d '{"name":"Mi Negocio","description":"Una empresa local dedicada a...","businessType":"service","contact":{"email":"hola@miempresa.com"}}'`,
      listCapabilities: `curl http://localhost:${PORT}/api/v1/capabilities`,
      executeCapability: `curl -X POST http://localhost:${PORT}/api/v1/capabilities/business-import/execute -H "Content-Type: application/json" -d '{"source":{"type":"instagram","url":"https://instagram.com/example"}}'`,
      runWorkflow: `curl -X POST http://localhost:${PORT}/api/v1/workflows/generate -H "Content-Type: application/json" -d '{"source":{"type":"instagram","url":"https://instagram.com/example"}}'`,
      getPage: `curl http://localhost:${PORT}/api/v1/pages/mi-negocio`,
      getJob: `curl http://localhost:${PORT}/api/v1/jobs/job_1`,
      getBusiness: `curl http://localhost:${PORT}/api/v1/businesses/business_123`,
      getBusinessProfile: `curl http://localhost:${PORT}/api/v1/businesses/business_123/profile`,
    },
  };
}

const server = http.createServer(async (req, res) => {
  const start = process.hrtime.bigint();
  const method = req.method ?? "UNKNOWN";
  const url = req.url ?? "";

  console.log(`[request] ${method} ${url} started`);

  try {
    if (method === "GET" && url === "/") {
      sendJson(res, 200, {
        name: APP_NAME,
        version: APP_VERSION,
        status: "running",
        environment: ENVIRONMENT,
        documentation: DOCS_PATH,
      });
      return;
    }

    if (method === "GET" && url === "/health") {
      sendJson(res, 200, {
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        version: APP_VERSION,
        status: "ok",
      });
      return;
    }

    if (method === "GET" && url === DOCS_PATH) {
      sendJson(res, 200, getDocsResponse());
      return;
    }

    if (method === "POST" && url === "/api/v1/businesses") {
      const payload = await parseRequestBody(req);
      const requestBody = normalizeCreateBusinessPayload(payload);
      const result = await handleCreateBusiness(requestBody);
      sendJson(res, 201, result);
      return;
    }

    if (method === "POST" && url === "/api/v1/businesses/generate") {
      const payload = await parseRequestBody(req);
      const requestBody = normalizeGenerateWebsitePayload(payload);
      const result = await handleGenerateWebsite(requestBody);
      sendJson(res, 200, result);
      return;
    }

    if (method === "POST" && url === "/api/v1/businesses/generate-html") {
      const payload = await parseRequestBody(req);
      const requestBody = normalizeGenerateWebsitePayload(payload);
      const result = await handleGenerateWebsite(requestBody);
      sendHtml(res, 200, result.html);
      return;
    }

    if (method === "POST" && url === "/api/v1/businesses/generate-save") {
      const payload = await parseRequestBody(req);
      const requestBody = normalizeGenerateWebsitePayload(payload);
      const result = await handleSaveWebsite(requestBody);
      sendJson(res, 201, result);
      return;
    }

    if (method === "GET" && url.startsWith("/api/v1/pages/")) {
      const slug = url.split("/").pop() || "";
      if (!slug) {
        throw new ApiError(400, "VALIDATION_ERROR", "page slug is required");
      }
      try {
        const html = await handleLoadWebsitePage(slug);
        sendHtml(res, 200, html);
        return;
      } catch {
        throw new ApiError(404, "NOT_FOUND", "Page not found");
      }
    }

    if (method === "GET" && url === "/api/v1/capabilities") {
      const capabilities = await handleListCapabilities();
      sendJson(res, 200, capabilities);
      return;
    }

    if (method === "POST" && url.startsWith("/api/v1/capabilities/") && url.endsWith("/execute")) {
      const parts = url.split("/");
      const id = parts[parts.length - 2] || "";
      if (!id) {
        throw new ApiError(400, "VALIDATION_ERROR", "capability id is required");
      }

      const payload = await parseRequestBody(req);
      const result = await handleExecuteCapability(id, payload);
      sendJson(res, 200, result);
      return;
    }

    if (method === "POST" && url === "/api/v1/workflows/generate") {
      const payload = await parseRequestBody(req);
      const requestBody = normalizeCreateBusinessPayload(payload);
      const result = await handleRunWorkflow({ source: requestBody.source });
      sendJson(res, 200, result);
      return;
    }

    if (method === "GET" && url.startsWith("/api/v1/businesses/") && url.endsWith("/profile")) {
      const parts = url.split("/");
      const businessId = parts[parts.length - 2];
      if (!businessId) {
        throw new ApiError(400, "VALIDATION_ERROR", "businessId is required");
      }

      const result = await handleGetBusinessProfile(businessId);
      if (!result) {
        throw new ApiError(404, "NOT_FOUND", "Business profile not found");
      }

      sendJson(res, 200, result);
      return;
    }

    if (method === "GET" && url.startsWith("/api/v1/businesses/") && !url.endsWith("/profile")) {
      const businessId = url.split("/").pop() || "";
      if (!businessId) {
        throw new ApiError(400, "VALIDATION_ERROR", "businessId is required");
      }

      const result = await handleGetBusiness(businessId);
      if (!result) {
        throw new ApiError(404, "NOT_FOUND", "Business not found");
      }

      sendJson(res, 200, result);
      return;
    }

    if (method === "GET" && url.startsWith("/api/v1/jobs/")) {
      const jobId = url.split("/").pop() || "";
      if (!jobId) {
        throw new ApiError(400, "VALIDATION_ERROR", "jobId is required");
      }

      const result = await handleGetJob(jobId);
      sendJson(res, 200, result);
      return;
    }

    throw new ApiError(404, "NOT_FOUND", "Route not found");
  } catch (error) {
    if (error instanceof ApiError) {
      sendError(res, error.status, error.code, error.message);
    } else {
      console.error("[error] Unexpected error", error);
      sendError(res, 500, "INTERNAL_ERROR", "Unexpected error occurred");
    }
  } finally {
    const duration = getRequestDurationMs(start).toFixed(2);
    console.log(`[request] ${method} ${url} completed ${res.statusCode} in ${duration}ms`);
  }
});

server.listen(PORT, () => {
  console.log("Business OS API started");
  console.log(`Environment: ${ENVIRONMENT}`);
  console.log("Listening on:");
  console.log(`  http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log("  GET /");
  console.log("  GET /health");
  console.log("  GET /docs");
  console.log("  POST /api/v1/businesses");
  console.log("  POST /api/v1/businesses/generate");
  console.log("  POST /api/v1/businesses/generate-html");
  console.log("  POST /api/v1/businesses/generate-save");
  console.log("  GET /api/v1/pages/:slug");
  console.log("  GET /api/v1/jobs/:id");
});
