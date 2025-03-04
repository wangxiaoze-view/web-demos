class ElementNode {
  static get getParentEle() {
    return document.querySelector(".small_pieces_falling");
  }

  static get getBoxEl() {
    return document.querySelector(".box");
  }

  static get getAllItem() {
    return document.querySelectorAll(".box-item");
  }

  static onMouseOver(e) {
    const duration = Math.random() * 2 + 1;
    this.classList.add("active");
    this.style.animationDuration = duration + "s";
  }
}
const init = () => {
  const max = 1000;
  for (let i = 0; i < max; i++) {
    const div_box = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList.add("box-item");
    div_box.appendChild(div);
    ElementNode.getBoxEl.appendChild(div_box);

    ElementNode.getAllItem[i].addEventListener(
      "mouseover",
      ElementNode.onMouseOver.bind(ElementNode.getAllItem[i]),
      false
    );
  }
};

window.onload = init;
