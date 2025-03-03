import { useReactivity } from "./reactvity";

const progressEl = document.querySelector("progress");
const currentEl = document.querySelector("#current");
const totalEl = document.querySelector("#total");
const buttonEl = document.querySelector("button");
const parent = document.querySelector(".container-task-content");

const { ref, effect } = useReactivity();

const current = ref(0);
const total = 10;
const tasks = ref([]);
const totalTask = ref(0);

let currentTaskHandle = null;
const requestIdleCallback = window.requestIdleCallback;

effect(() => {
  progressEl.value = (current.value / total) * 100;
  currentEl.textContent = current.value;
  totalEl.textContent = total;
  if (progressEl.value === 100) {
    buttonEl.removeAttribute("disabled");
  }
});
function logTaskHandler({ id, name, status }) {
  const onGetText = (color) =>
    `${id}. 任务状态:<span style="color: ${color}">${status}</span>`;
  const currentEl = document.getElementById(id);
  if (currentEl) {
    currentEl.innerHTML = onGetText("green");
    setTimeout(() => {
      document.querySelector(".container-task").scrollBy({
        top: currentEl.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }, current.value * 10);
  } else {
    const liEl = document.createElement("li");
    liEl.id = id;
    liEl.innerHTML = onGetText("red");
    parent.appendChild(liEl);
  }
}

function runTaskQueue(idleDeadline) {
  console.log("当前绘制完成所剩余的时间", idleDeadline.timeRemaining());
  while (
    (idleDeadline.timeRemaining() > 0 || idleDeadline.didTimeout) &&
    tasks.value.length > 0
  ) {
    totalTask.value++;

    const task = tasks.value.shift();
    task.handlerEvent(task.data);
    setTimeout(() => {
      // 设置当前任务的状态
      task.handlerEvent({ ...task.data, status: "已完成" });
      current.value++;
    }, totalTask.value * 80);
  }
  // 循环调用
  if (tasks.value.length) {
    currentTaskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    currentTaskHandle = 0;
  }
}

// 生成对应的任务
function createTask() {
  current.value = 0;
  this.setAttribute("disabled", true);
  parent.innerHTML = "";
  const onGetItemData = () => ({
    handlerEvent: logTaskHandler,
    data: {
      id: tasks.value.length + 1,
      status: "未开始",
    },
  });

  console.time("createTask");
  for (let i = 0; i < total; i++) {
    tasks.value.push(onGetItemData());
    if (!currentTaskHandle) {
      currentTaskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
    }
  }
  console.timeEnd("createTask");
}

// 按钮注册事件
buttonEl.addEventListener("click", createTask);
