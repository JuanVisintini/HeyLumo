export type JobStatusValue = "pending" | "running" | "completed" | "failed" | "cancelled";

export type JobType =
  | "website-generation"
  | "regeneration"
  | "deployment"
  | "import"
  | "update-business";

export interface CreateJobRequest {
  businessId: string;
  type: JobType;
}

export interface CreateJobResponse {
  jobId: string;
  status: JobStatusValue;
}
