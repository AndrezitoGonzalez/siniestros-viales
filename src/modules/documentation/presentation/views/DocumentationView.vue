<script setup lang="ts">
import { ref } from 'vue'
import TechnicalManual from '../components/TechnicalManual.vue'
import UserManual from '../components/UserManual.vue'

const activeTab = ref('technical')
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-h5 font-weight-bold text-grey-darken-3">Documentacion</h1>
      <p class="text-body-2 text-grey-darken-1 mt-1">
        Manuales tecnicos y de usuario del Sistema de Siniestros Viales - OpiTech
      </p>
    </div>

    <v-card rounded="lg" elevation="0" border class="mb-6">
      <v-tabs
        v-model="activeTab"
        bg-color="transparent"
        color="deep-purple-darken-1"
        class="px-2"
      >
        <v-tab value="technical" prepend-icon="mdi-code-braces">
          Manual Tecnico
        </v-tab>
        <v-tab value="user" prepend-icon="mdi-book-account">
          Manual de Usuario
        </v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item value="technical">
        <TechnicalManual />
      </v-tabs-window-item>
      <v-tabs-window-item value="user">
        <UserManual />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
