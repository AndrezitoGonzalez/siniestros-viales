<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CreateProductDTO } from '../../domain/models/Product'
import { PRODUCT_CATEGORIES } from '../../domain/models/Product'

const props = defineProps<{
  initialData?: Partial<CreateProductDTO>
  submitLabel?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: CreateProductDTO]
  cancel: []
}>()

const form = ref({
  name: props.initialData?.name || '',
  description: props.initialData?.description || '',
  price: props.initialData?.price || 0,
  category: props.initialData?.category || '',
  image: props.initialData?.image || 'https://picsum.photos/300/200',
  stock: props.initialData?.stock || 0,
})

const rules = {
  name: [
    (v: string) => !!v || 'La ubicacion del siniestro es requerida',
    (v: string) => v.length >= 3 || 'Minimo 3 caracteres',
  ],
  description: [(v: string) => !!v || 'La descripcion del siniestro es requerida'],
  price: [
    (v: number) => v > 0 || 'El costo estimado debe ser mayor a 0',
  ],
  category: [(v: string) => !!v || 'Selecciona un tipo de siniestro'],
  image: [(v: string) => !!v || 'La URL de imagen es requerida'],
  stock: [
    (v: number) => v >= 0 || 'El numero de involucrados no puede ser negativo',
  ],
}

const formRef = ref()

const isFormValid = computed(() => {
  return (
    form.value.name.length >= 3 &&
    form.value.description.length > 0 &&
    form.value.price > 0 &&
    form.value.category.length > 0 &&
    form.value.image.length > 0 &&
    form.value.stock >= 0
  )
})

async function handleSubmit(): Promise<void> {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('submit', { ...form.value })
}
</script>

<template>
  <v-form ref="formRef" @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12" md="8">
        <v-card rounded="lg" elevation="0" border>
          <v-card-title class="text-subtitle-1 font-weight-bold pa-4 pb-0">
            Informacion del Siniestro
          </v-card-title>
          <v-card-text class="pa-4">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              label="Ubicacion / Titulo del siniestro"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-2"
            />
            <v-textarea
              v-model="form.description"
              :rules="rules.description"
              label="Descripcion del siniestro"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              rows="4"
              class="mb-2"
            />
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.price"
                  :rules="rules.price"
                  label="Costo estimado de danos (COP)"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  type="number"
                  step="1000"
                  min="0"
                  prepend-inner-icon="mdi-cash"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="form.stock"
                  :rules="rules.stock"
                  label="Personas involucradas"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  type="number"
                  min="0"
                  prepend-inner-icon="mdi-account-group"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" border class="mb-4">
          <v-card-title class="text-subtitle-1 font-weight-bold pa-4 pb-0">
            Tipo e Imagen
          </v-card-title>
          <v-card-text class="pa-4">
            <v-select
              v-model="form.category"
              :rules="rules.category"
              :items="PRODUCT_CATEGORIES"
              label="Tipo de siniestro"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-2"
            />
            <v-text-field
              v-model="form.image"
              :rules="rules.image"
              label="URL de imagen / evidencia"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              prepend-inner-icon="mdi-image"
            />
            <v-img
              v-if="form.image"
              :src="form.image"
              height="150"
              cover
              rounded="lg"
              class="mt-2"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                  <v-progress-circular indeterminate color="grey" size="24" />
                </div>
              </template>
            </v-img>
          </v-card-text>
        </v-card>

        <div class="d-flex flex-column ga-2">
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
            color="deep-purple-darken-1"
            size="large"
            rounded="lg"
            block
          >
            <v-icon start>mdi-check</v-icon>
            {{ submitLabel || 'Registrar Siniestro' }}
          </v-btn>
          <v-btn
            variant="outlined"
            size="large"
            rounded="lg"
            block
            @click="$emit('cancel')"
          >
            Cancelar
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
