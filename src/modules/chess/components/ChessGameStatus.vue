<script setup lang="ts">
defineProps<{
  gameStatus: string,
  currentPlayer: string
}>()
</script>

<template>
  <v-card-title>Статус игры: <strong>{{ gameStatus }}</strong>, <br>Очередь хода: <strong>{{ currentPlayer }}</strong></v-card-title>
</template>

<style scoped>

</style>