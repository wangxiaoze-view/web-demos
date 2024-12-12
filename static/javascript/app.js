import { navs } from "./config.js";
import useLoading from "./useLoading.js";
import useElement, { nav } from "./useElement.js";
import "./libs.js";
const { closeProgress } = useLoading();
const { navLinks, createLinkFun, toIframePathFun } = useElement();

console.log(__base);

if (__base) window.__base = __base;
// 初始化
function init() {
  for (const [title, { icon, path }] of Object.entries(navs)) {
    const el = createLinkFun(title, path, icon);
    nav.appendChild(el);
    navLinks.set(path, el);
  }

  const has = window.location.hash;
  if (has !== "") {
    const path = has.substring(1);
    if (navLinks.has(path)) {
      toIframePathFun(path);
    } else {
      toIframePathFun("button");
    }
  } else {
    toIframePathFun("button");
  }
}

init();
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") closeProgress();
});
