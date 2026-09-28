"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessAnalysisCapability = void 0;
const metadata_1 = require("./metadata");
exports.businessAnalysisCapability = {
    metadata: metadata_1.metadata,
    async validate(input) {
        if (!input?.profile?.id || !input?.profile?.name) {
            throw new Error("profile.id and profile.name are required");
        }
    },
    async execute(input) {
        const category = input.profile.businessType || "restaurant";
        const summary = `Profile analysis completed for ${input.profile.name}.`;
        const recommendations = [
            "Add business hours if missing.",
            "Upload a logo for brand consistency.",
            "Provide more product details for SEO.",
        ];
        return {
            profile: {
                ...input.profile,
                businessType: category,
                status: "analyzed",
            },
            category,
            summary,
            recommendations,
        };
    },
};
