<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from '@/core/utils'

const props = defineProps<{
  categories: string[]
  selectedCategory: string
  searchTerm: string
  totalResults: number
}>()

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:selectedCategory': [value: string]
}>()

const localSearch = ref(props.searchTerm)

const debouncedSearch = debounce((value: string) => {
  emit('update:searchTerm', value)
}, 350)

watch(localSearch, (value) => {
  debouncedSearch(value)
})
</script>

<template>
  <v-card rounded="lg" elevation="0" border class="mb-6">
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" md="5">
          <v-text-field
            v-model="localSearch"
            prepend-inner-icon="mdi-magnify"
            label="Buscar siniestros..."
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            rounded="lg"
            @click:clear="emit('update:searchTerm', '')"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :model-value="selectedCategory"
            :items="categories"
            label="Filtrar por tipo de siniestro"
            variant="outlined"
            density="comfortable"
            hide-details
            rounded="lg"
            @update:model-value="emit('update:selectedCategory', $event)"
          />
        </v-col>
        <v-col cols="12" md="3" class="text-right">
          <div class="text-body-2 text-grey-darken-1">
            <v-icon size="small" class="mr-1">mdi-filter-variant</v-icon>
            {{ totalResults }} resultado{{ totalResults !== 1 ? 's' : '' }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
