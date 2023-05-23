import { createRouter, createWebHistory } from "vue-router";
import cssRoute from "./module/css";

export const baseRoutes = [...cssRoute];
export const baseRouter = createRouter({
	history: createWebHistory(),
	routes: baseRoutes,
});

export default baseRouter;
