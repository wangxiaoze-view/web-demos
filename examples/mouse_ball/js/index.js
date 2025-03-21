class ElementNode {
  static get getMouseBall() {
    return document.querySelector(".mouse_ball");
  }

  static onMouseOver(e) {
    const ball = ElementNode.getMouseBall;
    const { width, height } = ball.getBoundingClientRect();

    const w = width - 50;
    const h = height - 50;
    // 边界判断, 50 是为了避免鼠标移到边界时，超出容器 正好是球的宽度和高度
    ball.style.setProperty("--x", `${e.offsetX >= w ? w : e.offsetX}px`);
    ball.style.setProperty("--y", `${e.offsetY >= h ? h : e.offsetY}px`);
  }
}

window.onload = function () {
  ElementNode.getMouseBall.addEventListener(
    "mousemove",
    ElementNode.onMouseOver
  );
};
