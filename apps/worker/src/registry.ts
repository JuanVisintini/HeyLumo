import { CapabilityRegistry } from "@webgenerator/shared";
import { businessImportCapability } from "@webgenerator/capability-business-import";
import { businessNormalizationCapability } from "@webgenerator/capability-business-normalization";
import { businessAnalysisCapability } from "@webgenerator/capability-business-analysis";

export function createCapabilityRegistry() {
  const registry = new CapabilityRegistry();
  registry.register(businessImportCapability);
  registry.register(businessNormalizationCapability);
  registry.register(businessAnalysisCapability);
  return registry;
}
