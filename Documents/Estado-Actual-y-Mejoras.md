# Estado actual del proyecto WebGenerator

## 1. Qué tenemos implementado

### Arquitectura general
- Monorepo Node.js + TypeScript.
- `apps/api`: servidor HTTP principal.
- `apps/worker`: proceso de worker preparado en el repositorio, pero no usado en esta prueba.
- `packages/business-model` y `packages/shared`: tipos y modelos compartidos.
- `package.json` usa `npm run build` con `tsc -b` y `dev:api` arranca el servidor compilado.

### API y rutas disponibles
El backend actual expone los siguientes endpoints:
- `GET /` - metadata de la API.
- `GET /health` - estado básico y uptime.
- `GET /docs` - documentación simple de rutas y ejemplos.
- `POST /api/v1/businesses` - crea un negocio mock a partir de `source` o `instagramUrl`.
- `POST /api/v1/businesses/generate` - genera HTML de página en memoria.
- `POST /api/v1/businesses/generate-html` - devuelve la página generada directamente como HTML.
- `POST /api/v1/businesses/generate-save` - genera la página y la guarda en disco.
- `GET /api/v1/pages/:slug` - carga la página HTML guardada y la devuelve.
- `GET /api/v1/jobs/:id` - mock de estado de trabajo.

### Lógica de generación de páginas
- `apps/api/src/website-service.ts` genera HTML usando plantillas inline.
- El HTML guarda datos básicos:
  - nombre del negocio
  - descripción
  - tipo de negocio
  - contacto
  - ubicación
  - redes sociales
  - horario
  - menú / especialidades
- La ruta `generate-save` salva el archivo en `apps/api/output`.
- La ruta `pages/:slug` recupera el HTML guardado por slug.

### Servicios de apoyo
- `apps/api/src/index.ts` orquesta los handlers.
- `apps/api/src/business-service.ts` crea negocios mock sin base de datos.
- `apps/api/src/job-service.ts` devuelve trabajos mock.

## 2. Qué se probó y funciona
- El servidor se compila con `npm run build`.
- Se inició la API en `http://localhost:4000`.
- `POST /api/v1/businesses/generate-save` genera y guarda un archivo `mi-taller-creativo.html`.
- `GET /api/v1/pages/mi-taller-creativo` devuelve el HTML guardado con `200 OK`.
- El contenido HTML renderizado es válido y muestra la plantilla de negocio.

## 3. Limitaciones actuales

### Persistencia y datos
- No hay base de datos: todo es mock y temporal.
- `createBusiness()` y `createJob()` devuelven datos hardcodeados.
- No hay almacenamiento real de negocios, perfiles, o trabajos.
- No hay registro de páginas guardadas más allá del archivo HTML.

### Validación y seguridad
- La validación actual es mínima y no cubre todos los campos.
- No hay autenticación ni autorización.
- No hay protección contra inyección o payload malicioso más allá de la validación JSON básica.

### Experiencia de producto
- El HTML generado es básico y solo sirve como MVP.
- No hay ruta para listar páginas guardadas.
- No hay edición o actualización de páginas ya generadas.
- No hay eliminación de páginas ni limpieza de archivos.

### Operaciones y despliegue
- No hay tests automatizados.
- No hay linting configurado.
- No hay manejo de errores centralizado más allá de la respuesta JSON simple.
- El servidor usa el módulo HTTP nativo y no tiene middleware ni estructura de rutas escalable.

## 4. Recomendaciones de mejoras

### 4.1 Persistencia real
- Añadir base de datos ligera (SQLite, PostgreSQL, MongoDB) para:
  - negocios
  - perfiles de página
  - trabajos y estados
  - historial de generación
- Guardar metadatos además del HTML (slug, nombre, autor, fecha, status).

### 4.2 Mejorar la generación de páginas
- Ajustar la plantilla para recibir:
  - branding visual
  - logo y paleta de colores
  - secciones personalizadas
  - llamados a la acción
- Agregar SEO básico (`title`, `description`, `keywords`).
- Soportar imágenes de cliente y contenido dinámico real.

### 4.3 API más productiva
- Añadir endpoint de listado de páginas generadas.
- Añadir endpoints para editar / actualizar / borrar páginas.
- Mejorar `generate-save` para devolver el slug y un URL accesible claro.
- Añadir metadatos en la respuesta (`createdAt`, `slug`, `status`).

### 4.4 Calidad y mantenimiento
- Agregar pruebas unitarias e integración para:
  - validación de payloads
  - generación de HTML
  - guardado y carga de archivos
  - endpoints HTTP
- Configurar linting y formateo.
- Agregar logging estructurado y trazabilidad de errores.

### 4.5 Escalabilidad y experiencia
- Considerar un router leve o framework microservice si crece el API.
- Registrar errores 404/500 con mensajes útiles.
- Controlar acceso al directorio `output` y evitar colisiones de slug.
- Diseñar el flujo de negocio para que tú como administrador puedas:
  - enviar datos de cliente
  - revisar la página generada
  - aprobar y entregar el HTML final

## 5. Prioridad inmediata
1. Guardar metadatos en DB y no solo HTML en disco.
2. Añadir pruebas para las rutas `generate-save` y `pages/:slug`.
3. Extender la validación de payload a los campos clave.
4. Crear endpoints para listar y borrar páginas generadas.
5. Mejorar la plantilla HTML para que sea más profesional y editable.

## 6. Conclusión
Actualmente existe un MVP funcional para generar y guardar páginas HTML de negocio.
Para convertirlo en una solución de venta usable, es necesario añadir persistencia, mejorar la validación, refinar la plantilla y ampliar los endpoints de gestión.

---

Este documento resume el estado actual y las mejoras más importantes para avanzar de un prototipo operativo a una solución de backend vendible.