const text = document.querySelector(".text");
const dialog = document.querySelector(".dialog");
const result = document.querySelector(".result");

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

document.addEventListener("selectionchange", function (event) {
  text.addEventListener("mouseup", function (event) {
    if (document.getSelection().type !== "Range") return;
    const { layerX, layerY } = event;
    dialog.style.left = layerX + "px";
    dialog.style.top = layerY + 30 + "px";
    result.innerHTML = document.getSelection().toString();
    dialog.show();
  });
});

btn1.addEventListener("click", () => {
  dialog.close();
});
btn2.addEventListener("click", () => {
  const text = document.getSelection().toString();
  text && navigator.clipboard.writeText(text);
  dialog.close();
});
