# Sistema de Gestion de Siniestros Viales - OpiTech

Dashboard profesional para la gestion y seguimiento de siniestros viales, desarrollado por **OpiTech** con Vue 3, TypeScript y arquitectura Clean/Feature-Based.

## Stack Tecnologico

| Tecnologia | Version | Proposito |
|---|---|---|
| Vue 3 | ^3.5 | Framework principal |
| TypeScript | ^5.7 | Tipado estatico |
| Vite | ^6.0 | Build tool |
| Pinia | ^2.3 | State management |
| Vue Router | ^4.5 | Routing SPA |
| Vuetify 3 | ^3.7 | Libreria de componentes UI |
| Chart.js | ^4.4 | Graficos en Dashboard |
| vue-chartjs | ^5.3 | Wrapper de Chart.js para Vue |

## Arquitectura

El proyecto implementa **Feature-Based Architecture** combinada con principios de **Clean Architecture**:

```
src/
 ├── core/                    # Capa transversal
 │    ├── router/             # Configuracion de rutas (lazy loading)
 │    ├── layout/             # Layout principal (Sidebar + Header)
 │    ├── types/              # Tipos globales compartidos
 │    └── utils/              # Utilidades (formatCurrency, debounce, etc.)
 │
 ├── modules/
 │    ├── dashboard/          # Modulo Dashboard
 │    │     └── presentation/
 │    │           ├── views/         # DashboardView
 │    │           └── components/    # StatCard, CategoryChart, etc.
 │    │
 │    ├── products/           # Modulo Siniestros Viales (Clean Architecture)
 │    │     ├── domain/
 │    │     │     ├── models/        # Product interface, DTOs
 │    │     │     └── repositories/  # ProductRepository interface
 │    │     │
 │    │     ├── application/
 │    │     │     └── useCases/      # GetProducts, Create, Delete, Filter, Search, Paginate
 │    │     │
 │    │     ├── infrastructure/
 │    │     │     ├── services/      # ProductServiceImpl (mock API)
 │    │     │     └── mock/          # products.json (22 siniestros)
 │    │     │
 │    │     └── presentation/
 │    │           ├── components/    # ProductCard, ProductForm, Filters, DeleteDialog
 │    │           ├── views/         # List, Create, Detail, Edit
 │    │           └── store/         # Pinia store
 │    │
 │    └── documentation/      # Modulo Documentacion
 │          └── presentation/
 │                ├── views/         # DocumentationView (tabs)
 │                └── components/    # TechnicalManual, UserManual
 │
 ├── App.vue
 └── main.ts
```

## Decisiones Tecnicas

### Por que Mock JSON en lugar de API real?
- Permite demostrar la arquitectura sin dependencias externas
- El patron Repository hace que reemplazar la fuente de datos sea trivial
- Se simula latencia de red para probar estados de loading realistamente
- Facilita la futura integracion con el sistema de datos inteligentes de OpiTech

### Por que Clean Architecture en Frontend?
- Separacion estricta de responsabilidades
- Los componentes no contienen logica de negocio
- Los casos de uso son testeables de forma aislada
- Facilita migraciones y refactoring a gran escala

### Por que Pinia sobre Vuex?
- API mas simple y moderna con Composition API
- Tipado TypeScript nativo sin configuracion extra
- Mas liviano y mejor developer experience

### Por que Vuetify 3?
- Libreria de componentes madura con Material Design 3
- Soporte completo de TypeScript
- Amplio catalogo: tablas, dialogs, forms, navigation, charts

## Como Correr el Proyecto

### Prerequisitos
- Node.js >= 18.x
- npm >= 9.x o pnpm >= 8.x

### Instalacion

```bash
# Clonar o descargar el proyecto
cd siniestros-viales-opitech

# Instalar dependencias
npm install
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev
```

La aplicacion estara disponible en `http://localhost:3000`

### Build para Produccion

```bash
npm run build
npm run preview
```

## Funcionalidades

- **Dashboard:** Tarjetas estadisticas, grafico de siniestros por tipo, ultimos registros, tabla de casos criticos
- **Listado de Siniestros:** Grid con cards, busqueda con debounce, filtro por tipo, paginacion
- **CRUD Completo:** Registrar, ver detalle, editar y eliminar siniestros con validacion
- **Documentacion:** Manual tecnico y manual de usuario integrados con tabs
- **Layout:** Sidebar colapsable con branding OpiTech, header con navegacion, transiciones suaves

## Rutas

| Ruta | Vista |
|---|---|
| `/dashboard` | Dashboard principal de siniestros |
| `/products` | Listado de siniestros viales |
| `/products/create` | Formulario de registro de siniestro |
| `/products/:id` | Detalle del siniestro |
| `/products/:id/edit` | Formulario de edicion de siniestro |
| `/documentation` | Documentacion del sistema |

## Posibles Mejoras Futuras

- Integracion con API REST real conectada a base de datos de siniestros
- Autenticacion y control de acceso por roles (agente, supervisor, administrador)
- Geolocalizacion de siniestros con mapas interactivos
- Testing con Vitest + Vue Test Utils
- Exportacion de reportes a PDF/Excel
- Notificaciones en tiempo real con WebSockets
- Integracion con IA de OpiTech para analisis predictivo de zonas de riesgo
- CI/CD con GitHub Actions
- Modo oscuro
