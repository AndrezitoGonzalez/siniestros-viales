<script setup lang="ts">
defineProps<{
  modelValue: boolean
  productName: string
  loading?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="440"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card rounded="lg">
      <v-card-text class="text-center pa-6">
        <v-avatar color="red-lighten-5" size="64" class="mb-4">
          <v-icon color="red" size="32">mdi-delete-alert</v-icon>
        </v-avatar>
        <h3 class="text-h6 font-weight-bold mb-2">Eliminar Siniestro</h3>
        <p class="text-body-2 text-grey-darken-1">
          Estas seguro de que deseas eliminar el registro
          <strong>{{ productName }}</strong>?
          Esta accion no se puede deshacer.
        </p>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn
          variant="text"
          rounded="lg"
          @click="$emit('update:modelValue', false)"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="red"
          variant="flat"
          :loading="loading"
          rounded="lg"
          @click="$emit('confirm')"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
