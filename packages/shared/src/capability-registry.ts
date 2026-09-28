import type { Capability, CapabilityMetadata } from "@webgenerator/shared";

export interface RegisteredCapability {
  metadata: CapabilityMetadata;
  execute: (input: unknown) => Promise<unknown>;
  validate: (input: unknown) => Promise<void>;
}

export class CapabilityRegistry {
  private readonly capabilities = new Map<string, RegisteredCapability>();

  register<Input, Output>(capability: Capability<Input, Output>) {
    this.capabilities.set(capability.metadata.id, {
      metadata: capability.metadata,
      execute: async (input: unknown) => capability.execute(input as Input),
      validate: async (input: unknown) => capability.validate(input as Input),
    });
  }

  list() {
    return Array.from(this.capabilities.values()).map((entry) => entry.metadata);
  }

  async execute(id: string, input: unknown) {
    const capability = this.capabilities.get(id);
    if (!capability) {
      throw new Error(`Capability not found: ${id}`);
    }
    await capability.validate(input);
    return capability.execute(input);
  }
}
