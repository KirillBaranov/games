<script setup lang="ts">
import type {Piece} from "@/modules/chess/types";

defineProps<{
  capturePieces: Piece[]
}>()
</script>

<template>
  <div class="captured-pieces">
    <span style="color: white">Фигур захвачено: {{ capturePieces.length }}</span>
    <div v-for="(piece, index) in capturePieces" :key="`${piece}-${index}`" class="piece">{{ `${piece.symbol} (${piece.translatedName})` }}</div>
  </div>
</template>

<style scoped>

</style>