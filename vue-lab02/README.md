# 🎯 Vue Lab 02 - Component-Based Event Management

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)

**A modern Vue.js application demonstrating component-based architecture, state management, and responsive design patterns.**

</div>

---

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🛠️ Development](#️-development)
- [🧩 Components](#-components)
- [🔧 Configuration](#-configuration)
- [📚 Resources](#-resources)

---

## 🚀 Features

### ✨ Core Functionality
- 📅 **Event Management System** - Create, view, and manage events
- 👥 **Student Registration** - Student enrollment and management
- 🏢 **Organizer Profiles** - Event organizer information
- 🔍 **Search & Filter** - Advanced event discovery
- 📱 **Responsive Design** - Mobile-first approach

### 🛠️ Technical Features
- ⚡ **Vite** - Lightning-fast development server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🏪 **Pinia** - Modern state management
- 🧭 **Vue Router** - Client-side routing
- 🛡️ **TypeScript** - Type-safe development
- 📡 **Axios** - HTTP client for API calls
- 🔧 **ESLint & Prettier** - Code quality and formatting

---

## 🏗️ Project Structure

```
vue-lab02/
├── 📁 public/               # Static assets
├── 📁 src/
│   ├── 📁 assets/          # Images, styles, fonts
│   ├── 📁 components/      # Reusable Vue components
│   │   ├── EventCard.vue   # Event display component
│   │   └── EventMeta.vue   # Event metadata component
│   ├── 📁 views/           # Page-level components
│   │   ├── 📁 event/       # Event-related views
│   │   │   ├── DetailView.vue
│   │   │   ├── EditView.vue
│   │   │   ├── LayoutView.vue
│   │   │   └── RegisterView.vue
│   │   ├── EventListView.vue
│   │   ├── StudentListView.vue
│   │   ├── AboutView.vue
│   │   ├── NetworkErrorView.vue
│   │   └── NotFoundView.vue
│   ├── 📁 stores/          # Pinia state stores
│   │   ├── event.ts        # Event management
│   │   ├── organizer.ts    # Organizer data
│   │   ├── message.ts      # Global messages
│   │   └── counter.ts      # Example store
│   ├── 📁 service/         # API service layer
│   │   ├── EventService.ts
│   │   ├── OrganizerService.ts
│   │   └── StudentService.ts
│   ├── 📁 router/          # Vue Router configuration
│   ├── types.ts            # TypeScript type definitions
│   ├── main.ts             # Application entry point
│   └── App.vue             # Root component
├── 📄 index.html           # HTML template
├── 📄 vite.config.ts       # Vite configuration
├── 📄 tailwind.config.js   # Tailwind CSS config
└── 📄 package.json         # Dependencies and scripts
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# http://localhost:5173
```

---

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint and Oxlint |
| `npm run format` | Format code with Prettier |

### 🔧 IDE Setup

#### Recommended Extensions
- **VS Code** + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **WebStorm** - Built-in Vue.js support
- **Disable Vetur** if using VS Code

#### TypeScript Support
This project uses `vue-tsc` for type checking `.vue` files. The [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension provides excellent TypeScript support for Vue SFCs.

---

## 🧩 Components

### 🎪 Core Components

#### `EventCard.vue`
```vue
<!-- Event display card with image, title, and metadata -->
<template>
  <div class="event-card">
    <!-- Event content -->
  </div>
</template>
```

#### `EventMeta.vue`
```vue
<!-- Event metadata (date, location, organizer) -->
<template>
  <div class="event-meta">
    <!-- Metadata content -->
  </div>
</template>
```

### 📄 Views Architecture

| View | Purpose | Route |
|------|---------|-------|
| `EventListView` | Display paginated events | `/` |
| `DetailView` | Event details page | `/event/:id` |
| `EditView` | Edit event form | `/event/:id/edit` |
| `RegisterView` | Student registration | `/event/:id/register` |
| `StudentListView` | Student management | `/students` |
| `AboutView` | Application information | `/about` |

---

## 🔧 Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue(), vueDevtools()],
  // Custom configuration
})
```

### Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      // Custom themes
    }
  }
}
```

### Environment Variables
Create a `.env` file for local development:
```bash
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Vue Lab 02
```

---

## 📚 Resources

### 📖 Documentation
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

### 🔗 Related Links
- [🌐 Live Demo](https://component-based-vue-lab-8tt9.vercel.app/)
- [📊 Mock API](https://my-json-server.typicode.com/Thippharake-NaChiengmai/lab02-db.json/events)
- [🔙 Backend Repository](https://github.com/Thippharake-NaChiengmai/331-backend)

### 🎯 Learning Objectives
- ✅ Component composition and reusability
- ✅ Props and event communication
- ✅ State management with Pinia
- ✅ API integration patterns
- ✅ Responsive design principles
- ✅ TypeScript in Vue applications

---

<div align="center">

**🚀 Happy Coding!**

*Part of the [Component-Based Vue Lab Series](../README.md)*

</div>
