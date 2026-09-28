import { CapabilityMetadata } from "@webgenerator/shared";

export const metadata: CapabilityMetadata = {
  id: "business-import",
  version: "0.1.0",
  owner: "WebGenerator",
  category: "import",
  description: "Importa datos de negocio desde una fuente externa.",
  inputSchema: "BusinessImportInput",
  outputSchema: "BusinessImportOutput",
};
