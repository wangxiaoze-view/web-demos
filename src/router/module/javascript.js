
const jsRoute = [
  {
    path: "/javascript",
    name: "JavaScript",
    component: () => import('../../layout/components/containerApp.vue'),

    children: [
      {
        path: "code",
        name: "JavaScriptCode",
        meta: {
          title: "取色器",
        },
        component: () => import("../../views/js/color/index.vue"),
      },
      {
        path: "postMessage",
        name: "PostMessage",
        meta: {
          title: "消息管道",
        },
        component: () => import("../../views/js/postMessage/index.vue"),
      },
      {
        path: "speech",
        name: "Speech",
        meta: {
          title: "语音合成",
        },
        component: () => import("../../views/js/speech/index.vue"),
      },
      {
        path: "layerHandler",
        name: "LayerHandler",
        meta: {
          title: "图层控制",
        },
        component: () => import("../../views/js/layer/index.vue"),
      },
    ],
  },
];

export default jsRoute;
