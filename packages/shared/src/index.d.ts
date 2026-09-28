export interface JobStatus {
    id: string;
    type: string;
    status: "pending" | "running" | "completed" | "failed" | "cancelled";
    progress: number;
    startedAt?: string;
    finishedAt?: string;
}
export interface BusinessSource {
    type: "instagram" | "google_business" | "facebook" | "website" | "manual";
    url: string;
}
export interface BusinessDraft {
    id: string;
    source: BusinessSource;
    rawData: Record<string, unknown>;
}
