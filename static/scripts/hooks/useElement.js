// nav el
export const nav = document.querySelector("#nav");
// iframe-page el
const page = document.querySelector("#page");
// code-viewer
const codeViewer = document.querySelector("#code-view");

const navLinks = new Map();

/**
 * 创建菜单项元素。
 * @param {Object} value  -菜单项数据对象。
 * @param {string} value.title  -菜单项标题。
 * @param {string} value.icon  -菜单项图标。
 * @param {string} value.path  -菜单项的路径路径。
 * @param {Array} value.children  -菜单项的孩子。
 * @returns {HTMLElement}  -创建的菜单项元素。
 */
function onCreateMenuFun(value) {
  const { title, icon, path, children } = value;
  const isHasChild = Array.isArray(children) && children.length > 0;
  if (!isHasChild && path) {
    const tmp = `
    <div class="nav-item" data-path="${path}">
      <a href="${getRedirctPath(path)}" target="page">
        <i class="${icon} sim-icon"></i>
        ${title}
      </a>
    </div>
  `;
    const el = createElementForHtmlFun(tmp);
    return el;
  }
  const childrenList = children.map((item) => onCreateMenuFun(item).innerHTML);
  if (childrenList.length === 0) return "";
  const tmp = `
  <div class="nav-item-title">
    <i class="${icon} sim-icon"></i>
    ${title}
  </div>
  <div class="nav-item-child">${childrenList.join("")}</div>
  `;
  const el = createElementForHtmlFun(tmp);
  return el;
}

/**
 * 通过html模板字符串来创建一个div,并将模板字符串作为div的innerHTML
 * @param {string} [htmlTemplateStr=""] - html模板字符串
 * @return {HTMLElement} - 创建的div
 */
function createElementForHtmlFun(htmlTemplateStr = "") {
  if (!htmlTemplateStr) return null;
  const div = document.createElement("div");
  div.className = "nav-parent";
  div.innerHTML = htmlTemplateStr.trim();
  return div;
}

function toIframePathFun(path) {
  for (const [_, el] of navLinks.entries()) {
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
  return `${window.__base}examples/${name}/index.html`;
}

function getGithubPath(name = "") {
  if (!name) return "";
  return `https://github.com/wangxiaoze-view/web-demos/tree/main/examples/${name}/index.html`;
}

export function useElement() {
  return {
    navLinks,
    onCreateMenuFun,
    createElementForHtmlFun,
    toIframePathFun,
    getRedirctPath,
  };
}
