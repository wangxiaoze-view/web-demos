// nav el
export const nav = document.querySelector("#nav");
// iframe-page el
const page = document.querySelector("#page");

const navLinks = new Map();
// const redirectMap = new Map();

/**
 * @description  动态创建菜单元素
 * @param {string} title -
 * @param {string} path -
 * @returns {HTMLElement} -
 */
function createLinkFun(title, path, icon) {
  const tmp = `
    <i class="${icon} sim-icon">
    </i><a href="examples/${path}" target="page">${title}</a>
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
  // 所有菜单清楚选中，当前菜单选中
  for (const [key, el] of navLinks.entries()) {
    el.classList.remove("active");
  }
  navLinks.get(path).classList.add("active");
  // 用hash判断当前的路由信息
  window.location.hash = path;
  // TODO: 存在问题
  // page.src = getRedirctPath(path);
}

function getRedirctPath(name = "") {
  if (!name) return "";
  return `examples/${name}.html`;
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
