import { defineConfig } from "vite";
import { getFiles } from "./build/getInputFiles.mjs";

export default defineConfig({
  server: {
    port: 5555,
  },
  base: "/web-demos/",
  define: {
    __base: JSON.stringify("/web-demos/"),
  },
  build: {
    rollupOptions: {
      input: getFiles(),
      output: {
        // 静态资源
        assetFileNames: "assets/[name]-[hash].[ext]",
        // 代码分割中产生的 chunk
        chunkFileNames: "js/[name]-[hash].js",
        // 指定 chunks 的入口文件
        entryFileNames: "js/[name]-[hash].js",
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
