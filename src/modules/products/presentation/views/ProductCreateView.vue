<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/product.store'
import ProductForm from '../components/ProductForm.vue'
import type { CreateProductDTO } from '../../domain/models/Product'

const router = useRouter()
const store = useProductStore()

async function handleCreate(data: CreateProductDTO): Promise<void> {
  const created = await store.createProduct(data)
  if (created) {
    router.push('/products')
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        color="grey-darken-1"
        class="mb-2"
        @click="router.push('/products')"
      >
        Volver al listado
      </v-btn>
      <h1 class="text-h5 font-weight-bold text-grey-darken-3">Registrar Siniestro</h1>
      <p class="text-body-2 text-grey-darken-1 mt-1">
        Registra un nuevo siniestro vial en el sistema
      </p>
    </div>

    <v-alert
      v-if="store.error"
      type="error"
      variant="tonal"
      rounded="lg"
      class="mb-4"
      closable
    >
      {{ store.error }}
    </v-alert>

    <ProductForm
      submit-label="Registrar Siniestro"
      :loading="store.isLoading"
      @submit="handleCreate"
      @cancel="router.push('/products')"
    />
  </div>
</template>
