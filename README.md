# PickMaster — Landing Page

Landing page oficial de **PickMaster**, la plataforma de quinielas deportivas.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animaciones
- [Lucide React](https://lucide.dev/) — iconos

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
npm run build
npm start
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto si necesitas variables de entorno personalizadas. No commitear este archivo.

## Estructura

```
src/
├── app/          # App Router de Next.js (páginas, layout, metadata)
├── components/   # Componentes reutilizables
├── sections/     # Secciones de la landing (Hero, Features, Pricing, etc.)
├── content/      # Contenido estático (textos, datos)
└── lib/          # Utilidades y helpers
```

## Proyecto relacionado

Este repositorio contiene únicamente la landing page. El sistema principal (API + app cliente) vive en un repositorio separado.
