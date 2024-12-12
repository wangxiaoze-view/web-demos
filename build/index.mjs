import { writeFileSync } from "node:fs";

const vercelJson = {
  rewrites: [
    {
      source: "/web-demos/:match*",
      destination: "index.html",
    },
  ],
  heders: [
    {
      source: "/assets/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "max-age=31536000, immutable",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
      ],
    },
    {
      source: "/examples/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "max-age=31536000, immutable",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
      ],
    },
    {
      source: "/js/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "max-age=31536000, immutable",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
      ],
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
