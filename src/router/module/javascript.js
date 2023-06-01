
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
      {
        path: "postMessage",
        name: "PostMessage",
        meta: {
          title: "消息管道",
        },
        // @ts-ignore
        component: () => import("../../views/js/postMessage/index.vue"),
      },
      {
        path: "speech",
        name: "Speech",
        meta: {
          title: "语音合成",
        },
        // @ts-ignore
        component: () => import("../../views/js/speech/index.vue"),
      },
    ],
  },
];

export default jsRoute;
