import { BusinessSource, BusinessDraft } from "@webgenerator/shared";
export interface BusinessImportInput {
    source: BusinessSource;
}
export interface BusinessImportOutput {
    draft: BusinessDraft;
}
