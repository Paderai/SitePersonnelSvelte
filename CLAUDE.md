# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application using Svelte 5, configured as a static site with the `@sveltejs/adapter-static` adapter. The project is set up for deployment to cPanel with prerendering enabled.

## Key Commands

**Development:**
```sh
npm run dev           # Start dev server
npm run dev -- --open # Start dev server and open in browser
```

**Build & Preview:**
```sh
npm run build   # Create production build
npm run preview # Preview production build locally
```

**Code Quality:**
```sh
npm run check         # Type-check with svelte-check
npm run check:watch   # Type-check in watch mode
npm run lint          # Run ESLint and Prettier checks
npm run format        # Format code with Prettier
```

## Architecture

**Static Site Configuration:**
The project uses `adapter-static` with specific configuration for cPanel deployment (svelte.config.js:14-24):
- `fallback: 'index.html'` enables SPA routing
- Empty `base` and `assets` paths for cPanel compatibility
- `prerender.entries: ['*']` pre-generates all routes

**Styling:**
- Tailwind CSS v4 via Vite plugin (vite.config.ts:5-6)
- Global styles in src/app.css with Tailwind plugins: @tailwindcss/forms and @tailwindcss/typography
- Layout component (src/routes/+layout.svelte) imports app.css globally

**Project Structure:**
- `src/routes/` - File-based routing (SvelteKit convention)
- `src/lib/` - Shared components and utilities (accessible via `$lib` alias)
- `src/app.css` - Global Tailwind imports and configuration

**Svelte Version:**
This project uses Svelte 5, which has a new syntax including runes like `$props()` for component props.
