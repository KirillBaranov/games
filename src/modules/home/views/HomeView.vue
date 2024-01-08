<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const games = ref([
  {
    title: 'Шахматы',
    subtitle: 'hello world',
    text: 'content',
    action: () => {
      router.push({
        name: 'chess',
      })
    }
  },
  {
    title: 'Шахматы',
    subtitle: 'hello world',
    text: 'content',
    action: () => {
      router.push({
        name: 'chess',
      })
    }
  },
  {
    title: 'Шахматы',
    subtitle: 'hello world',
    text: 'content',
    action: () => {
      router.push({
        name: 'chess',
      })
    }
  },
  {
    title: 'Шахматы',
    subtitle: 'hello world',
    text: 'content',
    action: () => {
      router.push({
        name: 'chess',
      })
    }
  }
])
</script>

<template>
  <v-row>
    <v-col v-for="(game, index) in games" :key="index" cols="3">
      <v-card color="indigo">
        <v-card-title class="headline">{{ game.title }}</v-card-title>

        <v-card-text>
          <p>
            Шахматы – стратегическая настольная игра для двух игроков,
            где каждый управляет своей армией белых или черных фигур.
          </p>
          <p>
            Цель игры – объявить "шах и мат" королю противника, но
            игра также может завершиться патом или ничьей.
          </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-subtitle class="text-h6">Фигуры:</v-card-subtitle>
        <v-card-text>
          <ul class="pl-4">
            <li><strong>Король (K):</strong> Центральная фигура, ходит на одну клетку в любом направлении.</li>
            <li><strong>Ферзь (Q):</strong> Самая мощная фигура, двигается вдоль линий и диагоналей.</li>
            <li><strong>Ладья (R):</strong> Ходит только по горизонтали или вертикали.</li>
            <li><strong>Слон (B):</strong> Двигается по диагонали, преодолевая клетки своего цвета.</li>
            <li><strong>Конь (N):</strong> Делает "букву Г".</li>
            <li><strong>Пешка (P):</strong> Двигается вперед, атакует по диагонали.</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn type="text" @click="game.action" variant="outlined">Играть</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>