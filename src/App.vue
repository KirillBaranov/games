<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppHeader from "@/modules/common/AppHeader.vue";
import AppFooter from "@/modules/common/AppFooter.vue";
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>
