<script setup lang="ts">
import {pieces, BLACK, WHITE} from "@/modules/chess/constants";
import {computed} from "vue";

const props = defineProps<{
  symbol: pieces,
  color: BLACK | WHITE
}>()

const iconPath = computed(() => {
  return new URL(`/src/assets/img/svg/chess-pieces/${props.symbol.toLowerCase()}-${props.color}.svg`, import.meta.url)
})
</script>

<template>
<div class="chess-game-piece" :class="{[`chess-game-piece--${color}`]: true}">
  <img :src="iconPath" class="chess-piece-icon" :alt="symbol">
</div>
</template>

<style scoped>
.chess-game-piece {
  max-width: 100%;
  max-height: 100%;
}

.chess-piece-icon {
  width: 45px;
}
</style>