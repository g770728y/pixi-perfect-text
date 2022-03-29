import { Container, DisplayObject, Matrix } from "pixi.js";
import { decompose } from "./matrix-utils";

function matrixToStage(obj: DisplayObject) {
  const m = Matrix.IDENTITY;
  for (let _o = obj; (_o as any).name !== "stage"; _o = _o.parent) {
    m.prepend(_o.localTransform);
  }
  return m;
}

export function amendText(textBox: Container) {
  textBox.transform.setFromMatrix(Matrix.IDENTITY);
  textBox.parent.updateTransform();
  const parentMatrix = matrixToStage(textBox.parent);

  const beforeTextMatrix = matrixToStage(textBox);
  const afterTextMatrix = amendTextMatrix(beforeTextMatrix.clone());
  // parentMatrix * textMatrix = newTextMatrix => textMatrix = parentMatrix.inverse() * newTextMatrix
  const afterMatrix_local = parentMatrix
    .clone()
    .invert()
    .append(afterTextMatrix);
  textBox.transform.setFromMatrix(afterMatrix_local);
  textBox.updateTransform();
}

function amendTextMatrix(m: Matrix): Matrix {
  console.log(m.tx, m.ty);
  const flipped = decompose(m).scaling.y < 0;
  const flipMatrix = Matrix.IDENTITY;
  if (flipped) {
    flipMatrix.translate(-26, -10).scale(1, -1).translate(26, 10);
  }
  const postFlipMatrix = m.clone().append(flipMatrix);

  const rotation = decompose(postFlipMatrix).rotation;
  const degree = Math.round((rotation * 180) / Math.PI);
  const adjustDegree =
    (degree >= -180 && degree < -90) || (degree >= 90 && degree <= 180)
      ? Math.PI
      : 0;

  const rotationMatrix = Matrix.IDENTITY;
  if (adjustDegree !== 0) {
    rotationMatrix.translate(-26, -10).rotate(adjustDegree).translate(26, 10);
  }

  return m.clone().append(flipMatrix).append(rotationMatrix);
}
