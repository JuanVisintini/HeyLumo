"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessNormalizationCapability = void 0;
const metadata_1 = require("./metadata");
exports.businessNormalizationCapability = {
    metadata: metadata_1.metadata,
    async validate(input) {
        if (!input?.draft?.id || !input?.draft?.rawData) {
            throw new Error("draft.id and draft.rawData are required");
        }
    },
    async execute(input) {
        const normalizedProfile = {
            ...input.draft.rawData,
            id: input.draft.id,
            businessId: input.draft.id,
            version: 1,
            status: "draft",
            name: input.draft.rawData["name"] || "Imported business",
            slug: (input.draft.rawData["name"] || "imported-business")
                .toLowerCase()
                .replace(/\s+/g, "-"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return {
            profile: normalizedProfile,
        };
    },
};
