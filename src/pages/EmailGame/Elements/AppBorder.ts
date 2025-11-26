import GameObject from "./GameObject";

// GamObject de "borda de aplicativo" genérico
export const appBorder = new GameObject({
  spriteName: "app_border",
  width: 352,
  height: 256,
  ignoreClick: true,
});
