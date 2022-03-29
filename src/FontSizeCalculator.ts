import { TextStyle } from "pixi.js";

class FontSizeCalculator {
  private cache: Record<string, number> = {};

  getHeight(style: TextStyle) {
    const ss = style.fontFamily.toString() + style.fontSize + style.fill;
    if (!this.cache[ss]) {
      this.cache[ss] = this.caculate(style);
    }
    return this.cache[ss];
  }

  private caculate(style: TextStyle) {
    const span = document.createElement("span");
    span.innerText = "testing";
    span.style.position = "fixed";
    span.style.fontFamily = style.fontFamily.toString();
    span.style.fontSize = style.fontSize + "px";
    span.style.left = -100000 + "px";
    span.style.top = -100000 + "px";
    document.body.appendChild(span);
    const h = span.getBoundingClientRect().height;
    // document.body.removeChild(span);
    return h;
  }
}

export const fontSizeCaculator = new FontSizeCalculator();
