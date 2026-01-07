# Technical Documentation

## Residencia Nueva Edad - SPA

Modern single-page application built with Astro and React.

## Tech Stack

- **Framework**: Astro 5.x (SSG with partial hydration)
- **UI Library**: React 19.x (interactive components)
- **Styling**: TailwindCSS 3.x
- **State Management**: Zustand
- **Icons**: HeroIcons
- **Validation**: Zod
- **Email**: Resend

## Architecture

### Rendering Strategy

- **Static Content**: Astro components (server-rendered)
- **Interactive Components**: React with `client:only="react"` directive
- **Hydration**: Avoided for i18n components to prevent mismatches

### Key Components

#### AutoSlider (`src/components/AutoSlider.tsx`)
Responsive image slider with auto-rotation.
- Horizontal layout on desktop, vertical on mobile
- Auto-advances every 5 seconds
- Click to navigate

#### Accordion (`src/components/Accordion.tsx`)
Expandable service descriptions.
- Single item open at a time
- Smooth transitions

#### Carousel (`src/components/Carousel.tsx`)
Testimonial carousel with auto-play.
- Fetches from API or uses mock data
- Dot navigation

#### Map (`src/components/Map.tsx`)
Google Maps embed without API key.
- Uses iframe embed URL
- External link to full map

#### ConsentManager (`src/components/ConsentManager.tsx`)
Cookie consent banner.
- Stores preference in localStorage
- Dispatches events for analytics integration

### Services

#### Config (`src/services/config.ts`)
Centralized configuration with environment variable support.

#### Testimonials (`src/services/testimonials.ts`)
Fetches testimonials from API or returns mock data.
- Validates with Zod schema
- Falls back gracefully

### State Management

#### Language Store (`src/stores/languageStore.ts`)
Global language state with Zustand.
- Persists to localStorage
- Provides translation function

#### Data Store (`src/stores/dataStore.ts`)
Manages testimonials data loading.

## Configuration

Environment variables (`.env`):
```bash
PUBLIC_SITE_NAME="Residencia Nueva Edad"
PUBLIC_PHONE="+34 983 521 071"
PUBLIC_EMAIL="info@residencianuevaedad.es"
PUBLIC_GOOGLE_TESTIMONIALS="https://..."
```

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

## See Also

- [I18N.md](./I18N.md) - Internationalization details
- [COOKIES.md](./COOKIES.md) - Cookie policy implementation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
