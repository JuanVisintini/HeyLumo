import { BusinessProfile } from "@webgenerator/business-model";
export interface BusinessAnalysisInput {
    profile: BusinessProfile;
}
export interface BusinessAnalysisOutput {
    profile: BusinessProfile;
    category: string;
    summary: string;
    recommendations: string[];
}
