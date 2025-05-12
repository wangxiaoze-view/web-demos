(function () {
  const hostname = window.location.hostname;
  const head = document.getElementsByTagName("head")[0];
  var hm = document.createElement("script");
  hm.defer = true;
  hm.src = "https://cloud.umami.is/script.js";
  const websiteId = {
    ["www.wangxiaoze.cn,wangxiaoze.cn"]: "63e283e0-9946-4f12-a732-c0e74a121289",
    ["wangxiaoze-view.github.io,localhost,127.0.0.1"]:
      "81502827-f215-4db2-9026-fa822e3c583e",
  };
  for (const [k, id] of Object.entries(websiteId)) {
    if (k.split(",").includes(hostname)) {
      hm.setAttribute("data-website-id", id);
      break;
    }
  }
  head.appendChild(hm);
})();
