import { navs_config } from "./config/index";
import { useLoading, useElement, nav as navEl } from "./hooks/index.js";
import "./libs/index.js";
import "./__define.js";
const { closeProgress } = useLoading();
const { navLinks, onCreateMenuFun, toIframePathFun } = useElement();

bootstrap();

function bootstrap() {
  const has = window.location.hash;

  // 循环路由节点，动态添加节点元素
  for (let i = 0; i < navs_config.length; i++) {
    const item = navs_config[i];
    const el = onCreateMenuFun(item);
    el && navEl.appendChild(el);
  }

  // 将路由元素和path对应起来, 绑定对应点击事件
  document.querySelectorAll(".nav-item").forEach((item) => {
    const path = item.getAttribute("data-path");
    if (item.querySelector('a[target="page"]')) navLinks.set(path, item);
    item.addEventListener("click", () => toIframePathFun(path));
  });

  // 重置hash
  const path = has.substring(1);
  toIframePathFun(navLinks.has(path) ? path : "button");
}

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") closeProgress();
});
