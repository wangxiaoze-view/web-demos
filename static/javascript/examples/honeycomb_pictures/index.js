class ElementNode {
  /**
   * @description  创建一个元素
   * @param {string} [className="shape"] -元素的类名
   * @return {HTMLElement} -新元素
   */
  static createElement(className = "shape") {
    const el = document.createElement("div");
    el.className = className;
    return el;
  }
  /**
   * @description  获取元素的父元素
   * @return {HTMLElement} -父元素
   */
  static get getParentEle() {
    return document.querySelector(".honeycomb_picturess");
  }
  /**
   * @description  获取元素的父元素的尺寸信息
   * @return {DOMRect} -父元素的尺寸信息
   */
  static get getParentRect() {
    return ElementNode.getParentEle.getBoundingClientRect();
  }
  /**
   * @description  生成随机颜色
   * @return {string} -生成的随机颜色
   */
  static createRandomColor() {
    const c = Math.floor(Math.random() * 255);
    return `rgb(${c},${c},${c})`;
  }
  /**
   * @description  获取所有图形
   * @return {NodeList<HTMLElement>} -所有图形
   */
  static get getAllShapes() {
    return document.querySelectorAll(".shape");
  }
  /**
   * @description  获取邻居
   * @param {number} rowIndex -行下标
   * @param {number} colIndex -列下标
   * @return {Array<[number, number]>} -邻居的下标
   */
  static setNeighbor(rowIndex, colIndex) {
    return [
      [rowIndex - 1, rowIndex % 2 === 0 ? colIndex : colIndex - 1], //左上方
      [rowIndex - 1, rowIndex % 2 !== 0 ? colIndex : colIndex + 1], // 右上方

      [rowIndex, colIndex - 1], // 左侧
      [rowIndex, colIndex + 1], // 右侧

      [rowIndex + 1, rowIndex % 2 === 0 ? colIndex : colIndex - 1], // 左下方
      [rowIndex + 1, rowIndex % 2 !== 0 ? colIndex : colIndex + 1], // 右下方
    ];
  }
}
class Queue {
  queue = [];
  queueIndex = 0;
  constructor(queue = []) {
    this.queue = queue;
  }
  /**
   * @description  执行当前任务
   * @return {void}
   */
  runTask() {
    const currentTask = this.queue[this.queueIndex];
    if (!currentTask) return;
    currentTask(this.nextTask);
  }

  /**
   * @description  执行下一个任务
   * @param {Array} [args=[]] - 任务参数
   * @return {void}
   */
  nextTask(args = []) {
    if (this.queueIndex >= this.queue.length) return;
    Promise.resolve().then(() => {
      const row = ElementNode.createElement("row-container");
      const { width } = ElementNode.getParentRect;
      // 这里需要时 每一行n个 减去1，不然最后一个显示空白
      const itemSize = width / (args.length - 1);
      if (this.queueIndex % 2 === 0)
        row.style.transform = `translateX(${-itemSize / 2}px)`;
      if (this.queueIndex > 0) row.style.marginTop = `-${itemSize / 5}px`;
      args.forEach(({ rowIndex }, index) => {
        const ele = ElementNode.createElement();
        ele.style.width = `${itemSize}px`;
        ele.style.height = `${itemSize}px`;
        // 如果图片加载不出来，就用随机颜色
        ele.style.backgroundImage = `url(https://picsum.photos/200/300?random=${Math.random()}), linear-gradient(to bottom, ${ElementNode.createRandomColor()}, ${ElementNode.createRandomColor()})`;
        row.appendChild(ele);

        // 注册事件
        ele.addEventListener("mouseenter", (e) => {
          ElementNode.getAllShapes.forEach((child) => {
            child.style.opacity = "0.3";
          });
          const target = e.target;
          target.classList.add("self-active");
          target.style.opacity = "1";

          ElementNode.setNeighbor(rowIndex, index).forEach(([row, col]) => {
            const child = document.querySelector(
              `.row-container:nth-child(${row + 1}) .shape:nth-child(${
                col + 1
              })`
            );
            if (!child) return;
            child.style.opacity = "1";
            child.classList.add("around-active");
          });
        });

        ele.addEventListener("mouseleave", (e) => {
          ElementNode.getAllShapes.forEach((child) => {
            child.style.opacity = "1";
            child.classList.remove("self-active");
            child.classList.remove("around-active");
          });
        });
      });
      ElementNode.getParentEle.appendChild(row);
    });

    this.queueIndex++;
    const currentTask = this.queue[this.queueIndex];
    if (!currentTask) return;
    currentTask(this.nextTask);
  }
}
// 100行
const row = 100;
// 每行20个
const col = 20;
// 以队列的形式加入队伍，避免卡顿
const queue = new Queue(
  Array.from({ length: row }, (_, rowIndex) => {
    return (next) => {
      setTimeout(() => {
        next.call(
          queue,
          Array.from({ length: col }).map((_, colIndex) => ({
            rowIndex,
            colIndex,
          }))
        );
      }, 0);
    };
  })
);
window.onload = () => {
  queue.runTask();
};
