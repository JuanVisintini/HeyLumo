import { CapabilityRegistry, BusinessSource } from "@webgenerator/shared";
import { createCapabilityRegistry } from "./registry.js";

export interface WorkflowResult {
  draftId: string;
  profileId: string;
  status: string;
  analysis: {
    category: string;
    summary: string;
    recommendations: string[];
  };
}

export async function runGenerationWorkflow(source: BusinessSource): Promise<WorkflowResult> {
  const registry = createCapabilityRegistry();

  const importResult = await registry.execute("business-import", { source });
  const normalizedResult = await registry.execute("business-normalization", { draft: (importResult as any).draft });
  const analysisResult = await registry.execute("business-analysis", { profile: (normalizedResult as any).profile });

  return {
    draftId: (importResult as any).draft.id,
    profileId: (analysisResult as any).profile.id,
    status: "completed",
    analysis: {
      category: (analysisResult as any).category,
      summary: (analysisResult as any).summary,
      recommendations: (analysisResult as any).recommendations,
    },
  };
}
