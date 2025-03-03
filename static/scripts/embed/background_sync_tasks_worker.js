const timeOut = 3 * 1000;
// 注册同步管理器任务
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-messages") {
    event.waitUntil(sendOutboxMessages());
  }
});

// 普通任务
self.addEventListener("message", (e) => {
  const { type } = e.data;
  onSend("loading", "普通任务调度中...");
  if (type === "normal") {
    setTimeout(() => {
      onSend("success", "普通任务调度完成...");
    }, timeOut);
  }
});

function onSend(type, text) {
  self.clients
    .matchAll({ includeUncontrolled: true, type: "window" })
    .then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type,
          text,
        });
      });
    });
}
function sendOutboxMessages() {
  onSend("loading", "同步任务调度中...");
  // 这里可以模拟后端接口
  setTimeout(() => {
    onSend("success", "同步任务调度完成...");
  }, timeOut);
}
