# Residence - Elderly Care Website

Una aplicación web moderna para residencias de cuidado de ancianos, construida con Astro, React y Tailwind CSS.

## 🚀 Características

- ✨ Diseño moderno y responsivo
- 🌙 Modo oscuro/claro
- 🌍 Soporte multiidioma (ES, EN, PT, FR, IT)
- 📱 Mobile-first
- ⚡ Rendimiento optimizado con Astro
- 🎨 Componentes reutilizables con React
- 💾 Gestión de estado con Zustand
- 🎯 TypeScript para type safety

## 📦 Estructura del Proyecto

```
/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Accordion.tsx
│   │   ├── Carousel.tsx
│   │   ├── ContactForm.tsx
│   │   └── Header.tsx
│   ├── stores/           # Stores de Zustand
│   │   ├── themeStore.ts    # Manejo del tema
│   │   ├── languageStore.ts # Manejo del idioma
│   │   └── dataStore.ts     # Datos de la app
│   ├── i18n/             # Internacionalización
│   │   ├── config.ts
│   │   └── utils.ts
│   ├── types/            # Tipos TypeScript
│   │   └── schemas.ts
│   └── pages/            # Páginas de Astro
│       └── index.astro
├── public/               # Assets estáticos
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.mjs   # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>

# Instalar dependencias
npm install

# Copiar variables de entorno (opcional)
cp .env.example .env
```

## 🔧 Variables de Entorno

Las variables de entorno son **opcionales**. Si no se configuran, la aplicación usará datos mock hardcoded.

```env
# Opcional: URL de Google Sheets para testimonios
PUBLIC_GOOGLE_TESTIMONIALS=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=json

# Opcional: URL de Google Sheets para configuración
PUBLIC_GOOGLE_CONFIG=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=json
```

## 🏃‍♂️ Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📤 Deploy en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Astro
   - Click en "Deploy"

3. **Configurar Variables de Entorno (Opcional)**
   - En el dashboard de Vercel, ve a tu proyecto
   - Settings → Environment Variables
   - Añade las variables si las necesitas:
     - `PUBLIC_GOOGLE_TESTIMONIALS`
     - `PUBLIC_GOOGLE_CONFIG`

### Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración Automática

El proyecto incluye un archivo `vercel.json` que configura automáticamente:

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Region: `iad1` (US East)

## 🎨 Personalización

### Stores

El proyecto utiliza tres stores separadas para mejor organización:

1. **themeStore.ts**: Manejo del tema (claro/oscuro)
2. **languageStore.ts**: Manejo del idioma
3. **dataStore.ts**: Datos de la aplicación (testimonios, configuración)

### Datos Mock vs Producción

El `dataStore` está preparado para funcionar en dos modos:

- **Modo DEMO**: Usa datos hardcoded si no hay variables de entorno
- **Modo Producción**: Obtiene datos de Google Sheets si están configuradas las URLs

### Añadir un nuevo idioma

1. Edita `src/i18n/config.ts`
2. Añade el nuevo idioma al objeto `languages`
3. Añade las traducciones al objeto `ui`

## 🏗️ Arquitectura

### Sin Servicios Complejos

Este proyecto simplifica la arquitectura eliminando la capa de servicios Angular-style. Los datos se manejan directamente en las stores de Zustand:

**Antes:**

```
Component → Service → API/Mock
```

**Ahora:**

```
Component → Store (con datos integrados)
```

### Ventajas

- ✅ Menos boilerplate
- ✅ Más simple de mantener
- ✅ Mejor para SPAs pequeñas
- ✅ Fácil transición a API real

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 Mobile: 320px+
- 📱 Tablet: 768px+
- 💻 Desktop: 1024px+
- 🖥️ Large Desktop: 1280px+

## 🔍 SEO

Astro genera HTML estático por defecto, lo que mejora el SEO:

- Meta tags optimizados
- Open Graph tags
- Sitemap automático
- RSS feed opcional

## 📄 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Carlos - [Tu email o perfil]

Link del proyecto: [https://github.com/tu-usuario/tu-repo](https://github.com/tu-usuario/tu-repo)
