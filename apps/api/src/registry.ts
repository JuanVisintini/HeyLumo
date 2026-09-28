import { CapabilityRegistry } from "@webgenerator/shared";
import { businessImportCapability } from "@webgenerator/capability-business-import";
import { businessNormalizationCapability } from "@webgenerator/capability-business-normalization";
import { businessAnalysisCapability } from "@webgenerator/capability-business-analysis";

const registry = new CapabilityRegistry();
registry.register(businessImportCapability);
registry.register(businessNormalizationCapability);
registry.register(businessAnalysisCapability);

export function listCapabilities() {
  return registry.list();
}

export async function executeCapability(id: string, input: unknown) {
  return registry.execute(id, input);
}
