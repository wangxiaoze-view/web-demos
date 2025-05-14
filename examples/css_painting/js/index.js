const ulEl = document.querySelector("ul");

const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

for (let i = 0; i < weeks.length; i++) {
  const ran = Math.random();
  const li = document.createElement("li");
  li.style.setProperty("--random", ran);
  li.style.setProperty("--color", randomColor());
  li.textContent = weeks[i];
  ulEl.appendChild(li);
  const { width } = li.getBoundingClientRect();
  const offsetX = 70;
  const w = width - offsetX;
  const w_len = Math.floor(w * Number(ran));
  const po = ((w_len / w) * 100).toFixed(2);
  li.setAttribute("data-num", po + "%");
  li.style.setProperty("--right", `${w - w_len}px`);
  if (po < 9) li.classList.add("-not");
}
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    import.meta.env.PROD
      ? `/js/embed/css_painting_paint.js`
      : `/static/scripts/embed/css_painting_paint.js`
  );
} else {
  ulEl.innerHTML = `<li>该浏览器暂不支持~</li>`;
}
