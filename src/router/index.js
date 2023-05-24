import { createRouter, createWebHashHistory } from "vue-router";
import cssRoute from "./module/css";
import jsRoute from "./module/javascript";
import vueRoute from "./module/vue";

export const baseRoutes = [...cssRoute, ...jsRoute, ...vueRoute];
export const baseRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/css",
    },
    ...baseRoutes,
  ],
});

export default baseRouter;
