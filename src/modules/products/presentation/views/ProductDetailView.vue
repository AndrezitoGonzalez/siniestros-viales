<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../store/product.store'
import { formatCurrency, formatDate } from '@/core/utils'

const router = useRouter()
const route = useRoute()
const store = useProductStore()

onMounted(async () => {
  const id = route.params.id as string
  await store.fetchProductById(id)
})

function severityColor(stock: number): string {
  if (stock <= 2) return 'red'
  if (stock <= 5) return 'orange'
  return 'green'
}

function severityLabel(stock: number): string {
  if (stock <= 2) return 'Critico'
  if (stock <= 5) return 'Alto'
  return 'Moderado'
}
</script>

<template>
  <div>
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      color="grey-darken-1"
      class="mb-4"
      @click="router.push('/products')"
    >
      Volver al listado
    </v-btn>

    <div v-if="store.isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="deep-purple" size="48" />
    </div>

    <v-alert
      v-else-if="!store.currentProduct"
      type="warning"
      variant="tonal"
      rounded="lg"
    >
      Siniestro no encontrado
    </v-alert>

    <v-row v-else>
      <v-col cols="12" md="5">
        <v-card rounded="lg" elevation="0" border>
          <v-img
            :src="store.currentProduct.image"
            height="350"
            cover
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                <v-icon size="64" color="grey-lighten-1">mdi-car-emergency</v-icon>
              </div>
            </template>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-card rounded="lg" elevation="0" border class="pa-6">
          <v-chip color="deep-purple-lighten-4" text-color="deep-purple-darken-2" class="mb-3" variant="flat">
            {{ store.currentProduct.category }}
          </v-chip>

          <h1 class="text-h4 font-weight-bold text-grey-darken-3 mb-3">
            {{ store.currentProduct.name }}
          </h1>

          <p class="text-body-1 text-grey-darken-1 mb-4" style="line-height: 1.7;">
            {{ store.currentProduct.description }}
          </p>

          <div class="text-h4 font-weight-bold mb-1" style="color: #6B2D8B;">
            {{ formatCurrency(store.currentProduct.price) }}
          </div>
          <div class="text-caption text-grey-darken-1 mb-4">Costo estimado de danos</div>

          <v-divider class="mb-4" />

          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 text-uppercase mb-1">Nivel de Gravedad</div>
              <v-chip :color="severityColor(store.currentProduct.stock)" variant="flat">
                {{ severityLabel(store.currentProduct.stock) }} - {{ store.currentProduct.stock }} involucrado{{ store.currentProduct.stock !== 1 ? 's' : '' }}
              </v-chip>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 text-uppercase mb-1">Fecha de Registro</div>
              <div class="text-body-2 font-weight-medium">
                {{ formatDate(store.currentProduct.createdAt) }}
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-2">
            <v-col cols="6">
              <div class="text-caption text-grey-darken-1 text-uppercase mb-1">ID del Caso</div>
              <code class="text-body-2">{{ store.currentProduct.id }}</code>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <div class="d-flex ga-3">
            <v-btn
              color="orange"
              variant="flat"
              rounded="lg"
              prepend-icon="mdi-pencil"
              @click="router.push(`/products/${store.currentProduct!.id}/edit`)"
            >
              Editar Siniestro
            </v-btn>
            <v-btn
              variant="outlined"
              rounded="lg"
              @click="router.push('/products')"
            >
              Volver
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
