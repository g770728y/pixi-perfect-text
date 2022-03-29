import "./style.css";
import * as PIXI from "pixi.js";
import { Container, Graphics, LineStyle, Matrix } from "pixi.js";
import { StageSize } from "./constants";
import { createDemoTexts } from "./createDemoTexts";
import { amendText as amendTextBox } from "./amendText";

function getValues() {
  const rotation = (document.getElementById("rotate")! as HTMLInputElement)
    .value;
  const translateX = (
    document.getElementById("translateX")! as HTMLInputElement
  ).value;
  const translateY = (
    document.getElementById("translateY")! as HTMLInputElement
  ).value;
  const flipX = (document.getElementById("flipX")! as HTMLInputElement).checked;
  const flipY = (document.getElementById("flipY")! as HTMLInputElement).checked;
  return {
    rotate: parseFloat(rotation || "0"),
    translate: {
      x: parseFloat(translateX || "0"),
      y: parseFloat(translateY || "0"),
    },
    flip: {
      x: flipX,
      y: flipY,
    },
  };
}

function createProjectionMatrix(): Matrix {
  const m1 = Matrix.IDENTITY;
  m1.translate(StageSize.w / 2, StageSize.h / 2);
  const m2 = Matrix.IDENTITY;
  m2.scale(1, -1);
  return m1.append(m2);
}

function createUserSpace(app: PIXI.Application) {
  const c = new Graphics();
  const lineStyle = new LineStyle();
  lineStyle.width = 3;
  lineStyle.color = 0xdddddd;
  lineStyle.visible = true;
  c.lineStyle(lineStyle);
  c.moveTo(-StageSize.w / 2, 0);
  c.lineTo(StageSize.w / 2, 0);
  c.moveTo(0, -StageSize.h / 2);
  c.lineTo(0, StageSize.h / 2);

  app.stage.addChild(c);
}

function draw() {
  const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0xffffff,
  });
  const container = document.getElementById("canvas-container")!;
  container.appendChild(app.view);
  const projectionMatrix = createProjectionMatrix();
  app.stage.transform.setFromMatrix(projectionMatrix);
  app.stage.name = "stage";

  createUserSpace(app);

  return createDemoTexts(app);
}

function main() {
  const demoTextGroup = draw();
  demoTextGroup.updateTransform();

  document.getElementById("confirm")!.addEventListener("click", () => {
    const values = getValues();
    const m1 = Matrix.IDENTITY.translate(
      values.translate.x,
      values.translate.y
    );
    const m2 = Matrix.IDENTITY.scale(
      values.flip.y ? -1 : 1,
      values.flip.x ? -1 : 1
    );
    const m3 = Matrix.IDENTITY.rotate((values.rotate * Math.PI) / 180.0);

    demoTextGroup.transform.setFromMatrix(m1.append(m2).append(m3));
    const textBox = extractTextBox(demoTextGroup);
    demoTextGroup.updateTransform();
    textBox.forEach((textBox) => amendTextBox(textBox));
  });
}

function extractTextBox(g: PIXI.Graphics) {
  const texts: PIXI.Text[] = [];
  for (let i = 0; i < g.children.length; i++) {
    const wrapper = g.children[i] as Container;
    texts.push(wrapper.children[0] as PIXI.Text);
  }
  return texts;
}

main();
