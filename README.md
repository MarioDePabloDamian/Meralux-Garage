# Meralux Garage

Landing page con Next.js, React y Tailwind CSS. Desplegada en GitHub Pages.

**Dominio:** [https://meralux.mariodepablo.es](https://meralux.mariodepablo.es)

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Genera la carpeta `out/` con el sitio estático.

## GitHub Pages + dominio personalizado

> **Requisito:** el repositorio debe ser **público** (plan gratuito) o tener GitHub Pro si es privado. Si el repo es privado, Pages no se puede activar y el deploy fallará con `404 Not Found`.

### 1. Hacer el repo público (si aplica)

**Settings → General → Danger zone → Change repository visibility → Public**

### 2. Activar GitHub Pages

1. **Settings → Pages → Build and deployment**
2. **Source:** GitHub Actions
3. **Custom domain:** `meralux.mariodepablo.es`
4. Activa **Enforce HTTPS** cuando esté disponible

### 3. DNS (panel de `mariodepablo.es`)

Crea un registro **CNAME**:

| Campo | Valor |
|-------|-------|
| Tipo | `CNAME` |
| Nombre / Host | `meralux` |
| Destino / Valor | `MarioDePabloDamian.github.io` |

```
meralux  →  MarioDePabloDamian.github.io
```

### 4. GitHub (repositorio del proyecto)

Tras activar Pages, cada push a `main` ejecuta `.github/workflows/deploy.yml`.

El archivo `public/CNAME` ya incluye el dominio y se publica en cada deploy.

**Node.js:** el CI usa Node 24. En local instala la misma versión si quieres paridad con el workflow.
