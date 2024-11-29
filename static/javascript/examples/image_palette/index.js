import ColorThief from "colorthief";
const colorThief = new ColorThief();

class ElementNode {
  static get getParentEle() {
    return document.querySelector(".image_palette");
  }
}

window.onload = function () {
  console.log(document.querySelectorAll("img"));
  document.querySelectorAll("img").forEach(function (_, index) {
    const item = document.querySelectorAll("img")[index];
    item.addEventListener("mouseenter", (e) => {
      console.log(123);
    });
  });
};
