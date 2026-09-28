"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessImportCapability = void 0;
const metadata_1 = require("./metadata");
exports.businessImportCapability = {
    metadata: metadata_1.metadata,
    async validate(input) {
        if (!input?.source?.type || !input?.source?.url) {
            throw new Error("source.type and source.url are required");
        }
    },
    async execute(input) {
        return {
            draft: {
                id: "draft_1",
                source: input.source,
                rawData: {
                    name: "Imported Business",
                    description: "Imported business data from source.",
                    source: input.source,
                },
            },
        };
    },
};
