import "/static/scripts/libs/icon.js";

// checkbox
const checkboxEl = document.querySelectorAll(".checkbox");
// result text
const resultEl = document.querySelector(".result span");

// sync button
const buttonEl = document.querySelector("button.start");
// stop button
const buttonStopEl = document.querySelector("button.stop");
// normal button
const buttonNormalEl = document.querySelector("button.normal");
// status progress
const progressEl = document.querySelector(".status-progress");
// status result
const statusResultEl = document.querySelector(".status-result");
// wifi status
const wifiStatus = document.querySelector(".wifi-status");

// registration
let registration = null;
let progress = 0;
let progressTimer = null;
function onGetChecked() {
  let checkedValue = [];
  const inputEl = document.querySelectorAll("input[type='checkbox']:checked");
  inputEl.forEach((item) => {
    checkedValue.push(item.value);
  });
  return {
    inputEl,
    value: checkedValue,
  };
}

// set disable button
function onChangeBtnClass(el, isDisabled) {
  if (isDisabled) {
    el.classList.add("disabled");
    el.setAttribute("disabled", true);
  } else {
    el.classList.remove("disabled");
    el.removeAttribute("disabled");
  }
}

// change checkbox
function onChange(item) {
  item.classList.toggle("checked");
  const isChecked = item.classList.contains("checked");
  // this.checked = isChecked;
  const icon = isChecked ? "ri-checkbox-line" : "ri-checkbox-blank-line";
  item.querySelector(".sim-icon").className = `${icon} sim-icon`;
  const { value } = onGetChecked();
  resultEl.textContent = value.length ? "已勾选" : "";
  onChangeBtnClass(buttonEl, !value.length);
  onChangeBtnClass(buttonNormalEl, !value.length);
}

checkboxEl.forEach((item) => {
  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", function () {
    onChange.call(this, item);
  });
});
const onSetWidth = (width) => (progressEl.style.width = `${width}%`);
function clearTimeTask(width = 100) {
  clearInterval(progressTimer);
  progress = 0;
  progressTimer = null;
  onSetWidth(width);
}
function timeTask() {
  if (!progressTimer) {
    progressTimer = setInterval(() => {
      progress += 10;
      if (progress >= 100) clearTimeTask();
      onSetWidth(progress >= 100 ? 100 : progress);
    }, 500);
  }
}

// main
function bootstrap() {
  return new Promise((resolve) => {
    if (!"serviceWorker" in navigator) return resolve(null);
    const serviceWorker = navigator.serviceWorker;
    serviceWorker
      .register(
        import.meta.env.PROD
          ? "/web-demos/js/embed/background_sync_tasks_worker.js"
          : "/web-demos/static/scripts/embed/background_sync_tasks_worker.js"
      )
      .then((_registration) => {
        registration = _registration;
      })
      .finally(() => {
        onChangeBtnClass(buttonStopEl, !registration);
      });

    serviceWorker.addEventListener("message", (event) => {
      timeTask();
      const { type, text } = event.data;
      statusResultEl.textContent = text;
      if (type === "success") clearTimeTask();
    });
  });
}

// btn to click

function onCheck() {
  if (!registration || progressTimer) {
    resultEl.textContent = "任务已终止, 请刷新页面~";
    return false;
  }
  return true;
}
async function onClickForSyncBtn() {
  if (!onCheck()) return;
  await registration.sync.register("sync-messages");
}
function onClickForNormalBtn() {
  if (!onCheck()) return;
  const { value } = onGetChecked();
  registration.active.postMessage({
    type: "normal",
    data: value,
  });
}
buttonEl.addEventListener("click", onClickForSyncBtn);
buttonStopEl.addEventListener("click", () => location.reload());
buttonNormalEl.addEventListener("click", onClickForNormalBtn);

function onGetStatus() {
  const isOnLine = navigator.onLine;
  wifiStatus.setAttribute("data-online", isOnLine);
  wifiStatus.textContent = isOnLine ? "在线" : "离线";
  requestAnimationFrame(onGetStatus);
}
onGetStatus();
bootstrap();
