import { Capability } from "@webgenerator/shared";
import { BusinessNormalizationInput, BusinessNormalizationOutput } from "./contract.js";
import { metadata } from "./metadata.js";

export const businessNormalizationCapability: Capability<BusinessNormalizationInput, BusinessNormalizationOutput> = {
  metadata,
  async validate(input: BusinessNormalizationInput) {
    if (!input?.draft?.id || !input?.draft?.rawData) {
      throw new Error("draft.id and draft.rawData are required");
    }
  },
  async execute(input: BusinessNormalizationInput): Promise<BusinessNormalizationOutput> {
    const raw = input.draft.rawData as Record<string, unknown>;
    const name = String(raw.name ?? "Imported Business");
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const profile: any = {
      id: `profile_${input.draft.id}`,
      businessId: input.draft.id,
      version: 1,
      status: "draft",
      name,
      slug,
      description: String(raw.description ?? "A business imported from external data."),
      businessType: String(raw.businessType ?? "restaurant"),
      brand: raw.brand,
      contact: raw.contact,
      location: raw.location,
      openingHours: Array.isArray(raw.openingHours) ? raw.openingHours : undefined,
      socialProfiles: Array.isArray(raw.socialProfiles) ? raw.socialProfiles : undefined,
      menuItems: Array.isArray(raw.menuItems) ? raw.menuItems : undefined,
      images: Array.isArray(raw.images) ? raw.images.map(String) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      profile,
    };
  },
};
