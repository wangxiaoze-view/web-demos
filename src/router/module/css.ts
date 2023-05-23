import { RouteRecordRaw } from "vue-router";

const cssRoute: RouteRecordRaw[] = [
  {
    path: "/css",
    name: "Css",
    component: () => import("../../layout/components/layout.vue"),

    children: [
      {
        path: "button",
        name: "CssButton",
        meta: {
          title: "Button",
        },
        component: () => import("../../views/css/button/index.vue"),
      },
    ],
  },
];

export default cssRoute;
