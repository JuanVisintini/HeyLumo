# Roadmap WebGenerator

## ✅ Milestone 1 — Foundation (COMPLETADO)

- API core
- Worker process
- HTML MVP
- Build / monorepo
- Documentación

---

## ✅ Milestone 2 — Capability Engine (COMPLETADO)

- SDK / shared capability contract
- Capability interface y metadata
- Capability registry
- Ejecución de pipeline
- Worker orchestration
- API de capacidades
- Endpoint de workflow `POST /api/v1/workflows/generate`

---

## 🟡 Milestone 3 — Business Digital Twin

- Modelo de negocio básico (completado)
- Pipeline de importación y normalización (completado)
- Persistencia y estado del perfil (parcial)
- Branding y estilo (pendiente)
- Contacto y datos de negocio (pendiente)
- Horarios y ubicación (pendiente)
- Redes sociales (pendiente)
- Menú y ofertas (pendiente)
- Imágenes y multimedia (pendiente)

---

## ⚪ Milestone 4 — AI Engine

- Generación de descripción
- Recomendaciones SEO
- Sugerencia de paleta visual
- Definición de tono y voz
- Optimización de CTA
- Detección de categoría

---

## ⚪ Milestone 5 — Experience Definition

En vez de generar HTML directamente, generar una representación estructurada como:

```json
{
  "pages": [
    {
      "slug": "/",
      "sections": [
        {
          "type": "hero"
        },
        {
          "type": "gallery"
        },
        {
          "type": "contact"
        }
      ]
    }
  ]
}
```

---

## ⚪ Milestone 6 — Renderers

- HTML
- Next.js
- Astro
- Email
- Landing pages
