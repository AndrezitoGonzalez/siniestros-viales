<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/product.store'
import ProductCard from '../components/ProductCard.vue'
import ProductFilters from '../components/ProductFilters.vue'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog.vue'

const store = useProductStore()
const router = useRouter()

const deleteDialog = ref(false)
const productToDelete = ref<{ id: string; name: string }>({ id: '', name: '' })

const itemsPerPageOptions = [4, 8, 12, 16, 24]

onMounted(async () => {
  if (store.products.length === 0) {
    await store.fetchProducts()
  }
})

function viewProduct(id: string): void {
  router.push(`/products/${id}`)
}

function editProduct(id: string): void {
  router.push(`/products/${id}/edit`)
}

function openDeleteDialog(id: string): void {
  const product = store.products.find((p) => p.id === id)
  if (product) {
    productToDelete.value = { id: product.id, name: product.name }
    deleteDialog.value = true
  }
}

async function confirmDelete(): Promise<void> {
  await store.deleteProduct(productToDelete.value.id)
  deleteDialog.value = false
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold text-grey-darken-3">Siniestros Viales</h1>
        <p class="text-body-2 text-grey-darken-1 mt-1">
          Gestion y seguimiento de siniestros viales registrados
        </p>
      </div>
      <v-btn
        color="deep-purple-darken-1"
        rounded="lg"
        prepend-icon="mdi-plus"
        @click="router.push('/products/create')"
      >
        Nuevo Siniestro
      </v-btn>
    </div>

    <ProductFilters
      :categories="store.categories"
      :selected-category="store.selectedCategory"
      :search-term="store.searchTerm"
      :total-results="store.filteredProducts.length"
      @update:search-term="store.setSearchTerm"
      @update:selected-category="store.setCategory"
    />

    <!-- Loading -->
    <div v-if="store.isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="deep-purple" size="48" />
    </div>

    <!-- Error -->
    <v-alert
      v-else-if="store.loadingState === 'error'"
      type="error"
      variant="tonal"
      rounded="lg"
      class="mb-4"
    >
      {{ store.error }}
      <template #append>
        <v-btn variant="text" @click="store.fetchProducts()">Reintentar</v-btn>
      </template>
    </v-alert>

    <!-- Empty -->
    <v-card
      v-else-if="store.paginatedProducts.data.length === 0"
      rounded="lg"
      elevation="0"
      border
      class="pa-12 text-center"
    >
      <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-car-off</v-icon>
      <h3 class="text-h6 text-grey-darken-1 mb-2">No se encontraron siniestros</h3>
      <p class="text-body-2 text-grey-darken-1">
        Intenta cambiar los filtros o registra un nuevo siniestro.
      </p>
    </v-card>

    <!-- Grid -->
    <template v-else>
      <v-row>
        <v-col
          v-for="product in store.paginatedProducts.data"
          :key="product.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <ProductCard
            :product="product"
            @view="viewProduct"
            @edit="editProduct"
            @delete="openDeleteDialog"
          />
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-card rounded="lg" elevation="0" border class="mt-6">
        <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div class="d-flex align-center ga-2">
            <span class="text-body-2 text-grey-darken-1">Items por pagina:</span>
            <v-select
              :model-value="store.itemsPerPage"
              :items="itemsPerPageOptions"
              variant="outlined"
              density="compact"
              hide-details
              style="max-width: 80px;"
              @update:model-value="store.setItemsPerPage($event)"
            />
          </div>

          <v-pagination
            :model-value="store.page"
            :length="store.paginatedProducts.totalPages"
            :total-visible="5"
            density="comfortable"
            rounded="lg"
            color="deep-purple"
            @update:model-value="store.setPage($event)"
          />

          <span class="text-body-2 text-grey-darken-1">
            {{ store.paginatedProducts.total }} siniestros en total
          </span>
        </v-card-text>
      </v-card>
    </template>

    <DeleteConfirmDialog
      v-model="deleteDialog"
      :product-name="productToDelete.name"
      :loading="store.isLoading"
      @confirm="confirmDelete"
    />
  </div>
</template>
