# pixi.js 中统一文本方向的 demo

pixi.js 中，文本显示存在以下问题:

- 在屏幕坐标系中, 文本方向是演 X 轴上下镜像的(flipX=true)
- 在此基础上, 文本仍有可能被再次镜像(flixX/flipY)
- 文本可能发生做生意角度的旋转, 比如旋转 180 度时, 需要反向旋转 180 度
- 文本沿 anchor 点存在 left/center/right 对齐关系
- 上述变换既可能发生在文本自身, 也可能发生在文本任意上级

此 demo 演示如何解决此问题

![演示图](./demo.png)

# TODO

[] 整理代码
[] 提取并暴露 amendText 工具方法、getTextSize 方法
[] getTextSize 改用 pixijs.getBounds 实现
