const vueRoute = [
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
      {
        path: "watermarking",
        name: "Watermarking",
        meta: {
          title: "防篡改水印",
        },
        component: () => import("../../views/vue/watermarking/index.vue"),
      },
      {
        path: "themeDark",
        name: "ThemeDark",
        meta: {
          title: "系统主题",
        },

        component: () => import("../../views/vue/themeDark/index.vue"),
      },
      {
        path: "axios",
        name: "Axios",
        meta: {
          title: "全局请求(防抖，节流)",
        },
        component: () => import("../../views/vue/axios/index.vue"),
      },
    ],
  },
];

export default vueRoute;
