import ColorThief from "colorthief";
const colorThief = new ColorThief();

// 设置最大颜色数量
const maxColor = 3;
class ElementNode {
  /**
   * @description  获取图片列表的容器元素
   * @return {HTMLElement} -容器元素
   */
  static get getParentEle() {
    return document.querySelector(".image_palette");
  }

  static get allImage() {
    return document.querySelectorAll("img");
  }
  static setBgc(colors) {
    ElementNode.getParentEle.style.backgroundImage = `linear-gradient(to right, ${colors.toString()})`;
  }

  /**
   * @description  鼠标 hover 事件回调
   * @param {MouseEvent} e -事件对象
   * @this  ElementNode
   */
  static onMouseOver(e) {
    ElementNode.allImage.forEach((item) => {
      item.style.opacity = "0.4";
    });
    const target = e.target;
    const colors = colorThief
      .getPalette(target, maxColor)
      .map((color) => `rgb(${color.join(",")})`);
    ElementNode.setBgc(colors);
    target.style.opacity = "1";
  }

  /**
   * 将颜色的 CSS 自定义属性（变量）重置为白色 (rgb(255,255,255))。
   * 当鼠标离开时，这将应用于图像调色板的父元素。
   */
  static onMouseLeave() {
    ElementNode.setBgc(
      Array.from({ length: maxColor }, () => `rgb(255,255,255)`)
    );
    ElementNode.allImage.forEach((item) => {
      item.style.opacity = "1";
    });
  }
}

/**
 * 将 mouseenter 和 mouseleave 事件注册到 img 和 .image_palette 容器。
 */
function registerEvent() {
  ElementNode.allImage.forEach(function (_, index) {
    const item = document.querySelectorAll("img")[index];
    item.addEventListener("mouseenter", ElementNode.onMouseOver);
  });
  ElementNode.getParentEle.addEventListener(
    "mouseleave",
    ElementNode.onMouseLeave
  );
}

window.onload = function () {
  registerEvent();
};
