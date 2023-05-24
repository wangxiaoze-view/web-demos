
const cssRoute = [
  {
    path: "/css",
    name: "Css",
    component: () => import("../../layout/components/containerApp.vue"),

    children: [
      {
        path: "button",
        name: "CssButton",
        meta: {
          title: "Button",
        },
        component: () => import("../../views/css/button/index.vue"),
      },
      {
        path: "button2",
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
