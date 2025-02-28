import fs from "node:fs";
import path from "node:path";

export function getFiles(dirPath = "./examples") {
  const inputFiles = { main: "index.html" };
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const [name] = file.split(".").filter(Boolean);
    inputFiles[name] = `${filePath}/index.html`;
  });
  return inputFiles;
}
