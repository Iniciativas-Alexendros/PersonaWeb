> **Snapshot histórico · superseded por plan 2026-05-08 (sobre-alexendros-me-para-verificar-goofy-pascal).**
> Varios hallazgos descartados por conflicto con doctrina CLAUDE.md (Resend backend, CSP nonce, toggle dark/light, OG dinámica, ciudad "Madrid" errónea). Ver documento de plan para tratamiento completo.

# AUDITORÍA TÉCNICA
alexendros.me

**Fecha:** 2026-04-14  
**Proyecto Vercel:** `prj_UCSqcUAejJxekq0UlcqaOSlQeEl7` (team: `alexendros`)  
**Repositorio:** https://github.com/Alexendros/PersonaWeb  
**Dominio activo:** https://alexendros.me  
**Último deploy production:** `dpl_D321qNbJfiSkYB1FhhbHg4wUrgy1` — commit `66264d4` (PR #26, hero frase v2)  
**Runtime errors (24h):** 0  
**Lighthouse (2026-04-13):** Perf 99/96 · A11y 100 · BP 100 · SEO 100 · LCP 0.6s desktop / 1.8s mobile

---

## CONTEXTO PARA CLAUDE CODE

Este documento es una auditoría técnica completa del sitio personal-profesional `alexendros.me`.
El sitio es un portfolio estático (Next.js App Router, presuntamente `output: 'export'`).
No hay backend activo ni base de datos. Hay integración prevista con Resend para el formulario de contacto, pero su estado funcional es desconocido.

**Reglas de operación:**
- No inventar código que no se pueda verificar contra el repositorio real.
- No modificar ficheros no listados en cada tarea.
- Ejecutar siempre `pnpm typecheck && pnpm lint && pnpm build` antes de dar una tarea por completada.
- Respetar la estructura de dominios existente al proponer cambios.
- Cualquier cambio que afecte datos personales debe señalar implicación GDPR.

---

## ESTRUCTURA INFERIDA DEL REPOSITORIO

```
alexendrosme/
├── src/
│   ├── app/
│   │   ├── styles/            # 8 parciales CSS (tokens, breakpoints, typography,
│   │   │                      #   base, components, utilities, motion, print)
│   │   ├── (og)/              # OG image estática
│   │   ├── legal/
│   │   │   ├── aviso-legal/
│   │   │   ├── privacidad/
│   │   │   └── cookies/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── herramientas/
│   │   ├── contact/
│   │   ├── error.tsx
│   │   ├── apple-icon.tsx     # ImageResponse 180×180
│   │   ├── icon.svg
│   │   ├── layout.tsx         # Root layout + LD+JSON schemas
│   │   ├── page.tsx           # Home: Hero + Sobre mí + Proyectos + Stack
│   │   └── globals.css        # Index de parciales CSS
│   ├── components/            # Nav, Footer, ParticleBg, StackMarquee, etc.
│   └── lib/
│       └── site.ts            # Config global: URLs, email, metadata
├── public/
├── CLAUDE.md
├── CHANGELOG.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── eslint.config.mjs          # @next/eslint-plugin-next (next lint deprecado en Next 16)
└── tsconfig.json
```

**Rutas activas confirmadas (smoke test, todas HTTP 200):**
`/` `/about` `/projects` `/herramientas` `/contact`
`/legal/aviso-legal` `/legal/privacidad` `/legal/cookies`
`/og/opengraph-image.png` `/apple-icon` `/icon.svg`

---

## BUGS CONFIRMADOS

### BUG-01 · `<title>Inicio</title>` en página raíz
- **Impacto:** SEO — "Inicio" no tiene valor de keyword; confuso en pestañas del navegador.
- **Evidencia:** `curl -s https://alexendros.me | grep '<title>'` → `<title>Inicio</title>`
- **Fix:** En `src/app/page.tsx` añadir override:
  ```ts
  export const metadata: Metadata = {
    title: 'Alexendros',
  }
  ```
  O configurar template en `src/app/layout.tsx`:
  ```ts
  title: { default: 'Alexendros', template: '%s | Alexendros' }
  ```
  y en `page.tsx`: `title: 'Inicio'` → no, simplemente `title: 'Alexendros'` como excepción.

### BUG-02 · `addressLocality: "Valencia"` incorrecto
- **Impacto:** Dato personal incorrecto en LD+JSON Person schema y hero eyebrow.
- **Evidencia:** HTML renderizado contiene `"addressLocality":"Valencia"` y eyebrow `"Valencia · Fullstack · KitOS"`. El desarrollador reside en **Madrid**.
- **Fix:**
  - `src/lib/site.ts` → cambiar `addressLocality` de `"Valencia"` a `"Madrid"`
  - `src/app/page.tsx` → hero eyebrow: `"Madrid · Fullstack · KitOS"` (o eliminar ciudad)
  - `src/app/layout.tsx` → verificar que el LD+JSON Person lee de `site.ts`

### BUG-03 · `connect-src 'self'` bloquea servicios de terceros
- **Impacto:** Formulario de contacto / Resend bloqueado por CSP en producción.
- **Evidencia:** Cabecera en prod: `content-security-policy: ... connect-src 'self' ...`
- **Fix en `next.config.ts`** — bloque `headers()`:
  ```
  connect-src 'self' https://api.resend.com https://api.web3forms.com
  ```
  Documentar el cambio con comentario inline.

### BUG-04 · `unsafe-inline` en `script-src` y `style-src`
- **Impacto:** Anula protección XSS que el CSP pretende ofrecer.
- **Evidencia:** `content-security-policy: script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`
- **Fix (dos opciones):**
  - **Opción A (si se elimina `output: export`):** Implementar nonce CSP en `src/middleware.ts` — Next.js inyecta el nonce en cada request; eliminar `'unsafe-inline'`.
  - **Opción B (mantener export estático):** Documentar en `next.config.ts` con comentario:
    ```ts
    // 'unsafe-inline' requerido por Next.js RSC con output:export.
    // Revisar cuando se migre a standalone/serverless.
    ```

### BUG-05 · Formulario de contacto no funcional con `output: export`
- **Impacto CRÍTICO:** Las API Routes de Next.js no funcionan en modo `output: 'export'`. Si el formulario usa `fetch('/api/contact')`, falla silenciosamente en producción.
- **Verificación:** Comprobar `next.config.ts` → si contiene `output: 'export'`, confirmar bug.
- **Fix (elegir UNA opción):**

  **Opción A — Migrar a Vercel Serverless Functions (recomendada):**
  1. Eliminar `output: 'export'` de `next.config.ts`
  2. Crear `src/app/api/contact/route.ts`:
     ```ts
     import { Resend } from 'resend'
     import { NextRequest, NextResponse } from 'next/server'

     const resend = new Resend(process.env.RESEND_API_KEY)

     export async function POST(req: NextRequest) {
       const { name, email, message } = await req.json()
       // Validar inputs antes de enviar
       if (!name || !email || !message) {
         return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
       }
       await resend.emails.send({
         from: 'contacto@alexendros.me',
         to: 'contacto@alexendros.me',
         subject: `Contacto web: ${name}`,
         text: `De: ${email}\n\n${message}`,
       })
       return NextResponse.json({ ok: true })
     }
     ```
  3. Añadir `RESEND_API_KEY` en Vercel Dashboard → Settings → Environment Variables

  **Opción B — Web3Forms (sin cambios de config):**
  ```ts
  // En el componente de formulario:
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, ...formData }),
    headers: { 'Content-Type': 'application/json' },
  })
  ```

  **GDPR OBLIGATORIO (art. 6.1.a RGPD / art. 11 LOPDGDD):**
  Cualquier opción elegida debe incluir checkbox de consentimiento:
  ```tsx
  <label>
    <input type="checkbox" required />
    {' '}Acepto el tratamiento de mis datos según la{' '}
    <Link href="/legal/privacidad">Política de privacidad</Link>
  </label>
  ```
  Sin este checkbox, la recogida de datos es ilícita según art. 6 RGPD.
  Verificar también que `/legal/privacidad` incluye apartado "Formulario de contacto" con base legitimadora.

### BUG-06 · Card `alexendros.me` sin enlace en /projects y /
- **Impacto:** Inconsistencia UI — KitOS tiene enlace `alexendros.pro →`, `alexendros.me` muestra `<span>` sin enlace.
- **Evidencia:** HTML: `<span class="text-sm text-muted-foreground">alexendros.me</span>`
- **Fix en `src/app/page.tsx` y `src/app/projects/page.tsx`:**
  ```tsx
  // Cambiar el <span> por:
  <Link href="/" className="text-sm text-primary hover:underline">
    alexendros.me →
  </Link>
  ```

---

## DEUDA TÉCNICA

### DT-01 · Ausencia de CI/CD automatizado
- **Impacto:** Sin gates de calidad — typecheck, lint y secret scan solo se ejecutan si el dev lo recuerda.
- **Evidencia:** Sin `.github/workflows/` confirmado en historial de commits.
- **Fichero a crear:** `.github/workflows/ci.yml`

### DT-02 · `@types/node` bump major 22 → 25 sin tests
- **Impacto:** Dependabot mergeó `22.19.17 → 25.6.0` directamente a `main`. Posibles breaking changes en tipos Node internos.
- **Verificación:** `pnpm typecheck` — si pasa, riesgo bajo.

### DT-03 · Dark mode forzado, sin respeto a `prefers-color-scheme`
- **Impacto:** Usuarios con modo claro ven fondo negro. Accesibilidad reducida.
- **Evidencia:** `<html class="dark __variable_f11e04 __variable_fde7fc">`
- **Librería recomendada:** `next-themes` — `pnpm add next-themes`

### DT-04 · OG image estática (no dinámica por ruta)
- **Impacto:** Todas las rutas comparten el mismo preview al compartir en redes.
- **Fichero actual:** `public/og/opengraph-image.png` (PNG estático)
- **Fix:** Crear `src/app/opengraph-image.tsx` con `ImageResponse` de `next/og`

### DT-05 · Sin tests (unit ni e2e)
- **Impacto:** Regresiones no detectadas automáticamente.
- **Recomendación mínima:** smoke test con Playwright para las 11 rutas activas.

---

## PLAN DE TRABAJO — TAREAS PARA CLAUDE CODE

Las tareas están priorizadas y son independientes salvo dependencias explícitas.
Ejecutar siempre al final de cada tarea: `pnpm typecheck && pnpm lint && pnpm build`

---

### BLOQUE 0 — REPARACIONES CRÍTICAS

---

#### TAREA-01 · Fix título home y datos de ubicación
```
Prioridad: ALTA
Dominio: Calidad / SEO
Dependencias: ninguna
Estimación: 15 min
```

**Ficheros a modificar:**
- `src/app/page.tsx`
- `src/lib/site.ts`
- `src/app/layout.tsx` (solo verificar que LD+JSON lee de site.ts)

**Pasos:**
1. Abrir `src/app/page.tsx`. Añadir al principio del fichero:
   ```ts
   export const metadata: Metadata = {
     title: 'Alexendros',
   }
   ```
   Importar `Metadata` de `'next'` si no está ya importado.

2. Abrir `src/lib/site.ts`. Localizar `addressLocality` y cambiar `"Valencia"` → `"Madrid"`.

3. Abrir `src/app/page.tsx`. Localizar el hero eyebrow y cambiar:
   - `"Valencia · Fullstack · KitOS"` → `"Madrid · Fullstack · KitOS"`

4. Verificar que `src/app/layout.tsx` no tiene `addressLocality` hardcodeado — debe leer de `site.ts`.

**Criterio de éxito:**
```bash
pnpm build
curl -s https://alexendros.me | grep '<title>'
# Esperado: <title>Alexendros</title>
```

**Rollback:**
```bash
git revert HEAD
```

---

#### TAREA-02 · Resolver formulario de contacto
```
Prioridad: ALTA
Dominio: Workflows / GDPR
Dependencias: Decisión previa: ¿output:export o standalone?
Estimación: 45-90 min
```

**Paso 0 — Verificación previa:**
```bash
grep -n "output" next.config.ts
```
Si contiene `output: 'export'` → el formulario con API Route está roto. Elegir Opción A o B.

**Opción A — Migrar a Serverless (recomendada):**

Ficheros a modificar/crear:
- `next.config.ts` — eliminar `output: 'export'`
- `src/app/api/contact/route.ts` — crear (ver código en BUG-05)
- `src/app/contact/page.tsx` — actualizar `action` del formulario a `/api/contact`
- `.env.local` — añadir `RESEND_API_KEY=re_xxxx`
- Vercel Dashboard → añadir `RESEND_API_KEY` como env var Production

**Opción B — Web3Forms (mantener export):**

Ficheros a modificar:
- `src/app/contact/page.tsx` — cambiar fetch target
- `.env.local` — añadir `NEXT_PUBLIC_WEB3FORMS_KEY=xxxx`

**GDPR — OBLIGATORIO en ambas opciones:**

En `src/app/contact/page.tsx`, añadir antes del botón submit:
```tsx
<div className="flex items-start gap-2">
  <input
    type="checkbox"
    id="consent"
    name="consent"
    required
    className="mt-1"
  />
  <label htmlFor="consent" className="text-sm text-muted-foreground">
    Acepto el tratamiento de mis datos personales según la{' '}
    <Link href="/legal/privacidad" className="text-primary underline underline-offset-4">
      Política de privacidad
    </Link>
    {' '}(art. 6.1.a RGPD)
  </label>
</div>
```

También añadir campo honeypot anti-spam:
```tsx
<input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />
```

**Criterio de éxito:**
- Enviar formulario de prueba → recibir email en `contacto@alexendros.me`
- Sin checkbox marcado → botón submit deshabilitado o muestra error

**Rollback:**
```bash
# Opción A:
git revert HEAD
# Restaurar output: 'export' en next.config.ts
# Eliminar src/app/api/contact/route.ts
```

---

#### TAREA-03 · Fix connect-src CSP
```
Prioridad: ALTA
Dominio: Seguridad
Dependencias: Decisión de TAREA-02 (saber qué endpoints necesita el formulario)
Estimación: 15 min
```

**Fichero a modificar:** `next.config.ts`

**Pasos:**
1. Localizar el bloque `headers()` en `next.config.ts`.
2. Encontrar la directiva `connect-src`.
3. Reemplazar:
   ```
   connect-src 'self'
   ```
   por (ajustar según opción elegida en TAREA-02):
   ```
   connect-src 'self' https://api.resend.com https://api.web3forms.com
   ```
4. Añadir comentario inline:
   ```ts
   // connect-src ampliado 2026-04-14: Resend API (formulario contacto) y Web3Forms (fallback)
   ```
5. Para `unsafe-inline`: añadir comentario explicativo si no se puede eliminar:
   ```ts
   // 'unsafe-inline' requerido por Next.js RSC con output:export.
   // Revisar al migrar a standalone — implementar nonce en src/middleware.ts
   ```

**Criterio de éxito:**
```bash
pnpm build
curl -I https://alexendros.me | grep content-security-policy
# connect-src debe incluir api.resend.com o api.web3forms.com
```

**Rollback:**
```bash
git revert HEAD
```

---

### BLOQUE 1 — ESTÁNDARES DE CALIDAD Y CI/CD

---

#### TAREA-04 · Crear CI workflow GitHub Actions
```
Prioridad: ALTA
Dominio: Calidad
Dependencias: ninguna
Estimación: 20 min
```

**Fichero a crear:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Typecheck · Lint · Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build

  secret-scan:
    name: Secret scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: TruffleHog scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: './'
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
          extra_args: --only-verified
```

**Verificar que `package.json` tiene estos scripts. Si no existen, añadir:**
```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint ."
  }
}
```
(No sobreescribir scripts existentes — solo añadir los que falten.)

**Criterio de éxito:**
- Abrir PR de prueba → check `CI / Typecheck · Lint · Build` aparece en GitHub
- `pnpm typecheck` exitoso localmente sin errores

**Rollback:**
```bash
rm .github/workflows/ci.yml
```

---

#### TAREA-05 · Verificar y corregir @types/node major bump
```
Prioridad: MEDIA
Dominio: Calidad
Dependencias: TAREA-04 (CI debe pasar antes)
Estimación: 10 min
```

**Fichero a verificar:** `package.json`

**Pasos:**
1. Ejecutar `pnpm typecheck` — si pasa sin errores, el bump es compatible.
2. Si hay errores de tipos relacionados con Node.js APIs:
   - Identificar los ficheros afectados
   - Corregir imports o tipos específicos
3. Documentar el resultado en `CHANGELOG.md`

**Criterio de éxito:**
```bash
pnpm typecheck
# Exit code 0, sin errores
```

**Rollback:**
```bash
pnpm add -D @types/node@22.19.17
```

---

### BLOQUE 2 — WORKFLOWS E INTEGRACIONES

---

#### TAREA-06 · OG image dinámica por ruta
```
Prioridad: MEDIA
Dominio: Workflows / SEO
Dependencias: Decisión sobre output:export (TAREA-02)
Nota: Solo ejecutar si se migra a standalone. Con output:export, ImageResponse dinámica no funciona.
Estimación: 30 min
```

**Ficheros a crear:**
- `src/app/opengraph-image.tsx`
- `src/app/about/opengraph-image.tsx`
- `src/app/projects/opengraph-image.tsx`

**Fichero a eliminar:**
- `public/og/opengraph-image.png` (solo tras confirmar que las rutas dinámicas funcionan)

**Template base `src/app/opengraph-image.tsx`:**
```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ color: '#ffffff', fontSize: 72, fontWeight: 700 }}>
          Alexendros
        </div>
        <div style={{ color: '#a1a1aa', fontSize: 32, marginTop: 24 }}>
          Fullstack Developer · Madrid
        </div>
      </div>
    ),
    { ...size }
  )
}
```

**Criterio de éxito:**
```bash
curl -I https://alexendros.me/opengraph-image
# content-type: image/png
# Validar en: https://www.opengraph.xyz/url/https%3A%2F%2Falexendros.me
```

**Rollback:**
```bash
git revert HEAD
# Restaurar public/og/opengraph-image.png si se eliminó
```

---

#### TAREA-07 · Dark/light mode toggle
```
Prioridad: MEDIA
Dominio: UI/UX
Dependencias: ninguna
Estimación: 30 min
```

**Ficheros a modificar/crear:**
- `package.json` — añadir `next-themes` si ausente
- `src/app/layout.tsx`
- `src/components/Nav.tsx`
- `src/components/ThemeToggle.tsx` (nuevo)

**Pasos:**
1. Verificar si `next-themes` ya está en `package.json`. Si no:
   ```bash
   pnpm add next-themes
   ```

2. En `src/app/layout.tsx`, envolver `<body>` en `ThemeProvider`:
   ```tsx
   import { ThemeProvider } from 'next-themes'
   
   // En JSX:
   <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
     {children}
   </ThemeProvider>
   ```

3. Crear `src/components/ThemeToggle.tsx`:
   ```tsx
   'use client'
   import { useTheme } from 'next-themes'
   import { Sun, Moon } from 'lucide-react'
   
   export function ThemeToggle() {
     const { theme, setTheme } = useTheme()
     return (
       <button
         aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
         className="icon-link"
       >
         {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
       </button>
     )
   }
   ```

4. En `src/components/Nav.tsx`, añadir `<ThemeToggle />` junto al menú mobile.

5. **Verificar tokens CSS:** los tokens oklch en `src/app/styles/tokens.css` deben tener variante `:root` (light) y `.dark` (dark). Si solo existe `.dark`, añadir valores light razonables.

**Criterio de éxito:**
```bash
pnpm build
# Toggle visible en Nav, cambia clase en <html>
```

**Rollback:**
```bash
pnpm remove next-themes
git revert HEAD
```

---

### BLOQUE 3 — UI/UX Y DESIGN SYSTEM

---

#### TAREA-08 · Hero: microcopy CTA + fix eyebrow
```
Prioridad: MEDIA
Dominio: UI/UX
Dependencias: TAREA-01 (ubicación correcta)
Estimación: 15 min
```

**Fichero a modificar:** `src/app/page.tsx`

**Pasos:**
1. Verificar que el eyebrow ya fue actualizado a `"Madrid · Fullstack · KitOS"` en TAREA-01.

2. Bajo los botones CTA (`"Hablemos"` / `"Ver proyectos"`), añadir:
   ```tsx
   <p
     id="response-time"
     className="text-xs text-muted-foreground"
   >
     Respondo en menos de 48h
   </p>
   ```

3. En el botón `"Hablemos"`, añadir `aria-describedby="response-time"`.

4. **No modificar** la frase hero `hero-signature` — PR #26 recién mergeado.

**Criterio de éxito:**
```bash
pnpm build
# "Respondo en menos de 48h" visible bajo los CTAs
# aria-describedby en el botón verificado con DevTools
```

**Rollback:**
```bash
git revert HEAD
```

---

#### TAREA-09 · Projects: tech chips + enlace card alexendros.me
```
Prioridad: MEDIA
Dominio: UI/UX
Dependencias: ninguna
Estimación: 20 min
```

**Fichero a modificar:** `src/app/projects/page.tsx` (y `src/app/page.tsx` si las cards se renderizan ahí)

**Pasos:**
1. Localizar la card de **KitOS**. Añadir chips de tech bajo la descripción:
   ```tsx
   <div className="flex flex-wrap gap-1 mt-2">
     {['Next.js', 'Supabase', 'Stripe', 'Turborepo'].map((tech) => (
       <span key={tech} data-slot="badge" data-variant="outline"
         className="group/badge inline-flex h-5 w-fit items-center justify-center gap-1
           overflow-hidden rounded-4xl border border-border px-2 py-0.5
           text-xs font-medium text-muted-foreground">
         {tech}
       </span>
     ))}
   </div>
   ```

2. Localizar la card de **alexendros.me**. Añadir chips:
   ```tsx
   {['Next.js', 'Tailwind v4'].map(...)}
   ```

3. En la card `alexendros.me`, cambiar el `<span>alexendros.me</span>` por:
   ```tsx
   <Link href="/" className="text-sm text-primary hover:underline">
     alexendros.me →
   </Link>
   ```

4. **No añadir URLs** para proyectos roadmap (StageKit/LexKit/GestKit) — no tienen URLs reales.

**Criterio de éxito:**
```bash
pnpm build
# Chips visibles en /projects
# Card alexendros.me tiene <a href="/"> funcional
```

**Rollback:**
```bash
git revert HEAD
```

---

### BLOQUE 4 — DOCUMENTACIÓN TÉCNICA

---

#### TAREA-10 · CLAUDE.md: decisiones pendientes + GDPR
```
Prioridad: BAJA
Dominio: Docs
Dependencias: Resultado de TAREA-02 (decisión output:export vs standalone)
Estimación: 15 min
```

**Fichero a modificar:** `CLAUDE.md`

**Añadir las siguientes secciones** (no sobreescribir contenido existente):

```markdown
## Decisiones de arquitectura pendientes

### output: 'export' vs standalone
- Estado actual: verificar en `next.config.ts`
- Si `output: 'export'`: API Routes NO funcionan. El formulario de contacto requiere
  solución alternativa (Web3Forms, Formspree) o migración a standalone.
- Si se migra a standalone: eliminar esta sección y documentar la migración.

### Formulario de contacto
- Backend elegido: [RELLENAR tras TAREA-02]
- Variable de entorno necesaria: `RESEND_API_KEY` (si Opción A) o `NEXT_PUBLIC_WEB3FORMS_KEY` (si Opción B)
- Añadir en Vercel Dashboard → Settings → Environment Variables → Production

## Gates de CI (ejecutar antes de cada PR)

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint .
pnpm build       # next build
```

## GDPR / Privacidad

- **Base legitimadora del formulario de contacto:** art. 6.1.a RGPD (consentimiento expreso)
- **Obligación:** checkbox de consentimiento visible antes del botón submit
- **Texto requerido:** referencia explícita a `/legal/privacidad`
- **Verificar:** que `/legal/privacidad` incluye apartado "Formulario de contacto"
  con descripción del tratamiento (finalidad, plazo de conservación, derechos del interesado)
- **Normativa aplicable:**
  - Reglamento (UE) 2016/679 (RGPD) — art. 6, 13 — vigente desde 25/05/2018
  - LO 3/2018 (LOPDGDD) — art. 11 — vigente desde 07/12/2018
```

**Criterio de éxito:**
```bash
grep -n "Decisiones de arquitectura" CLAUDE.md
grep -n "GDPR" CLAUDE.md
# Ambos deben devolver resultados
```

**Rollback:**
```bash
git revert HEAD
# Solo docs, sin impacto en build
```

---

#### TAREA-11 · CHANGELOG: registrar auditoría y estado de tareas
```
Prioridad: BAJA
Dominio: Docs
Dependencias: ninguna (ejecutar al inicio, antes de las demás tareas)
Estimación: 10 min
```

**Fichero a modificar:** `CHANGELOG.md`

**Añadir al principio** (tras el encabezado existente):

```markdown
## 2026-04-14 — Auditoría técnica completa

### Sesión
Auditoría realizada por Perplexity AI (Sonnet 4.6) sobre el estado del repositorio
en producción. 26 PRs mergeados en la jornada. Sin errores de runtime en 24h.
Lighthouse: Perf 99/96 · A11y 100 · BP 100 · SEO 100.

### Bugs identificados
- [ ] BUG-01: `<title>Inicio</title>` en home → TAREA-01
- [ ] BUG-02: `addressLocality: "Valencia"` incorrecto → TAREA-01
- [ ] BUG-03: `connect-src 'self'` bloquea Resend → TAREA-03
- [ ] BUG-04: `unsafe-inline` en CSP → TAREA-03
- [ ] BUG-05: Formulario de contacto no funcional con output:export → TAREA-02
- [ ] BUG-06: Card alexendros.me sin enlace → TAREA-09

### Deuda técnica identificada
- [ ] DT-01: Sin CI/CD automatizado → TAREA-04
- [ ] DT-02: @types/node major bump sin tests → TAREA-05
- [ ] DT-03: Dark mode forzado → TAREA-07
- [ ] DT-04: OG image estática → TAREA-06
- [ ] DT-05: Sin tests → pendiente (fuera de este sprint)
```

**Criterio de éxito:**
```bash
head -30 CHANGELOG.md
# Debe mostrar la entrada 2026-04-14
```

**Rollback:**
```bash
git revert HEAD
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
TAREA-11 (CHANGELOG, primero para tener registro)
  → TAREA-01 (fix título + ubicación, rápido y sin riesgo)
  → TAREA-04 (CI, protege el resto de tareas)
  → TAREA-02 (formulario, decisión arquitectónica — requiere tu input)
  → TAREA-03 (CSP, depende de TAREA-02 para saber endpoints)
  → TAREA-05 (verificar @types/node)
  → TAREA-08 (hero microcopy)
  → TAREA-09 (projects cards)
  → TAREA-06 (OG dinámica — solo si se migra a standalone)
  → TAREA-07 (dark mode toggle)
  → TAREA-10 (CLAUDE.md docs, al final con decisiones tomadas)
```

---

## VERIFICACIÓN FINAL

Tras completar todas las tareas, ejecutar:

```bash
# 1. Calidad
pnpm typecheck && pnpm lint && pnpm build

# 2. Smoke test rutas
for route in "/" "/about" "/projects" "/herramientas" "/contact" \
  "/legal/aviso-legal" "/legal/privacidad" "/legal/cookies"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://alexendros.me$route")
  echo "$route → $code"
done
# Todas deben devolver 200

# 3. SEO checks
curl -s https://alexendros.me | grep '<title>'
# Esperado: <title>Alexendros</title>

curl -s https://alexendros.me | grep 'addressLocality'
# Esperado: "addressLocality":"Madrid"

# 4. CSP check
curl -I https://alexendros.me | grep content-security-policy
# connect-src debe incluir api.resend.com o api.web3forms.com

# 5. Formulario
# Enviar formulario de prueba desde /contact → confirmar email recibido
```

---

## REFERENCIAS NORMATIVAS

| Norma | Artículo | Materia | Vigencia |
|---|---|---|---|
| Reglamento (UE) 2016/679 (RGPD) | Art. 6.1.a | Base legitimadora consentimiento | 25/05/2018 |
| Reglamento (UE) 2016/679 (RGPD) | Art. 13 | Info activa en recogida de datos | 25/05/2018 |
| LO 3/2018 (LOPDGDD) | Art. 11 | Transparencia en tratamiento | 07/12/2018 |
| WCAG 2.1 AA | Criterio 2.5.5 | Tap target mínimo 44×44px | — |
| WCAG 2.1 AA | Criterio 1.4.3 | Contraste mínimo (pendiente a11y flag) | — |
| CSP Level 3 (W3C) | — | Nonce-based CSP para eliminar unsafe-inline | — |

---

*Fin del documento de auditoría — alexendros.me — 2026-04-14*
