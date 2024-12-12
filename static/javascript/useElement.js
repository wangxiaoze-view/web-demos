// nav el
export const nav = document.querySelector("#nav");
// iframe-page el
const page = document.querySelector("#page");
// code-viewer
const codeViewer = document.querySelector("#code-view");

const navLinks = new Map();

const pre = window.__base || import.meta.env.BASE_URL || "";

/**
 * @description  动态创建菜单元素
 * @param {string} title -
 * @param {string} path -
 * @returns {HTMLElement} -
 */
function createLinkFun(title, path, icon) {
  const tmp = `
    <a href="${pre}examples/${path}.html" target="page">
      <i class="${icon} sim-icon"></i>
      ${title}
    </a>
  `;
  const el = createElementForHtmlFun(tmp);
  el.querySelector('a[target="page"]').addEventListener("click", function () {
    toIframePathFun(path);
  });
  return el;
}

/**
 * @description  通过html模板字符串来创建一个div,并将模板字符串作为div的innerHTML
 * @param {string} [htmlTemplateStr=""] - html模板字符串
 * @return {HTMLElement} - 创建的div
 */
function createElementForHtmlFun(htmlTemplateStr = "") {
  const div = document.createElement("div");
  div.className = "nav-item";
  div.innerHTML = htmlTemplateStr.trim();
  return div;
}

function toIframePathFun(path) {
  for (const [key, el] of navLinks.entries()) {
    el.classList.remove("active");
  }
  navLinks.get(path).classList.add("active");
  // 用hash判断当前的路由信息
  window.location.hash = path;
  page.src = getRedirctPath(path);
  codeViewer.href = getGithubPath(path);
}

function getRedirctPath(name = "") {
  if (!name) return "";
  return `${pre}examples/${name}.html`;
}

function getGithubPath(name = "") {
  if (!name) return "";
  return `https://github.com/wangxiaoze-view/web-demos/tree/main/examples/${name}.html`;
}

export default function useElement() {
  return {
    navLinks,
    createLinkFun,
    createElementForHtmlFun,
    toIframePathFun,
    getRedirctPath,
  };
}
