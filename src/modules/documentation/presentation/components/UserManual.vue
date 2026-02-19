<script setup lang="ts">
interface UserGuide {
  title: string;
  icon: string;
  steps: string[];
}

const guides: UserGuide[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'mdi-view-dashboard',
  //   steps: [
  //     'Al ingresar al sistema, seras redirigido automaticamente al Dashboard de siniestros viales.',
  //     'Veras tarjetas estadisticas con el total de siniestros, tipos registrados, casos criticos y costo total estimado de danos.',
  //     'El grafico de barras muestra la distribucion de siniestros por tipo (colision, atropello, volcamiento, etc.).',
  //     'La seccion "Ultimos Siniestros" muestra los 5 casos registrados mas recientemente. Haz clic en cualquiera para ver su detalle.',
  //     'La tabla "Casos Criticos" lista los siniestros con mayor nivel de gravedad que requieren atencion urgente.',
  //   ],
  // },
  {
    title: "Ver Siniestros",
    icon: "mdi-car-emergency",
    steps: [
      'Navega a "Siniestros" desde el sidebar para ver el listado completo de siniestros viales.',
      "Usa la barra de busqueda para encontrar siniestros por ubicacion, descripcion o tipo. La busqueda tiene un debounce de 350ms.",
      "Usa el selector de tipo para filtrar por categoria de siniestro (Colision, Atropello, Volcamiento, etc.).",
      "Cada tarjeta muestra imagen del siniestro, ubicacion, costo estimado, tipo y nivel de gravedad.",
      "Los botones de accion permiten: Ver detalle, Editar o Eliminar el registro del siniestro.",
      "Usa la paginacion inferior para navegar entre paginas y ajustar la cantidad de items por pagina.",
    ],
  },
  {
    title: "Registrar Siniestro",
    icon: "mdi-plus-circle",
    steps: [
      'Navega a "Registrar Siniestro" desde el sidebar o usa el boton "Nuevo Siniestro" en el listado.',
      "Completa el formulario con la ubicacion (minimo 3 caracteres), descripcion detallada del hecho, costo estimado de danos y numero de personas involucradas.",
      "Selecciona el tipo de siniestro del desplegable (Colision Vehicular, Atropello, Volcamiento, etc.).",
      "La URL de imagen viene precargada con una imagen placeholder. Puedes cambiarla por la URL de la evidencia fotografica.",
      'Haz clic en "Registrar Siniestro" para guardar. Seras redirigido al listado automaticamente.',
      "Si hay errores de validacion, el formulario los mostrara debajo de cada campo.",
    ],
  },
  {
    title: "Editar Siniestro",
    icon: "mdi-pencil",
    steps: [
      'Desde el listado de siniestros, haz clic en el boton "Editar" de cualquier tarjeta.',
      "Tambien puedes acceder desde la vista de detalle del siniestro.",
      "El formulario se precarga con los datos actuales del registro.",
      'Modifica los campos que necesites y haz clic en "Actualizar Siniestro".',
      "Los cambios se reflejan inmediatamente en el listado y en el dashboard.",
    ],
  },
  {
    title: "Eliminar Siniestro",
    icon: "mdi-delete",
    steps: [
      "Desde el listado, haz clic en el icono de eliminar (papelera roja) en la tarjeta del siniestro.",
      "Se mostrara un dialogo de confirmacion con el nombre del registro.",
      'Confirma la eliminacion haciendo clic en "Eliminar".',
      "El registro sera removido del sistema y las estadisticas del dashboard se actualizaran automaticamente.",
      "Esta accion no se puede deshacer (los datos se mantienen en memoria durante la sesion).",
    ],
  },
  {
    title: "Filtrar y Buscar",
    icon: "mdi-filter-variant",
    steps: [
      "La barra de busqueda permite buscar por ubicacion, descripcion o tipo de siniestro.",
      'El filtro de tipo muestra un dropdown con todas las categorias disponibles mas la opcion "Todas".',
      'Ambos filtros se pueden combinar: puedes buscar "Autopista" dentro del tipo "Choque Frontal".',
      "El contador de resultados se actualiza en tiempo real al aplicar filtros.",
      "La paginacion se reinicia automaticamente al cambiar filtros o termino de busqueda.",
    ],
  },
];
</script>

<template>
  <div>
    <v-card
      v-for="(guide, index) in guides"
      :key="index"
      rounded="lg"
      elevation="0"
      border
      class="mb-4"
    >
      <v-card-title class="d-flex align-center pa-4 pb-2">
        <v-icon color="deep-purple-darken-1" class="mr-3" size="24">{{
          guide.icon
        }}</v-icon>
        <span class="text-subtitle-1 font-weight-bold">{{ guide.title }}</span>
      </v-card-title>
      <v-card-text class="pa-4 pt-0">
        <v-timeline density="compact" side="end" class="ml-n2">
          <v-timeline-item
            v-for="(step, stepIndex) in guide.steps"
            :key="stepIndex"
            size="x-small"
            dot-color="deep-purple-lighten-3"
          >
            <div
              class="text-body-2 text-grey-darken-2"
              style="line-height: 1.7"
            >
              {{ step }}
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>
