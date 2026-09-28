import { CapabilityMetadata } from "@webgenerator/shared";

export const metadata: CapabilityMetadata = {
  id: "business-normalization",
  version: "0.1.0",
  owner: "WebGenerator",
  category: "normalization",
  description: "Normaliza y limpia los datos importados del negocio.",
  inputSchema: "BusinessNormalizationInput",
  outputSchema: "BusinessNormalizationOutput",
};
