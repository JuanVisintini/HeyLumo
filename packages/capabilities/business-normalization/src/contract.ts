import { BusinessDraft } from "@webgenerator/shared";
import { BusinessProfile } from "@webgenerator/business-model";

export interface BusinessNormalizationInput {
  draft: BusinessDraft;
}

export interface BusinessNormalizationOutput {
  profile: BusinessProfile;
}
