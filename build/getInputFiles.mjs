import fs from "node:fs";
import path from "node:path";

function onGetInputFiles(dirPath = "./examples") {
  const inputFiles = { main: "index.html" };
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const [name] = file.split(".").filter(Boolean);
    // 判断是否为目录, 有目录则 标识 examples/xxx/index.html， 没有直接打包该文件
    if (fs.statSync(filePath).isDirectory()) {
      inputFiles[name] = `${filePath}/index.html`;
    } else {
      inputFiles[name] = filePath;
    }
  });
  return inputFiles;
}

export const embedInput = [
  "css_painting_paint",
  "background_sync_tasks_worker",
];
export function onGetBuildInput() {
  return {
    ...onGetInputFiles("./examples"),
    ...onGetInputFiles("./static/scripts/embed"),
  };
}
