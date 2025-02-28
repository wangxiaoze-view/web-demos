class ElementNode {
  static get getAllCover() {
    return document.querySelectorAll(".cover");
  }

  static onCLick(index) {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.style.transform = "perspective(1000px) rotateY(-180deg)";
      this.style.zIndex = index;
    } else {
      this.style.transform = "perspective(1000px) rotateY(0deg)";
      this.style.zIndex = ElementNode.getAllCover.length - index;
    }
  }
}

window.onload = () => {
  ElementNode.getAllCover.forEach((item, index) => {
    item.style.zIndex = ElementNode.getAllCover.length - index;
    item.addEventListener("click", (e) => {
      ElementNode.onCLick.call(e.target, index);
    });
  });
};
