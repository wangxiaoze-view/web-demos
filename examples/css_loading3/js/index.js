function createDNA() {
  const helix = document.getElementById("helix");
  const basePairs = 20; // DNA碱基对数量
  const colors = ["#ff3366", "#33ff66", "#3366ff", "#ffcc00"];

  for (let i = 0; i < basePairs; i++) {
    // 创建左侧碱基
    const leftBase = document.createElement("div");
    leftBase.className = "base";
    leftBase.style.top = `${(i / basePairs) * 100}%`;
    leftBase.style.background = colors[i % colors.length];
    leftBase.style.transform = `rotateY(${i * 36}deg) translateX(-20px)`;
    helix.appendChild(leftBase);

    // 创建右侧碱基
    const rightBase = document.createElement("div");
    rightBase.className = "base";
    rightBase.style.top = `${(i / basePairs) * 100}%`;
    rightBase.style.background = colors[(i + 2) % colors.length];
    rightBase.style.transform = `rotateY(${i * 36 + 180}deg) translateX(-20px)`;
    helix.appendChild(rightBase);

    // 创建连接线
    const connection = document.createElement("div");
    connection.className = "connection";
    connection.style.top = `${(i / basePairs) * 100}%`;
    connection.style.transform = `rotateY(${i * 36}deg)`;
    helix.appendChild(connection);
  }
}

function updateLoadingText() {
  const loadingText = document.querySelector(".loading-text");
  const phrases = ["Analyzing", "Processing", "Loading"];
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

function addGlowingEffect() {
  const bases = document.querySelectorAll(".base");
  bases.forEach((base, index) => {
    setInterval(() => {
      base.style.boxShadow = `0 0 20px ${base.style.background}`;
      setTimeout(() => {
        base.style.boxShadow = `0 0 10px ${base.style.background}`;
      }, 1000);
    }, 2000 + index * 100);
  });
}

// 初始化
createDNA();
updateLoadingText();
addGlowingEffect();
