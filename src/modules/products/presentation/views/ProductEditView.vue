<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../store/product.store'
import ProductForm from '../components/ProductForm.vue'
import type { CreateProductDTO } from '../../domain/models/Product'

const router = useRouter()
const route = useRoute()
const store = useProductStore()

onMounted(async () => {
  const id = route.params.id as string
  await store.fetchProductById(id)
})

const initialData = computed(() => {
  if (!store.currentProduct) return undefined
  return {
    name: store.currentProduct.name,
    description: store.currentProduct.description,
    price: store.currentProduct.price,
    category: store.currentProduct.category,
    image: store.currentProduct.image,
    stock: store.currentProduct.stock,
  }
})

async function handleUpdate(data: CreateProductDTO): Promise<void> {
  if (!store.currentProduct) return
  const updated = await store.updateProduct({
    id: store.currentProduct.id,
    ...data,
  })
  if (updated) {
    router.push(`/products/${store.currentProduct.id}`)
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
        @click="router.back()"
      >
        Volver
      </v-btn>
      <h1 class="text-h5 font-weight-bold text-grey-darken-3">Editar Siniestro</h1>
      <p class="text-body-2 text-grey-darken-1 mt-1">
        Modifica los datos del siniestro registrado
      </p>
    </div>

    <div v-if="store.isLoading && !store.currentProduct" class="d-flex justify-center py-12">
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

    <template v-else>
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
        :initial-data="initialData"
        submit-label="Actualizar Siniestro"
        :loading="store.isLoading"
        @submit="handleUpdate"
        @cancel="router.back()"
      />
    </template>
  </div>
</template>
