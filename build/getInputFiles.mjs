import fs from "node:fs";
import path from "node:path";

export function getFiles(dirPath = "./examples") {
  const inputFiles = { main: "index.html" };
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    const [name] = file.split(".").filter(Boolean);
    if (stat.isDirectory()) {
      inputFiles[name] = getFiles(filePath);
    } else {
      inputFiles[name] = filePath;
    }
  });
  return inputFiles;
}
