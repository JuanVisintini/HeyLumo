import { Business, BusinessProfile, Job } from "@webgenerator/business-model";
import { CreateJobRequest, CreateJobResponse } from "@webgenerator/shared";

const businessStore = new Map<string, Business>();
const profileStore = new Map<string, BusinessProfile>();
const jobStore = new Map<string, Job>();

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export async function saveBusiness(business: Business): Promise<void> {
  businessStore.set(business.id, business);
}

export async function getBusiness(businessId: string): Promise<Business | undefined> {
  return businessStore.get(businessId);
}

export async function saveBusinessProfile(profile: BusinessProfile): Promise<void> {
  profileStore.set(profile.id, profile);
  const business = businessStore.get(profile.businessId);
  if (business) {
    business.profileId = profile.id;
    business.updatedAt = profile.updatedAt;
  }
}

export async function getBusinessProfile(businessId: string): Promise<BusinessProfile | undefined> {
  return Array.from(profileStore.values()).find((profile) => profile.businessId === businessId);
}

export async function createJob(request: CreateJobRequest): Promise<CreateJobResponse> {
  const jobId = createId("job");
  const now = new Date().toISOString();
  const job: Job = {
    id: jobId,
    businessId: request.businessId,
    type: request.type,
    status: "pending",
    progress: 0,
    tasks: [],
    createdAt: now,
    updatedAt: now,
  };
  jobStore.set(jobId, job);
  return { jobId, status: job.status };
}

export async function getJob(jobId: string): Promise<Job> {
  const job = jobStore.get(jobId);
  if (!job) {
    throw new Error(`Job not found: ${jobId}`);
  }
  return job;
}
