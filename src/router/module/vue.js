
const vueRoute = [
  {
    path: "/vue",
    name: "Vue",
    // @ts-ignore
    component: () => import("../../layout/components/containerApp.vue"),

    children: [
      {
        path: "tabsLoading",
        name: "VueTabLoading",
        meta: {
          title: "选项卡加载",
        },
        // @ts-ignore
        component: () => import("../../views/vue/tabLoading/index.vue"),
      },
      {
        path: "watermarking",
        name: "Watermarking",
        meta: {
          title: "防篡改水印",
        },
        // @ts-ignore
        component: () => import("../../views/vue/watermarking/index.vue"),
      },
      {
        path: "themeDark",
        name: "ThemeDark",
        meta: {
          title: "系统主题",
        },
        // @ts-ignore
        component: () => import("../../views/vue/themeDark/index.vue"),
      },
    ],
  },
];

export default vueRoute;
