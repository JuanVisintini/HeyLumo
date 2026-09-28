import { createBusiness, getBusiness, getBusinessProfile, saveBusinessProfile, updateBusiness } from "./business-service.js";
import { createJob, getJob } from "./job-service.js";
import { renderBusinessWebsite, saveBusinessWebsite, loadWebsitePage } from "./website-service.js";
import { listCapabilities, executeCapability } from "./registry.js";
import { Business, BusinessProfile } from "@webgenerator/business-model";
import { BusinessSource } from "@webgenerator/shared";

export interface CreateBusinessRequest {
  name: string;
  source: BusinessSource;
}

export interface CreateBusinessResponse {
  id: string;
  status: string;
}

export interface WorkflowRequest {
  source: BusinessSource;
}

export interface WorkflowResponse {
  draftId: string;
  profileId: string;
  status: string;
  analysis: {
    category: string;
    summary: string;
    recommendations: string[];
  };
}

export interface GenerateWebsiteRequest
  extends Omit<BusinessProfile, "id" | "businessId" | "version" | "status" | "slug" | "createdAt" | "updatedAt"> {}

export interface GenerateWebsiteResponse {
  html: string;
}

export interface GenerateWebsiteSaveResponse {
  filename: string;
  path: string;
  url: string;
}

export async function handleCreateBusiness(request: CreateBusinessRequest): Promise<CreateBusinessResponse> {
  const business = await createBusiness(request.name, request.source);
  await createJob({ businessId: business.id, type: "import" });

  return {
    id: business.id,
    status: business.status,
  };
}

export async function handleGetBusiness(businessId: string): Promise<Business | null> {
  const business = await getBusiness(businessId);
  return business ?? null;
}

export async function handleGetBusinessProfile(businessId: string): Promise<BusinessProfile | null> {
  const profile = await getBusinessProfile(businessId);
  return profile ?? null;
}

export async function handleGenerateWebsite(request: GenerateWebsiteRequest): Promise<GenerateWebsiteResponse> {
  const now = new Date().toISOString();
  const profile: BusinessProfile = {
    id: `profile_${Date.now()}`,
    businessId: `business_${Date.now()}`,
    version: 1,
    status: "draft",
    slug: request.name.toLowerCase().replace(/\s+/g, "-"),
    createdAt: now,
    updatedAt: now,
    ...request,
  };

  return {
    html: renderBusinessWebsite(profile),
  };
}

export async function handleSaveWebsite(request: GenerateWebsiteRequest): Promise<GenerateWebsiteSaveResponse> {
  const now = new Date().toISOString();
  const profile: BusinessProfile = {
    id: "profile_1",
    businessId: "business_1",
    version: 1,
    status: "draft",
    slug: request.name.toLowerCase().replace(/\s+/g, "-"),
    createdAt: now,
    updatedAt: now,
    ...request,
  };

  const saved = await saveBusinessWebsite(profile);
  return {
    filename: saved.filename,
    path: saved.outputPath,
    url: saved.urlPath,
  };
}

export async function handleLoadWebsitePage(slug: string) {
  return loadWebsitePage(slug);
}

export async function handleGetJob(jobId: string) {
  return getJob(jobId);
}

export async function handleListCapabilities() {
  return listCapabilities();
}

export async function handleExecuteCapability(id: string, input: unknown) {
  return executeCapability(id, input);
}

export async function handleRunWorkflow(request: WorkflowRequest): Promise<WorkflowResponse> {
  const businessName = `Imported business from ${request.source.type}`;
  const business = await createBusiness(businessName, request.source);
  await createJob({ businessId: business.id, type: "import" });

  const importResult = await executeCapability("business-import", { source: request.source });
  const normalizedResult = await executeCapability("business-normalization", { draft: (importResult as any).draft });
  const analysisResult = await executeCapability("business-analysis", { profile: (normalizedResult as any).profile });

  const profile = (analysisResult as any).profile as BusinessProfile;
  await saveBusinessProfile(profile);
  await updateBusiness({
    ...business,
    profileId: profile.id,
    status: "active",
    updatedAt: new Date().toISOString(),
  });

  return {
    draftId: (importResult as any).draft.id,
    profileId: profile.id,
    status: "completed",
    analysis: {
      category: (analysisResult as any).category,
      summary: (analysisResult as any).summary,
      recommendations: (analysisResult as any).recommendations,
    },
  };
}
