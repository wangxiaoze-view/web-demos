
const cssRoute = [
  {
    path: "/css",
    name: "Css",
    component: () => import("../../layout/components/containerApp.vue"),

    children: [
      {
        path: "text",
        name: "CssText",
        meta: {
          title: "文本",
        },
        component: () => import("../../views/css/text/index.vue"),
      },
      {
        path: "button",
        name: "CssButton2",
        meta: {
          title: "Button",
        },
        component: () => import("../../views/css/button/index.vue"),
      },
    ],
  },
];

export default cssRoute;
