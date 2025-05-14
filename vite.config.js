import { defineConfig } from "vite";
import { onGetBuildInput, embedInput } from "./build/getInputFiles.mjs";

const base = "/";
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 5555,
    },
    base,
    define: {
      __base: JSON.stringify(base),
      __mode: JSON.stringify(mode),
      __is_development: `${mode === "development"}`,
      __is_production: `${mode === "production"}`,
    },
    build: {
      manifest: true,
      cssMinify: true,
      rollupOptions: {
        input: onGetBuildInput(),
        output: {
          // 静态资源
          assetFileNames: "assets/[name]-[hash].[ext]",
          // 代码分割中产生的 chunk
          chunkFileNames: "js/[name]-[hash].js",
          // 指定 chunks 的入口文件
          // entryFileNames: "js/[name]-[hash].js",
          entryFileNames(chunkInfo) {
            if (embedInput.includes(chunkInfo.name)) {
              return `js/embed/${chunkInfo.name}.js`;
            }
            return "js/[name]-[hash].js";
          },
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
  };
});
