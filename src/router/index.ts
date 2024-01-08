import { createRouter, createWebHistory } from 'vue-router'
import {homeRoutes} from "@/modules/home/routes";
import {chessRoutes} from "@/modules/chess/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    homeRoutes,
    chessRoutes,
  ]
})

export default router
