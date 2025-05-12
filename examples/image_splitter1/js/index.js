const box = document.querySelector(".image_box");
const mark = document.querySelector(".mark");
box.addEventListener("mousemove", (e) => {
  const { offsetX } = e;
  mark.style.clipPath = `polygon(0 0, ${offsetX}px 0px, 0 100%)`;
});
box.addEventListener("mouseleave", () => {
  mark.style.clipPath = `polygon(0 0, 0 0, 0 100%)`;
});
