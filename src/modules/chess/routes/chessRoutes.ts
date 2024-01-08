import type {RouteRecordRaw} from "vue-router";

export const chessRoutes: RouteRecordRaw = {
    name: 'chess',
    path: '/chess',
    component: () => import('../views/ChessGameView.vue')
}