import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { BusinessProfile, Contact, Location, OpeningHoursItem, SocialProfile, MenuItem, Brand } from "@webgenerator/business-model";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "../output");

async function ensureOutputDir() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  return OUTPUT_DIR;
}

async function readSavedPage(filename: string) {
  const filePath = path.join(OUTPUT_DIR, filename);
  return readFile(filePath, "utf-8");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderContact(contact?: Contact) {
  if (!contact) return "";
  const lines: string[] = [];
  if (contact.website) lines.push(`<div><strong>Website:</strong> <a href=\"${escapeHtml(contact.website)}\" target=\"_blank\">${escapeHtml(contact.website)}</a></div>`);
  if (contact.email) lines.push(`<div><strong>Email:</strong> <a href=\"mailto:${escapeHtml(contact.email)}\">${escapeHtml(contact.email)}</a></div>`);
  if (contact.phone) lines.push(`<div><strong>Phone:</strong> ${escapeHtml(contact.phone)}</div>`);
  if (contact.whatsapp) lines.push(`<div><strong>WhatsApp:</strong> <a href=\"${escapeHtml(contact.whatsapp)}\" target=\"_blank\">${escapeHtml(contact.whatsapp)}</a></div>`);
  return lines.join("\n");
}

function renderLocation(location?: Location) {
  if (!location) return "";
  const lines = [location.address, location.city, location.state, location.postalCode, location.country].filter(Boolean);
  if (!lines.length) return "";
  return `<div><strong>Location:</strong> ${escapeHtml(lines.join(", "))}</div>`;
}

function renderSocialProfiles(socialProfiles?: SocialProfile[]) {
  if (!socialProfiles?.length) return "";
  const items = socialProfiles
    .map(profile => `<li><a href=\"${escapeHtml(profile.url)}\" target=\"_blank\">${escapeHtml(profile.platform)}</a></li>`)
    .join("\n");
  return `
      <section class=\"section\">
        <h2>Redes sociales</h2>
        <ul class=\"social-list\">${items}</ul>
      </section>
  `;
}

function renderOpeningHours(openingHours?: OpeningHoursItem[]) {
  if (!openingHours?.length) return "";
  const rows = openingHours
    .map(item => `<tr><td>${escapeHtml(item.day)}</td><td>${escapeHtml(item.open)}</td><td>${escapeHtml(item.close)}</td></tr>`)
    .join("\n");
  return `
      <section class=\"section\">
        <h2>Horario</h2>
        <table class=\"hours-table\">
          <thead><tr><th>Día</th><th>Apertura</th><th>Cierre</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
  `;
}

function renderMenu(menuItems?: MenuItem[]) {
  if (!menuItems?.length) return "";
  const items = menuItems
    .map(item => `
      <li class=\"menu-item\">
        <strong>${escapeHtml(item.name)}</strong>
        ${item.description ? `<div>${escapeHtml(item.description)}</div>` : ""}
        ${item.price ? `<div class=\"price\">${escapeHtml(item.price)}</div>` : ""}
      </li>
    `)
    .join("\n");
  return `
      <section class=\"section\">
        <h2>Especialidades</h2>
        <ul class=\"menu-list\">${items}</ul>
      </section>
  `;
}

function renderImages(images?: string[]) {
  if (!images?.length) return "";
  const items = images
    .map(src => `<img class=\"hero-image\" src=\"${escapeHtml(src)}\" alt=\"Imagen del negocio\" />`)
    .join("\n");
  return `
      <section class=\"section media-section\">${items}</section>
  `;
}

function renderBrandStyles(brand?: Brand) {
  const primary = brand?.primaryColor ?? "#0d6efd";
  const secondary = brand?.secondaryColor ?? "#6c757d";
  const accent = brand?.accentColor ?? "#ffc107";
  return `
    :root {
      --primary-color: ${escapeHtml(primary)};
      --secondary-color: ${escapeHtml(secondary)};
      --accent-color: ${escapeHtml(accent)};
    }
  `;
}

export async function saveBusinessWebsite(profile: BusinessProfile) {
  await ensureOutputDir();
  const filename = `${profile.slug || profile.name.toLowerCase().replace(/\s+/g, "-")}.html`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  const html = renderBusinessWebsite(profile);
  await writeFile(outputPath, html, "utf-8");
  return {
    filename,
    outputPath,
    urlPath: `/api/v1/pages/${filename.replace(/\.html$/, "")}`,
  };
}

export async function loadWebsitePage(slug: string) {
  const filename = `${slug}.html`;
  try {
    return await readSavedPage(filename);
  } catch (error) {
    throw new Error("PAGE_NOT_FOUND");
  }
}

export function renderBusinessWebsite(profile: BusinessProfile): string {
  const title = escapeHtml(profile.name);
  const description = escapeHtml(profile.description ?? "Descubre nuestro servicio premium para tu negocio.");
  const heroImage = profile.images?.[0] ?? "https://via.placeholder.com/1200x500?text=Web+Generator+Business";
  const businessType = profile.businessType ? escapeHtml(profile.businessType) : "Negocio";

  return `<!DOCTYPE html>
<html lang=\"es\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>${title} | Página generada</title>
  <style>
    ${renderBrandStyles(profile.brand)}
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f7f8fb;
      color: #222;
    }
    .page {
      max-width: 1000px;
      margin: 0 auto;
      padding: 24px;
    }
    .hero {
      display: grid;
      gap: 24px;
      align-items: center;
    }
    .hero-image {
      width: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
    .hero-copy {
      padding: 24px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    }
    .hero-copy h1 {
      margin: 0 0 12px;
      color: var(--primary-color);
    }
    .hero-copy p {
      margin: 0;
      color: #444;
      line-height: 1.7;
    }
    .section {
      margin-top: 32px;
      padding: 24px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.05);
    }
    .section h2 {
      margin-top: 0;
      color: var(--secondary-color);
    }
    .social-list,
    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .social-list li,
    .menu-item {
      margin-bottom: 12px;
    }
    .hours-table {
      width: 100%;
      border-collapse: collapse;
    }
    .hours-table td,
    .hours-table th {
      padding: 10px;
      border: 1px solid #e5e7eb;
      text-align: left;
    }
    .price {
      margin-top: 6px;
      font-weight: 700;
      color: var(--accent-color);
    }
  </style>
</head>
<body>
  <div class=\"page\">
    <div class=\"hero\">
      <img class=\"hero-image\" src=\"${heroImage}\" alt=\"Imagen de ${title}\" />
      <div class=\"hero-copy\">
        <p><strong>${businessType}</strong></p>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </div>

    ${renderImages(profile.images)}

    <section class=\"section\">
      <h2>Sobre nosotros</h2>
      <p>${description}</p>
    </section>

    ${renderContact(profile.contact)}
    ${renderLocation(profile.location)}
    ${renderSocialProfiles(profile.socialProfiles)}
    ${renderOpeningHours(profile.openingHours)}
    ${renderMenu(profile.menuItems)}

    <section class=\"section\">
      <h2>Resumen</h2>
      <p>Una página generada automáticamente para presentar tu negocio profesionalmente y ayudarte a vender el servicio.</p>
    </section>
  </div>
</body>
</html>`;
}
