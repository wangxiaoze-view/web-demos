import { writeFileSync } from "node:fs";

const vercelJson = {
  rewrites: [
    {
      source: "/web-demos/:match*",
      destination: "/:match*",
    },
  ],
  github: {
    silent: true,
  },
};

writeFileSync("dist/vercel.json", JSON.stringify(vercelJson, null, 2));
