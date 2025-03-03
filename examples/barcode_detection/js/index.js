const isSupport = "BarcodeDetector" in globalThis;
const supportEl = document.querySelector("#support");
const buttonEl = document.querySelector("button");

const contentEl = document.querySelector(".container-img-content");

const emptyText = "此浏览器不支持条形码检测器。";

getSupportedFormats();

async function getSupportedFormats() {
  if (!isSupport) {
    return (supportEl.textContent = emptyText);
  }
  const supportCode = await BarcodeDetector.getSupportedFormats();
  supportEl.textContent = JSON.stringify(supportCode);
}

async function onDetect() {
  contentEl.innerHTML = "";
  if (!isSupport) {
    return (contentEl.innerHTML = emptyText);
  }
  const detector = new BarcodeDetector();
  const result = await detector.detect(document.querySelector("img"));
  const { rawValue, format, cornerPoints, boundingBox } = result[0];
  contentEl.innerHTML = `
		<div>条码内容: ${rawValue}</div>
		<div>条码内容: ${format}</div>
		<div>角点坐标: <code>${JSON.stringify(cornerPoints)}</code></div>
		<div>条码范围: <code>${JSON.stringify(boundingBox)}</code></div>
	`;
}

buttonEl.addEventListener("click", onDetect);
