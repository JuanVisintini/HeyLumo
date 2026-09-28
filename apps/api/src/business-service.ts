import { Business, BusinessProfile } from "@webgenerator/business-model";
import { BusinessSource } from "@webgenerator/shared";
import {
  saveBusiness as persistBusiness,
  saveBusinessProfile as persistBusinessProfile,
  getBusiness as fetchBusiness,
  getBusinessProfile as fetchBusinessProfile,
} from "./storage.js";

export async function createBusiness(name: string, source: BusinessSource): Promise<Business> {
  const now = new Date().toISOString();
  const business: Business = {
    id: `business_${Date.now()}`,
    ownerId: "owner_1",
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    status: "created",
    createdAt: now,
    updatedAt: now,
  };

  await persistBusiness(business);
  return business;
}

export async function getBusiness(businessId: string): Promise<Business | undefined> {
  return fetchBusiness(businessId);
}

export async function getBusinessProfile(businessId: string): Promise<BusinessProfile | undefined> {
  return fetchBusinessProfile(businessId);
}

export async function saveBusinessProfile(profile: BusinessProfile): Promise<void> {
  await persistBusinessProfile(profile);
}

export async function updateBusiness(business: Business): Promise<void> {
  await persistBusiness(business);
}
