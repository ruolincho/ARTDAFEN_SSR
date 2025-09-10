# Nuxt 4 SSR Template with Element Plus (Build-time SCSS Theme)
- SSR (Nuxt 4)
- Element Plus with **SCSS build-time theme override** (primary = `#FF5722`)
- Axios + interceptors
- Swiper 8 (ClientOnly)
- @nuxtjs/sitemap

## Quickstart
```bash
pnpm i
pnpm dev
```

## Change brand color
Edit `assets/styles/element/index.scss`:
```scss
$colors: (
  'primary': ('base': #FF5722),
);
```
Then rebuild.
