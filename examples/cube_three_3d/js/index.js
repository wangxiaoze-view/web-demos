// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建魔方组
const rubiksCube = new THREE.Group();

// 定义颜色
const colors = [
  0xff0000, // 红
  0x00ff00, // 绿
  0x0000ff, // 蓝
  0xffff00, // 黄
  0xff8c00, // 橙
  0xffffff, // 白
];

// 创建小立方体
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
      const materials = [];

      // 为每个面设置不同的颜色
      for (let i = 0; i < 6; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[i],
        });
        materials.push(material);
      }

      const cube = new THREE.Mesh(geometry, materials);
      cube.position.set(x, y, z);
      rubiksCube.add(cube);
    }
  }
}

scene.add(rubiksCube);
camera.position.z = 5;

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 动画函数
function animate() {
  requestAnimationFrame(animate);

  // 旋转整个魔方
  rubiksCube.rotation.x += 0.01;
  rubiksCube.rotation.y += 0.01;

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
