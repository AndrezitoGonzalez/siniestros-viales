<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();

defineEmits<{
  "toggle-sidebar": [];
}>();
</script>

<template>
  <v-app-bar flat color="white" elevation="0" class="app-header" border="b">
    <v-app-bar-nav-icon color="black" @click="$emit('toggle-sidebar')" />
    <v-app-bar-title class="text-h6 font-weight-bold text-white">
      {{ pageTitle }}
    </v-app-bar-title>
    <template #append>
      <!-- <v-btn icon variant="text" color="grey-darken-1">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon variant="text" color="grey-darken-1">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-avatar size="36" color="deep-purple-lighten-4" class="ml-2">
        <v-icon color="deep-purple-darken-1">mdi-account</v-icon>
      </v-avatar> -->
    </template>
  </v-app-bar>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid #e8eaed !important;
}
</style>
