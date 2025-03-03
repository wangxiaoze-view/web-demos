function delay(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

const taskList = []; // 存放任务的队列

// 推入任务
for (let i = 1; i <= 100; i++) {
  taskList.push(() => {
    delay(10);
    console.log(`执行任务${i}`);
  });
}

// 接下来我们想要执行任务，每一帧渲染完毕后有剩余时间
// 如果时间充足，我们就执行任务
// 如果时间不充足，那么就在下一帧渲染后再接着执行

function callback(IdleDeadline) {
  // 执行任务
  console.log("当前帧绘制完毕后所剩余的时间：", IdleDeadline.timeRemaining());
  while (IdleDeadline.timeRemaining() > 0 && taskList.length) {
    // 还有剩余时间，并且任务列表还有任务
    const task = taskList.shift();
    task();
  }
  // 退出上面的 while 后，有一种情况是当前帧的时间不够了，但是任务列表中还有剩余任务
  if (taskList.length) {
    // 那么我们就在下一帧空闲时间再继续执行任务
    window.requestIdleCallback(callback);
  }
}

window.requestIdleCallback(callback);
