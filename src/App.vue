<script setup lang="ts">
import AppLayout from '@/core/layout/AppLayout.vue'
</script>

<template>
  <AppLayout />
</template>

<style>
html {
  overflow-y: auto;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

code {
  background-color: #f3ecf9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #6B2D8B;
}
</style>
