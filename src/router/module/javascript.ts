import { RouteRecordRaw } from "vue-router";

const jsRoute: RouteRecordRaw[] = [
  {
    path: "/javascript",
    name: "JavaScript",
    component: () => import("../../layout/components/containerApp.vue"),

    children: [
      {
        path: "code",
        name: "JavaScriptCode",
        meta: {
          title: "源码",
        },
        component: () => import("../../views/css/button/index.vue"),
      },
    ],
  },
];

export default jsRoute;
