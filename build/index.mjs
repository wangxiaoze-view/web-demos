import { writeFileSync } from "node:fs";

const vercelJson = {
  rewrites: [
    {
      source: "/web-demos/:match*",
      destination: "/web-demos/:match*",
    },
  ],
  github: {
    silent: true,
  },
};

try {
  writeFileSync("dist/vercel.json", JSON.stringify(vercelJson, null, 2));
} finally {
  process.exit(0);
}
