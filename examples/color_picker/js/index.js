class ElementNode {
  static get getColorEl() {
    return document.querySelector(".color");
  }

  static get getParentEle() {
    return document.querySelector(".color_picker");
  }

  static get getText() {
    return document.querySelector("b");
  }
}

window.onload = function () {
  ElementNode.getColorEl.addEventListener("click", async () => {
    try {
      const dropper = new EyeDropper();
      const result = await dropper.open();
      const color = result.sRGBHex;
      ElementNode.getParentEle.style.backgroundColor = color;
      ElementNode.getText.textContent = `当前的颜色为：${color}`;
      // 	复制功能, 如果您的浏览器没有开启对应的权限则不会主动复制
      navigator.clipboard.writeText(color);
    } catch (error) {
      ElementNode.getText.textContent =
        "您的浏览器暂不支持颜色拾取功能-EyeDropper";
    }
  });
};
