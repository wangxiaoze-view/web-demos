import nprogress from "nprogress";

export default function useLoading() {
  // laoding container el
  const loadingEl = document.querySelector("#loading-container");
  // loading-value el
  const valueEl = loadingEl.querySelector(".value");
  // loading-progress el
  const progressEl = loadingEl.querySelector(".progress");

  nprogress.configure({ showSpinner: false });
  nprogress.start();
  nprogress.inc(0.8);

  const timer = setInterval(() => {
    let value = Math.floor(nprogress.status * 100);
    valueEl.textContent = `${value}`;
    progressEl.style.width = `${value}%`;
  }, 100);

  const closeProgress = () => {
    return new Promise((resolve) => {
      valueEl.textContent = 100;
      progressEl.style.width = `100%`;
      nprogress.done();
      clearInterval(timer);
      setTimeout(() => {
        resolve();
        // loadingEl.remove();
        loadingEl.style.display = "none";
      }, 1000);
    });
  };

  return {
    loadingEl,
    closeProgress,
  };
}
