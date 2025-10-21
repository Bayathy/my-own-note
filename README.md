# Amethyst

Turborepo monorepo for Amethyst note-taking application.

## Project Structure

```
.
├── apps/
│   ├── desktop/        # Next.js 15 + Electron desktop app
│   └── api/            # Hono + Cloudflare Workers API
├── packages/
│   ├── shared/         # Shared types and utilities
│   ├── tsconfig/       # Shared TypeScript configurations
│   └── biome-config/   # Shared Biome (linter/formatter) configurations
└── turbo.json          # Turborepo configuration
```

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Run all apps in development mode:

```bash
bun run dev
```

Run specific app:

```bash
# Desktop app only
cd apps/desktop && bun run dev

# API only
cd apps/api && bun run dev

# Electron app
cd apps/desktop && bun run electron:dev
```

### Build

Build all apps:

```bash
bun run build
```

Build specific app:

```bash
# Desktop app
bun run build --filter=@amethyst/desktop

# API
bun run build --filter=@amethyst/api
```

### Type Check & Lint

```bash
# Type check all packages
bun run type-check

# Lint all packages
bun run lint

# Format code
bun run format
```

### Testing

```bash
# Run tests
bun run test

# Run tests with coverage
bun run test:coverage
```

## Tech Stack

### Desktop App (`apps/desktop`)
- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Desktop**: Electron
- **Editor**: Tiptap 3
- **UI**: shadcn/ui, Tailwind CSS 4, Framer Motion
- **Testing**: Vitest, Playwright
- **Dev Tools**: Biome, TypeScript

### API (`apps/api`)
- **Framework**: Hono
- **Runtime**: Cloudflare Workers
- **Dev Tools**: Wrangler, TypeScript, Biome

### Shared Packages
- **`@amethyst/shared`**: Shared types and utilities
- **`@amethyst/tsconfig`**: Shared TypeScript configurations
  - `base.json`: Common TypeScript settings
  - `nextjs.json`: Next.js specific settings
  - `workers.json`: Cloudflare Workers specific settings
- **`@amethyst/biome-config`**: Shared Biome configurations
  - `base.json`: Common linter/formatter settings
  - `nextjs.json`: Next.js + React specific settings
  - `workers.json`: Cloudflare Workers specific settings

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Biome Documentation](https://biomejs.dev/)
