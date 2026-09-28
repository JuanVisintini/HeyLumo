export * from "./job";
export * from "./capability";
export * from "./capability-registry";

export interface BusinessSource {
  type: "instagram" | "google_business" | "facebook" | "website" | "manual";
  url: string;
}

export interface BusinessDraft {
  id: string;
  source: BusinessSource;
  rawData: Record<string, unknown>;
}
