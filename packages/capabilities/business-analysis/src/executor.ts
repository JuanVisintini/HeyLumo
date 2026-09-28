import { Capability } from "@webgenerator/shared";
import { BusinessAnalysisInput, BusinessAnalysisOutput } from "./contract.js";
import { metadata } from "./metadata.js";

export const businessAnalysisCapability: Capability<BusinessAnalysisInput, BusinessAnalysisOutput> = {
  metadata,
  async validate(input: BusinessAnalysisInput) {
    if (!input?.profile?.id || !input?.profile?.name) {
      throw new Error("profile.id and profile.name are required");
    }
  },
  async execute(input: BusinessAnalysisInput): Promise<BusinessAnalysisOutput> {
    const profile = input.profile;
    const category = profile.businessType || "restaurant";
    const summary = `Profile analysis completed for ${profile.name}. The business has ${profile.menuItems?.length ?? 0} menu items and ${profile.images?.length ?? 0} representative images.`;

    const recommendations: string[] = [];
    if (!profile.openingHours?.length) {
      recommendations.push("Add business hours to improve customer trust.");
    }
    if (!profile.brand?.logo) {
      recommendations.push("Upload a logo for brand recognition.");
    }
    if (!profile.contact?.email || !profile.contact?.phone) {
      recommendations.push("Provide email and phone contact details.");
    }
    if (!profile.location?.address) {
      recommendations.push("Add a physical address to help local discovery.");
    }
    if (!profile.socialProfiles?.length) {
      recommendations.push("Connect social media profiles to increase reach.");
    }
    if (!profile.menuItems?.length) {
      recommendations.push("Add menu items or product details for better conversion.");
    }
    if (!profile.images?.length) {
      recommendations.push("Upload representative images to showcase the business.");
    }

    return {
      profile: {
        ...profile,
        businessType: category as any,
        status: "analyzed",
        updatedAt: new Date().toISOString(),
      },
      category,
      summary,
      recommendations,
    };
  },
};
