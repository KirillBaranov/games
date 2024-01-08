import type {RouteRecordRaw} from "vue-router";
import { homeRoutesNames } from "./routesNames";

export const homeRoutes: RouteRecordRaw = {
    name: homeRoutesNames.home,
    path: '/',
    component: () => import('../views/HomeView.vue'),
}