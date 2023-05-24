
const jsRoute = [
  {
    path: "/javascript",
    name: "JavaScript",
  // @ts-ignore
    component: () => import('../../layout/components/containerApp.vue'),

    children: [
      {
        path: "code",
        name: "JavaScriptCode",
        meta: {
          title: "取色器",
        },
        // @ts-ignore
        component: () => import("../../views/js/color/index.vue"),
      },
    ],
  },
];

export default jsRoute;
