<script setup lang="ts">
import {ref} from "vue";

const items = ref([
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
])
</script>

<template>
  <v-card>
    <v-app-bar
        app
        color="primary"
        prominent
    >
      <v-app-bar-nav-icon variant="text" />

      <v-toolbar-title>GamesOnline</v-toolbar-title>

      <v-spacer />

      <v-btn variant="text">Войти</v-btn>
      <v-btn variant="text">Регистрация</v-btn>
    </v-app-bar>
  </v-card>
</template>

<style scoped>

</style>