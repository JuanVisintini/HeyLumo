export type BusinessStatus = "created" | "draft" | "analyzed" | "validated" | "generated" | "deployed";
export type BusinessType = "restaurant" | "cafe" | "bar" | "bakery" | "hotel" | "clinic" | "gym" | "retail" | "service";
export interface Brand {
    logo?: string;
    favicon?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    typography?: string;
    visualStyle?: string;
}
export interface Contact {
    phone?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
}
export interface Location {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
}
export interface OpeningHoursItem {
    day: string;
    open: string;
    close: string;
}
export interface SocialProfile {
    platform: string;
    url: string;
}
export interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price?: string;
    category?: string;
}
export interface BusinessProfile {
    id: string;
    businessId: string;
    version: number;
    status: BusinessStatus;
    name: string;
    slug: string;
    businessType?: BusinessType;
    description?: string;
    brand?: Brand;
    contact?: Contact;
    location?: Location;
    openingHours?: OpeningHoursItem[];
    socialProfiles?: SocialProfile[];
    menuItems?: MenuItem[];
    images?: string[];
    createdAt: string;
    updatedAt: string;
}
