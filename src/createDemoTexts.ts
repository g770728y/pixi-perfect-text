import {
  Application,
  Graphics,
  LineStyle,
  TextStyle,
  Text,
  Container,
  Matrix,
} from "pixi.js";
import { amendText } from "./amendText";
import { R } from "./constants";
import { fontSizeCaculator } from "./FontSizeCalculator";

export function createDemoTexts(app: Application) {
  const outter = new Graphics();
  const lineStyle = new LineStyle();
  lineStyle.color = 0xaaaa00;
  lineStyle.visible = true;
  lineStyle.width = 2;
  outter.lineStyle(lineStyle);
  outter.drawCircle(0, 0, R);
  // outter.drawRect(-200, -200, 400, 400);
  app.stage.addChild(outter);

  for (let i = 0; i < 360; i += 45) {
    const B = (i * Math.PI) / 180.0;
    drawTextWrapper(outter, R * Math.cos(B), R * Math.sin(B), i);
  }

  return outter;
}

function drawTextWrapper(parent: Container, x: number, y: number, B: number) {
  const textWrapper = new Graphics();

  const m1 = Matrix.IDENTITY;
  m1.translate(x, y);
  const m2 = Matrix.IDENTITY;
  m2.rotate(((B + 90) * Math.PI) / 180);
  const m = m1.append(m2);
  textWrapper.transform.setFromMatrix(m);
  parent.addChild(textWrapper);
  textWrapper.updateTransform();

  //-----
  const textBox = new Graphics();
  textWrapper.addChild(textBox);
  drawText(textBox, `EF${B}`);

  textWrapper.beginFill(B === 45 ? 0x999999 : 0xdddddd);
  textWrapper.drawRect(0, 0, 50, 18.5);
  textWrapper.endFill();
}

function drawText(parent: Container, t: string) {
  const text = new Text(t);
  parent.addChild(text);

  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: 0xff0000,
  });
  text.style = style;

  const fontHeight = fontSizeCaculator.getHeight(style);

  const m1 = Matrix.IDENTITY;
  m1.scale(1, -1);
  const m2 = Matrix.IDENTITY;
  m2.translate(0, -fontHeight);

  const m = m1.append(m2);

  text.transform.setFromMatrix(m);
  text.parent.updateTransform();
  amendText(text.parent);
}
