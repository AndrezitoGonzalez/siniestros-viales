<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "./AppSidebar.vue";
import AppHeader from "./AppHeader.vue";

const route = useRoute();
const drawer = ref(true);
const rail = ref(false);

const pageTitle = computed(() => {
  return (route.meta.title as string) || "Dashboard";
});

function toggleSidebar(): void {
  if (window.innerWidth < 960) {
    drawer.value = !drawer.value;
  } else {
    rail.value = !rail.value;
  }
}
</script>

<template>
  <v-app>
    <AppSidebar v-model="drawer" :rail="rail" />
    <AppHeader :page-title="pageTitle" @toggle-sidebar="toggleSidebar" />
    <v-main class="app-main">
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-main {
  background-color: #f5f0fe;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
