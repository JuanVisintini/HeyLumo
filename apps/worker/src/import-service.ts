import { businessImportCapability, BusinessImportInput, BusinessImportOutput } from "@webgenerator/capability-business-import";

export async function runBusinessImport(input: BusinessImportInput): Promise<BusinessImportOutput> {
  return businessImportCapability.execute(input);
}
