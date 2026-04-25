# Plan de validación · TypeScript 6.x · alexendros-me

> **Estado:** propuesta de testing antes de reabrir el bump.
> **Origen:** PR #29 (Dependabot `bump typescript 5.9.3 → 6.0.3`) cerrado el 2026-04-23 sin merge.
> **Razón del cierre:** salto major sin garantía de typecheck/build verde + `ts-prune@0.10.3` abandonado y dependiente de la API interna del compilador TS.
> **Referencia:** golden-set autoresearch code-reviewer 2026-W17 — `pr-alexendrosme-29.yaml` (4 findings: 2 high + 1 medium + 1 low; recomendación BLOCK confirmada por agente).

## Objetivo

Reabrir el bump TS 5→6 únicamente cuando se haya verificado que:

1. `pnpm typecheck` y `pnpm build` pasan en una rama de prueba aislada.
2. El script `pnpm deadcode:exports` (que usa `ts-prune`) sigue funcionando bajo TS 6.x, **o** se reemplaza por una alternativa activa antes del bump.
3. La cadena `eslint flat + typescript-eslint@8.x` no introduce regresiones.

## Pre-requisitos

- Última versión estable de TypeScript 6 (a la fecha del intento).
- Conocimiento de los breaking changes documentados en el [release notes oficial](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html) — revisarlos antes de empezar.
- Branch dedicada (no usar la rama de Dependabot original).

## Pasos · validación

### Paso 1 · sustituir `ts-prune` (bloqueante)

`ts-prune@0.10.3` fue abandonado en 2021 y consume APIs internas del compilador TS que han cambiado en el major 6.0. Sin sustituirlo el script `deadcode:exports` se romperá.

**Alternativas evaluables**:

| Herramienta | Status | Notas |
|---|---|---|
| [`knip`](https://github.com/webpro/knip) | ✅ activa | Reemplazo más completo: detecta unused files + exports + deps + types. Soporta TS 6 oficialmente. Pasa por configuración `knip.config.ts`. |
| [`ts-unused-exports`](https://github.com/pzavolinsky/ts-unused-exports) | ✅ activa | Más simple, solo unused exports. Útil si se quiere minimizar cambio. |
| Mantener `ts-prune` | ❌ | Sin actualización; alta probabilidad de crash bajo TS 6. |

**Recomendación**: migrar a `knip` (más completo y con mejor mantenimiento).

```bash
pnpm remove -D ts-prune
pnpm add -D knip
# crear knip.config.ts mínimo
# actualizar script deadcode:exports en package.json
```

### Paso 2 · branch de prueba

```bash
git checkout -b test/typescript-6-compat
pnpm add -D typescript@^6.0.3 @types/node@latest
pnpm install
```

### Paso 3 · ejecutar la cadena completa

```bash
pnpm typecheck   # debe pasar limpio
pnpm lint        # ESLint con typescript-eslint@8.x sobre TS 6
pnpm build       # `next build` con output: 'export'
pnpm deadcode:exports  # nuevo runner (knip / ts-unused-exports)
```

### Paso 4 · documentar resultado

| Verificación | Estado | Notas |
|---|---|---|
| `pnpm typecheck` | ⏳ | |
| `pnpm lint` | ⏳ | |
| `pnpm build` | ⏳ | |
| `pnpm deadcode:exports` | ⏳ | |
| Lighthouse local | ⏳ | LCP/INP/CLS deben mantenerse en thresholds del CLAUDE.md |

### Paso 5 · si todo verde → PR manual

- Abrir PR manual (no Dependabot) con título `chore(deps): typescript 5→6 + ts-prune→knip migration`.
- Body: enlazar este documento + capturas de los pnpm commands en verde.
- Esperar CI verde antes de mergear.

### Paso 6 · si algo falla → documentar en este mismo doc

Anotar el comando, la salida y la causa raíz en un bloque al final. No volver a abrir el bump hasta que la causa esté resuelta.

## Coordinación con `alexendros-pro`

`alexendros-pro` (monorepo Turborepo) también usa TS 5.8. La doctrina del CLAUDE.md raíz menciona Next.js 16 + Node 22 como recomendado, pero TypeScript 6 no se ha decidido aún. Antes de bumpear este repo:

1. Confirmar política con `alexendros-pro` (pin compartido vs versiones independientes).
2. Si comparten compilador, alinear el bump en una ventana coordinada.

## Trigger para reabrir

Una vez que (a) `knip` u otra alternativa esté integrada y verde, y (b) la matriz del Paso 4 esté toda en ✅ → reabrir vía PR manual y, si pasa, mergear.

Mientras tanto: aceptar Dependabot v5.x (mantenimiento) y rechazar v6.x.
