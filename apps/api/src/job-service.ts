import { CreateJobRequest, CreateJobResponse } from "@webgenerator/shared";
import { Job } from "@webgenerator/business-model";
import { createJob as persistJob, getJob as fetchJob } from "./storage.js";

export async function createJob(request: CreateJobRequest): Promise<CreateJobResponse> {
  return persistJob(request);
}

export async function getJob(jobId: string): Promise<Job> {
  return fetchJob(jobId);
}
