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

### 1. DNS (en el panel de `mariodepablo.es`)

Crea un registro **CNAME**:

| Campo | Valor |
|-------|-------|
| Tipo | `CNAME` |
| Nombre / Host | `meralux` |
| Destino / Valor | `<usuario-github>.github.io` |

Ejemplo si tu usuario de GitHub es `mariodepablo`:

```
meralux  →  mariodepablo.github.io
```

> No uses la IP del dominio raíz. Para subdominios en GitHub Pages siempre va un CNAME al `.github.io`.

### 2. GitHub (repositorio del proyecto)

1. Sube el código y activa **Settings → Pages → Source: GitHub Actions**.
2. En **Custom domain**, escribe: `meralux.mariodepablo.es`
3. Espera la comprobación DNS (puede tardar unos minutos).
4. Activa **Enforce HTTPS** cuando GitHub lo permita.

El archivo `public/CNAME` ya incluye el dominio y se publica en cada deploy.

### 3. Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica el sitio.
