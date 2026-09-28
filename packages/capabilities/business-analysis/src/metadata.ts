import { CapabilityMetadata } from "@webgenerator/shared";

export const metadata: CapabilityMetadata = {
  id: "business-analysis",
  version: "0.1.0",
  owner: "WebGenerator",
  category: "analysis",
  description: "Analiza el negocio y sugiere categoría, perfil y mejoras.",
  inputSchema: "BusinessAnalysisInput",
  outputSchema: "BusinessAnalysisOutput",
};
