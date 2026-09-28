export interface CapabilityMetadata {
  id: string;
  version: string;
  owner: string;
  category: string;
  description: string;
  inputSchema: string;
  outputSchema: string;
}

export interface Capability<Input, Output> {
  metadata: CapabilityMetadata;
  validate(input: Input): Promise<void>;
  execute(input: Input): Promise<Output>;
}
