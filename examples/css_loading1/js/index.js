// 创建粒子效果
function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // 随机位置和动画持续时间
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 2;

    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }
}

// 更新加载文本
function updateLoadingText() {
  const loadingText = document.querySelector(".loader-text");
  const dots = [".", "..", "..."];
  let index = 0;

  setInterval(() => {
    loadingText.textContent = `Loading${dots[index]}`;
    index = (index + 1) % dots.length;
  }, 500);
}

// 模拟加载进度
function simulateLoading() {
  const progressBar = document.querySelector(".progress-bar");
  let progress = 0;

  function updateProgress() {
    if (progress < 100) {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      progressBar.style.width = `${progress}%`;

      if (progress < 100) {
        setTimeout(updateProgress, 200 + Math.random() * 500);
      }
    }
  }

  updateProgress();
}

// 初始化
createParticles();
updateLoadingText();
simulateLoading();
