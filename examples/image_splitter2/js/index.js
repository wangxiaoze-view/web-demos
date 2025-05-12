const box = document.querySelector(".image_box");
const line = document.querySelector(".line");
const mark = document.querySelector(".mark");

let isDragging = false;
let startX;
let startLeft;

// 鼠标按下事件
line.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startLeft = line.offsetLeft;
});

// 鼠标移动事件
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  const newLeft = Math.max(0, Math.min(startLeft + deltaX, box.offsetWidth));
  // 更新 line 位置
  line.style.left = `${newLeft}px`;
  // 更新 clip-path
  const percentage = (newLeft / box.offsetWidth) * 100;
  mark.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
});
// 鼠标松开事件
document.addEventListener("mouseup", () => {
  isDragging = false;
});
// 鼠标离开窗口事件
document.addEventListener("mouseleave", () => {
  isDragging = false;
});
