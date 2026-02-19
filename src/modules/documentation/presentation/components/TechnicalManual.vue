<script setup lang="ts">
interface DocSection {
  title: string
  icon: string
  content: string
}

const sections: DocSection[] = [
  {
    title: 'Arquitectura del Proyecto',
    icon: 'mdi-sitemap',
    content: `El Sistema de Gestion de Siniestros Viales implementa una arquitectura Feature-Based combinada con principios de Clean Architecture.
    Cada modulo (siniestros, documentacion) es una unidad independiente con sus propias capas:
    domain, application, infrastructure y presentation. Esto permite un alto grado de desacoplamiento,
    donde cada modulo puede evolucionar de forma independiente sin afectar a los demas.
    El proyecto fue desarrollado por <strong>Andres Garcia</strong> como parte de una prueba Tecnica para <strong>OpiTech</strong> .`,
  },
  {
    title: 'Capas de la Arquitectura',
    icon: 'mdi-layers-triple',
    content: `<strong>Domain:</strong> Contiene las entidades de negocio (Siniestro) e interfaces de repositorio.
    Es la capa mas interna y no depende de ninguna otra.<br/><br/>
    <strong>Application:</strong> Contiene los casos de uso (GetProductsUseCase, CreateProductUseCase, etc.).
    Orquesta la logica de negocio sin depender de frameworks.<br/><br/>
    <strong>Infrastructure:</strong> Implementa las interfaces del dominio. Aqui se encuentra el servicio
    que simula la API con datos mock y latencia artificial.<br/><br/>
    <strong>Presentation:</strong> Componentes Vue, vistas, y el store Pinia. Solo interactua con la capa de aplicacion.`,
  },
  {
    title: 'Flujo de Datos',
    icon: 'mdi-swap-horizontal',
    content: `El flujo de datos sigue un patron unidireccional:<br/><br/>
    <strong>Vista</strong> &rarr; llama una accion del <strong>Store (Pinia)</strong> &rarr; que ejecuta un <strong>Caso de Uso</strong>
    &rarr; que invoca el <strong>Repositorio</strong> &rarr; implementado por el <strong>Servicio (Infrastructure)</strong>
    &rarr; que lee del <strong>Mock JSON</strong>.<br/><br/>
    Los componentes nunca acceden directamente a la fuente de datos. Todo pasa por capas intermedias,
    lo que facilita reemplazar la fuente de datos (por ejemplo, de mock a API real) sin tocar la UI.`,
  },
  {
    title: 'Mock API',
    icon: 'mdi-api',
    content: `La fuente de datos es un archivo JSON local ubicado en
    <code>modules/products/infrastructure/mock/products.json</code>.<br/><br/>
    El servicio <code>ProductServiceImpl</code> implementa la interfaz <code>ProductRepository</code> y simula
    latencia de red usando <code>setTimeout</code> con Promises. Esto permite probar estados de loading en la UI
    y facilita la transicion a una API real conectada a la base de datos de siniestros viales en el futuro.`,
  },
  {
    title: 'Gestion de Estado con Pinia',
    icon: 'mdi-database',
    content: `El store de siniestros (<code>product.store.ts</code>) centraliza todo el estado de la aplicacion:<br/><br/>
    - <strong>products:</strong> Array completo de siniestros registrados<br/>
    - <strong>filteredProducts:</strong> Computed que aplica filtros y busqueda<br/>
    - <strong>paginatedProducts:</strong> Computed con resultados paginados<br/>
    - <strong>loadingState:</strong> Estado de carga (idle, loading, success, error)<br/><br/>
    Las acciones del store invocan los casos de uso, manteniendo la separacion de responsabilidades.`,
  },
  {
    title: 'Patrones Utilizados',
    icon: 'mdi-puzzle',
    content: `- <strong>Repository Pattern:</strong> Abstraccion de la fuente de datos<br/>
    - <strong>Use Case Pattern:</strong> Logica de negocio encapsulada en clases reutilizables<br/>
    - <strong>Dependency Injection:</strong> Los casos de uso reciben el repositorio por constructor<br/>
    - <strong>Composition API:</strong> Uso de setup, ref, computed y composables<br/>
    - <strong>Feature-Based Architecture:</strong> Modulos independientes por funcionalidad<br/>
    - <strong>Debounce:</strong> Optimizacion de busqueda en tiempo real<br/>
    - <strong>Lazy Loading:</strong> Carga de rutas bajo demanda para mejor performance`,
  },
]
</script>

<template>
  <div>
    <v-card
      v-for="(section, index) in sections"
      :key="index"
      rounded="lg"
      elevation="0"
      border
      class="mb-4"
    >
      <v-card-title class="d-flex align-center pa-4 pb-2">
        <v-icon :color="index % 2 === 0 ? 'deep-purple' : 'orange'" class="mr-3" size="24">
          {{ section.icon }}
        </v-icon>
        <span class="text-subtitle-1 font-weight-bold">{{ section.title }}</span>
      </v-card-title>
      <v-card-text class="pa-4 pt-0">
        <div class="text-body-2 text-grey-darken-2" style="line-height: 1.8;" v-html="section.content" />
      </v-card-text>
    </v-card>
  </div>
</template>
