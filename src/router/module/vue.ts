import { RouteRecordRaw } from "vue-router";

const vueRoute: RouteRecordRaw[] = [
  {
    path: "/vue",
    name: "Vue",
    component: () => import("../../layout/components/containerApp.vue"),

    children: [
      {
        path: "tabsLoading",
        name: "VueTabLoading",
        meta: {
          title: "选项卡加载",
        },
        component: () => import("../../views/vue/tabLoading/index.vue"),
      },
    ],
  },
];

export default vueRoute;
