// 创建闪光效果
function createSparkles() {
  const container = document.getElementById("sparkles");
  const sparkleCount = 30;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    // 随机位置和动画
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.setProperty("--tx", `${tx}px`);
    sparkle.style.setProperty("--ty", `${ty}px`);
    sparkle.style.animationDuration = `${1 + Math.random()}s`;
    sparkle.style.animationDelay = `${Math.random()}s`;

    container.appendChild(sparkle);
  }
}

// 更新加载文本
function updateLoadingText() {
  const loadingText = document.querySelector(".loading-text");
  const phrases = ["Loading", "Processing", "Please wait"];
  let phraseIndex = 0;
  let dotCount = 0;

  setInterval(() => {
    const dots = ".".repeat(dotCount + 1);
    loadingText.textContent = `${phrases[phraseIndex]}${dots}`;
    dotCount = (dotCount + 1) % 3;

    if (dotCount === 0) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }, 500);
}

// 添加立方体面的动态效果
function animateCubeFaces() {
  const faces = document.querySelectorAll(".cube-face");
  let colorIndex = 0;
  const colors = [
    "rgba(51, 153, 255, 0.8)",
    "rgba(255, 51, 102, 0.8)",
    "rgba(51, 255, 102, 0.8)",
  ];

  setInterval(() => {
    faces.forEach((face) => {
      face.style.background = colors[colorIndex];
    });
    colorIndex = (colorIndex + 1) % colors.length;
  }, 2000);
}

// 初始化
createSparkles();
updateLoadingText();
animateCubeFaces();
