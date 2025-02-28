// 在场景创建之前添加加载动画
const loadingManager = new THREE.LoadingManager();
const loadingScreen = document.getElementById("loading");

// 创建进度条
const progressBar = document.createElement("div");
progressBar.style.width = "200px";
progressBar.style.height = "5px";
progressBar.style.background = "#333";
progressBar.style.marginTop = "10px";
progressBar.style.borderRadius = "3px";

const progress = document.createElement("div");
progress.style.width = "0%";
progress.style.height = "100%";
progress.style.background = "#7fff7f";
progress.style.borderRadius = "3px";
progress.style.transition = "width 0.3s";

progressBar.appendChild(progress);
loadingScreen.appendChild(progressBar);

// 设置加载管理器的回调
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progressPercent = (itemsLoaded / itemsTotal) * 100;
  progress.style.width = progressPercent + "%";
};

loadingManager.onLoad = function () {
  // 添加淡出效果
  loadingScreen.style.transition = "opacity 0.5s";
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
};

// 创建资源加载器
const textureLoader = new THREE.TextureLoader(loadingManager);

// 模拟加载过程
const fakeLoadingPromise = new Promise((resolve) => {
  let count = 0;
  const totalAssets = 5; // 假设我们有5个资源需要加载

  function fakeLoad() {
    count++;
    loadingManager.onProgress(null, count, totalAssets);

    if (count < totalAssets) {
      setTimeout(fakeLoad, 300); // 每300ms加载一个资源
    } else {
      setTimeout(resolve, 300); // 最后一个资源加载完成
    }
  }

  fakeLoad();
});

// 等待加载完成后再创建场景
fakeLoadingPromise.then(() => {
  // 原有的场景创建代码...
  createScene();
});

// 将原有的场景创建代码封装到函数中
function createScene() {
  // 创建场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a1a);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // 添加轨道控制器
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // 创建地面
  const groundGeometry = new THREE.PlaneGeometry(10, 10);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.8,
    metalness: 0.2,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // 创建简单的狼模型
  function createWolf() {
    const wolfGroup = new THREE.Group();

    // 身体
    const bodyGeometry = new THREE.BoxGeometry(1, 0.8, 1.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    body.castShadow = true;
    wolfGroup.add(body);

    // 头部
    const headGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x909090 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.4, 0.6);
    head.castShadow = true;
    wolfGroup.add(head);

    // 嘴巴
    const snoutGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.4);
    const snoutMaterial = new THREE.MeshPhongMaterial({
      color: 0x707070,
    });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0, 1.3, 0.9);
    snout.castShadow = true;
    wolfGroup.add(snout);

    // 耳朵
    const earGeometry = new THREE.ConeGeometry(0.1, 0.3, 4);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });

    const earLeft = new THREE.Mesh(earGeometry, earMaterial);
    earLeft.position.set(0.2, 1.8, 0.6);
    earLeft.castShadow = true;
    wolfGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeometry, earMaterial);
    earRight.position.set(-0.2, 1.8, 0.6);
    earRight.castShadow = true;
    wolfGroup.add(earRight);

    // 腿
    const legGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x707070 });

    const positions = [
      [0.3, 0.3, 0.5], // 前右
      [-0.3, 0.3, 0.5], // 前左
      [0.3, 0.3, -0.5], // 后右
      [-0.3, 0.3, -0.5], // 后左
    ];

    positions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      wolfGroup.add(leg);
    });

    // 尾巴
    const tailGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.5);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0.8, -0.8);
    tail.rotation.x = Math.PI / 4;
    tail.castShadow = true;
    wolfGroup.add(tail);

    return wolfGroup;
  }

  // 创建狼并添加到场景
  const wolf = createWolf();
  scene.add(wolf);
  document.getElementById("loading").style.display = "none";

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // 添加主光源
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(5, 5, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);

  // 添加背光
  const backLight = new THREE.DirectionalLight(0x5555ff, 0.3);
  backLight.position.set(-5, 5, -5);
  scene.add(backLight);

  // 添加聚光灯
  const spotLight = new THREE.SpotLight(0xffa95c, 1);
  spotLight.position.set(0, 5, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 添加粒子效果
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x7fff7f,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);

    if (wolf) {
      wolf.rotation.y += 0.005;
    }

    particlesMesh.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
  }

  // 处理窗口大小变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 开始动画
  animate();
}
