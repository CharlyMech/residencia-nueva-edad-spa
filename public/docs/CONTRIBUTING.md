# Contributing

## Development Setup

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Run development server**:
    ```bash
    pnpm dev
    ```

## Directory Structure

-   `src/components`: React and Astro components.
-   `src/layouts`: Page layouts (e.g., `Layout.astro` with SEO and generic styles).
-   `src/pages`: Astro routes (e.g., `index.astro`).
-   `src/i18n`: Internationalization logic and JSON files.
-   `src/stores`: Zion/Zustand stores for state management (e.g., `languageStore`).

## Guidelines

-   **Styling**: Use TailwindCSS. Avoid custom CSS unless necessary.
-   **Icons**: Use HeroIcons (`@heroicons/react`).
-   **State**: Use `nanostores` or `zustand` if present (see `src/stores`).
-   **Responsive**: Always design mobile-first. Test on small screens (320px+).

## Deployment

The project is deployed on Vercel. Pushing to `main` triggers a deployment.
