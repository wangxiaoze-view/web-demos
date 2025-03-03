registerPaint(
  "paint",
  class {
    static get contextOptions() {
      return { alpha: true };
    }
    static get inputProperties() {
      return ["--color", "--random"];
    }
    paint(ctx, geometry, properties) {
      const color = properties.get("--color");
      const random = properties.get("--random");
      const { width, height } = geometry;
      const offsetX = 70;
      const w = width - offsetX;
      const w_len = Math.floor(w * Number(random));
      ctx.fillStyle = color;
      ctx.fillRect(offsetX, 0, w_len, height);
    }
  }
);
