<script setup lang="ts">
import type { NavigationItem } from "@/core/types";

defineProps<{
  modelValue: boolean;
  rail: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const navigationItems: NavigationItem[] = [
  //{ title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard', exact: true },
  {
    title: "Siniestros",
    icon: "mdi-car-emergency",
    to: "/products",
    exact: true,
  },
  {
    title: "Registrar Siniestro",
    icon: "mdi-plus-circle",
    to: "/products/create",
  },
  {
    title: "Documentacion",
    icon: "mdi-book-open-variant",
    to: "/documentation",
  },
];
</script>

<template>
  <v-navigation-drawer
    :model-value="modelValue"
    :rail="rail"
    permanent
    color="#2D1245"
    dark
    class="sidebar"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="sidebar-brand pa-4 d-flex align-center"
      :class="{ 'justify-center': rail }"
    >
      <v-icon color="black" size="32" class="mr-2">mdi-shield-car</v-icon>
      <span v-if="!rail" class="text-h8 font-weight-bold" style="color: #fff">
        OpiTech - Siniestros
      </span>
    </div>

    <v-divider
      class="mx-3 mb-2"
      style="border-color: rgba(255, 255, 255, 0.08)"
    />

    <v-list nav density="comfortable" class="px-2">
      <v-list-item
        v-for="item in navigationItems"
        :key="item.to"
        :to="item.to"
        :exact="item.exact"
        :prepend-icon="item.icon"
        :title="item.title"
        rounded="lg"
        class="mb-1 sidebar-item"
        active-class="sidebar-item-active"
      />
    </v-list>

    <template #append>
      <div class="pa-4" :class="{ 'text-center': rail }">
        <v-divider
          class="mb-3"
          style="border-color: rgba(255, 255, 255, 0.08)"
        />
        <div
          v-if="!rail"
          class="text-caption"
          style="color: rgba(255, 255, 255, 0.4)"
        >
          v1.0.0 &mdash; Siniestros Viales
        </div>
        <v-icon v-else color="grey" size="small">mdi-information</v-icon>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar {
  background: linear-gradient(
    160deg,
    #e8630a 0%,
    #6b2d8b 70%,
    #2d1245 80%
  ) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.sidebar-brand {
  height: 64px;
}

.sidebar-item {
  color: #000 !important;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  color: #000 !important;
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.sidebar-item-active {
  color: #000 !important;
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>
