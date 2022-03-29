import { Matrix } from "pixi.js";

export function decompose(matrix: Matrix) {
  if (matrixEquals(matrix, Matrix.IDENTITY)) {
    return {
      scaling: {
        x: 1,
        y: 1,
      },
      rotation: 0,
      translation: {
        x: 0,
        y: 0,
      },
      shear: 0,
    };
  } else {
    const rotation = Math.atan2(matrix.c, matrix.a);
    const shear = Math.atan2(matrix.d, matrix.b) - Math.PI / 2 - rotation;
    const scaling = {
      x: Math.sqrt(matrix.a * matrix.a + matrix.c * matrix.c),
      y: Math.sqrt(matrix.b * matrix.b + matrix.d * matrix.d) * Math.cos(shear),
    };
    return {
      scaling,
      shear,
      rotation,
      translation: {
        x: matrix.tx,
        y: matrix.ty,
      },
    };
  }
}

function matrixEquals(m1: Matrix, m2: Matrix) {
  return (
    m1.a === m2.a &&
    m1.b === m2.b &&
    m1.c === m2.c &&
    m1.d === m2.d &&
    m1.tx === m2.tx &&
    m1.ty === m2.ty
  );
}

/*
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 */
/*
def decompose(self) -> Tuple[Tuple[float, float], float, Point2D]:
if self is _IDENTITY_MATRIX:
    return (1, 1), 0, (0, 0)

rotation = math.atan2(self.m12, self.m11)
shear = math.atan2(self.m22, self.m21) - math.pi / 2 - rotation
scaling = (
    math.hypot(self.m11, self.m12),
    math.hypot(self.m21, self.m22) * math.cos(shear),
)
return scaling, rotation, self.translation
*/
// [@pixi/math:Matrix a=1.8369701987210297e-16 b=-1 c=-1 d=-6.123233995736766e-17 tx=200 ty=18.5]
// [@pixi/math:Matrix a=6.123233995736766e-17 b=1 c=-1 d=6.123233995736766e-17 tx=200 ty=0]
