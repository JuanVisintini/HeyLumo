import { Capability } from "@webgenerator/shared";
import { BusinessImportInput, BusinessImportOutput } from "./contract.js";
import { metadata } from "./metadata.js";

export const businessImportCapability: Capability<BusinessImportInput, BusinessImportOutput> = {
  metadata,
  async validate(input: BusinessImportInput) {
    if (!input?.source?.type || !input?.source?.url) {
      throw new Error("source.type and source.url are required");
    }
  },
  async execute(input: BusinessImportInput): Promise<BusinessImportOutput> {
    const now = new Date().toISOString();
    return {
      draft: {
        id: `draft_${Date.now()}`,
        source: input.source,
        rawData: {
          name: "Imported Business",
          description: "Imported business data imported from source.",
          businessType: "restaurant",
          category: "food_and_beverage",
          brand: {
            logo: "https://example.com/logo.png",
            favicon: "https://example.com/favicon.ico",
            primaryColor: "#034f84",
            secondaryColor: "#92a8d1",
            accentColor: "#f7cac9",
            typography: "Inter, system-ui, sans-serif",
          },
          contact: {
            phone: "+1 (555) 123-4567",
            email: "hello@example.com",
            website: "https://www.example.com",
            whatsapp: "+15551234567",
          },
          location: {
            address: "123 Main St",
            city: "Springfield",
            state: "IL",
            country: "USA",
            postalCode: "62701",
            latitude: 39.7817,
            longitude: -89.6501,
          },
          openingHours: [
            { day: "Monday", open: "09:00", close: "18:00" },
            { day: "Tuesday", open: "09:00", close: "18:00" },
            { day: "Wednesday", open: "09:00", close: "18:00" },
            { day: "Thursday", open: "09:00", close: "18:00" },
            { day: "Friday", open: "09:00", close: "20:00" },
          ],
          socialProfiles: [
            { platform: "facebook", url: "https://facebook.com/example" },
            { platform: "instagram", url: "https://instagram.com/example" },
          ],
          menuItems: [
            { id: "item_1", name: "Chef's Choice", description: "Seasonal tasting menu.", price: "$45", category: "featured" },
            { id: "item_2", name: "Classic Burger", description: "House blend beef with fries.", price: "$14", category: "entrees" },
          ],
          images: [
            "https://example.com/images/front.jpg",
            "https://example.com/images/interior.jpg",
          ],
          source: input.source,
          importedAt: now,
        },
      },
    };
  },
};
