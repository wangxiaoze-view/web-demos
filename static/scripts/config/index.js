const css_links = [
  {
    title: "按钮",
    icon: "ri-radio-button-line",
    path: "button",
  },
  {
    title: "文字背景裁剪",
    icon: "ri-text",
    path: "text_background_cropping",
  },
  {
    title: "文字交融",
    icon: "ri-text",
    path: "text_fusion",
  },
  {
    title: "不规则图形",
    icon: "ri-pencil-ruler-2-line",
    path: "irregular_shapes",
  },
  {
    title: "抽牌",
    icon: "ri-refund-line",
    path: "draw_cards",
  },
  {
    title: "图片缩放",
    icon: "ri-landscape-ai-line",
    path: "zoom_zither",
  },
  {
    title: "翻页效果",
    icon: "ri-git-repository-line",
    path: "novel_3D",
  },
  {
    title: "小球随着鼠标移动",
    icon: "ri-scroll-to-bottom-line",
    path: "mouse_ball",
  },
  {
    title: "跳动小球",
    icon: "ri-golf-ball-line",
    path: "bouncing_ball",
  },
  {
    title: "loading1",
    icon: "ri-loader-2-line",
    path: "css_loading1",
  },
  {
    title: "loading2",
    icon: "ri-loader-2-line",
    path: "css_loading2",
  },
  {
    title: "loading3",
    icon: "ri-loader-2-line",
    path: "css_loading3",
  },
  {
    title: "Css 画板",
    icon: "ri-paint-line",
    path: "css_painting",
  },
  {
    title: "图片分割器1",
    icon: "ri-split-cells-horizontal",
    path: "image_splitter1",
  },
  {
    title: "图片分割器2",
    icon: "ri-split-cells-horizontal",
    path: "image_splitter2",
  },
  {
    title: "图片分割器3",
    icon: "ri-split-cells-horizontal",
    path: "image_splitter3",
  },
];

const fun_links = [
  {
    title: "系统取色器",
    icon: "ri-dropper-line",
    path: "color_picker",
  },
  {
    title: "蜂窝图片",
    icon: "ri-image-ai-line",
    path: "honeycomb_pictures",
  },
  {
    title: "图片调色盘",
    icon: "ri-palette-line",
    path: "image_palette",
  },
  {
    title: "后台同步任务",
    icon: "ri-reset-left-line",
    path: "background_sync_tasks",
  },
  {
    title: "后台任务协作调度",
    icon: "ri-list-check-3",
    path: "background_tasks",
  },
  {
    title: "后台任务协作调度2",
    icon: "ri-list-check-3",
    path: "background_tasks2",
  },
  {
    title: "条码检测",
    icon: "ri-barcode-line",
    path: "barcode_detection",
  },
];

const three_links = [
  {
    title: "魔方",
    icon: "ri-box-3-line",
    path: "cube_three_3d",
  },
  {
    title: "灰太狼",
    icon: "ri-box-3-line",
    path: "wolf_threee_3d",
  },
];

export const navs_config = [
  {
    title: "CSS 交互",
    icon: "ri-tailwind-css-fill",
    children: css_links,
  },
  {
    title: "功能交互",
    icon: "ri-functions",
    children: fun_links,
  },
  {
    title: "THREE交互",
    icon: "ri-pantone-line",
    children: three_links,
  },
];
