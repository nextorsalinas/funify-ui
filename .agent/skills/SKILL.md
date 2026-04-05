---
name: fullstack-web-developer
description: Usar cuando se necesite diseñar, desarrollar o mejorar aplicaciones web modernas utilizando Next.js y Laravel. Incluye arquitectura de software, desarrollo frontend y backend, integración de APIs, diseño UX/UI mobile-first, control de versiones con GitHub y despliegue manual/continuo en Hostinger.
---

# Skill: Fullstack Web Developer (Funifay Edition) 🚀

Diseña y desarrolla aplicaciones web modernas centradas en el usuario, combinando buenas prácticas de ingeniería y eficiencia, con foco específico en el flujo de trabajo de Funifay.

---

## Visión General

Esta skill guía el desarrollo de Funifay priorizando la estabilidad entre el entorno local y producción.

1. **Arquitectura**: Next.js (Front) + Laravel 11 (API) en subdominios separados.
2. **Despliegue**: Manual en Hostinger mediante SSH.
3. **Sincronización**: Dualidad entre Local (SQLite) y Producción (MySQL).

---

## REGLAS ESPECÍFICAS DE FUNIFAY (Lectura Obligatoria) 🕵️‍♂️✨🏗️🦾

### 🏚️ 1. Estrategia de Base de Datos Dual
*   **Local (PC):** Se usa siempre **SQLite** (`database/database.sqlite`). Esto evita depender de XAMPP/MySQL local. El `.env` local debe usar rutas absolutas para SQLite en Windows.
*   **Producción (Hostinger):** Se usa **MySQL**. 
*   **Migraciones:** En local usar `php artisan migrate:fresh` para resets rápidos. En Hostinger usar `php artisan migrate` únicamente.

### ⚙️ 2. Despliegue Manual en Hostinger
*   **No subir 'vendor':** Jamás se sube la carpeta `vendor` por FTP/SSH. Se gestiona dentro del servidor.
*   **Limpieza obligatoria:** Tras subir cambios de código, ejecutar siempre en SSH:
    `php artisan config:clear` y `php artisan route:clear`.
*   **Fix de Error 500:** Si Hostinger da error fatal tras un despliegue, eliminar el archivo de chequeo de plataforma: `rm vendor/composer/platform_check.php`.

### 🔐 3. El Triángulo de Google OAuth
Para que el login funcione en cualquier entorno, deben coincidir estos 3 puntos:
1.  **Google Cloud Console:** URIs de redirección autorizados actualizados.
2.  **Archivo .env:** `GOOGLE_REDIRECT_URL` correcto para el entorno.
3.  **Sanctum:** `SANCTUM_STATEFUL_DOMAINS` debe incluir el puerto del frontend (ej: `localhost:3000`).

---

## Metodología de Desarrollo

### 1. Frontend (Mobile-First)
- Diseñar primero para pantallas pequeñas (≥320px).
- Usar Tailwind CSS para consistencia visual.
- Priorizar `ClientMountGuard` para evitar errores de hidratación en Next.js.

### 2. Backend (Laravel)
- Validación obligatoria en controladores API.
- Respuestas en formato JSON consistente.
- Forzar HTTPS en producción vía `AppServiceProvider`.

---

## Archivos de Referencia del Proyecto

| Archivo | Contenido |
|--------|----------|
| `guia_despliegue.txt` | Pasos manuales para actualizar Hostinger. |
| `walkthrough.md` | Resumen de los últimos cambios y estabilización. |
| `backend/.env` | Configuración de variables (Local y Producción). |

---

## Reglas de Oro
- Priorizar claridad sobre "código inteligente".
- No sobrecomplicar soluciones simples.
- **Antes de subir a Hostinger:** Asegurarse de que el `.env` esté en modo Producción. 🦾🚀🏗️
