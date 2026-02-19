<script setup lang="ts">
import type { Product } from "../../domain/models/Product";
import { formatCurrency } from "@/core/utils";

defineProps<{
  product: Product;
}>();

defineEmits<{
  view: [id: string];
  edit: [id: string];
  delete: [id: string];
}>();

function severityColor(stock: number): string {
  if (stock <= 2) return "red";
  if (stock <= 5) return "orange";
  return "green";
}

function severityLabel(stock: number): string {
  if (stock <= 2) return "Critico";
  if (stock <= 5) return "Alto";
  return "Moderado";
}
</script>

<template>
  <v-card class="product-card" rounded="lg" elevation="0" border>
    <v-img :src="product.image" height="180" cover class="product-image">
      <template #placeholder>
        <div
          class="d-flex align-center justify-center fill-height bg-grey-lighten-3"
        >
          <v-icon size="48" color="grey-lighten-1">mdi-car-emergency</v-icon>
        </div>
      </template>
      <v-chip
        :color="severityColor(product.stock)"
        size="small"
        class="ma-2"
        variant="flat"
      >
        {{ severityLabel(product.stock) }} - {{ product.stock }} involucrado{{
          product.stock !== 1 ? "s" : ""
        }}
      </v-chip>
    </v-img>

    <v-card-text class="pb-2">
      <v-chip
        size="x-small"
        color="deep-purple-lighten-4"
        text-color="deep-purple-darken-2"
        class="mb-2"
        variant="flat"
      >
        {{ product.category }}
      </v-chip>
      <h3
        class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-1 text-truncate"
      >
        {{ product.name }}
      </h3>
      <p class="text-body-2 text-grey-darken-1 mb-2 product-description">
        {{ product.description }}
      </p>
      <div class="text-h6 font-weight-bold" style="color: #6b2d8b">
        {{ formatCurrency(product.price) }}
      </div>
      <div class="text-caption text-grey-darken-1">Costo estimado de daños</div>
      <v-btn
        variant="text"
        size="x-small"
        color="deep-purple"
        prepend-icon="mdi-link-variant"
        href="https://mintransporte.gov.co/publicaciones/11445/wwwruntgovco-unico-portal-disponible-del-runt/"
        target="_blank"
        rel="noopener noreferrer"
        class="px-0 mt-1"
      >
        Consultar en RUNT
      </v-btn>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-btn
        size="small"
        variant="text"
        color="deep-purple"
        prepend-icon="mdi-eye"
        @click="$emit('view', product.id)"
      >
        Ver
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        color="orange"
        prepend-icon="mdi-pencil"
        @click="$emit('edit', product.id)"
      >
        Editar
      </v-btn>
      <v-spacer />
      <v-btn
        size="small"
        variant="text"
        color="red"
        icon="mdi-delete"
        @click="$emit('delete', product.id)"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.runt-link {
  color: #6b2d8b;
  text-decoration: none;
  width: fit-content;
}

.runt-link:hover {
  text-decoration: underline;
  color: #e8630a;
}
</style>
