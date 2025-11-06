import Sprite from "./Elements/Sprite";

const sprites: Record<string, Sprite> = {
  cam: new Sprite("/game/email/cam.png"),
  blue_bg: new Sprite("/game/email/blue_bg.png"),
  beige_bg: new Sprite("/game/email/beige_bg.png"),
  email_ui: new Sprite("/game/email/email_ui.png"),
  concepts_icon: new Sprite("/game/email/concepts_icon.png"),
  email_icon: new Sprite("/game/email/email_icon.png"),
  settings_icon: new Sprite("/game/email/settings_icon.png"),
  saves_icon: new Sprite("/game/email/saves_icon.png"),
  scroll_bar: new Sprite("/game/email/scroll_bar.png"),
  scroll_slot: new Sprite("/game/email/scroll_slot.png"),
  cursor_arrow: new Sprite("/game/email/cursor_arrow.png"),
  cursor_pointer: new Sprite("/game/email/cursor_pointer.png"),
  minecraftia_white: new Sprite("/game/email/minecraftia_white.png"),
  minecraftia_black: new Sprite("/game/email/minecraftia_black.png"),
  minecraftia_bnw: new Sprite("/game/email/minecraftia_bnw.png"),
  minecraftia_brown: new Sprite("/game/email/minecraftia_brown.png"),
  minecraftia_light_brown: new Sprite(
    "/game/email/minecraftia_light_brown.png",
  ),
  wcp_black: new Sprite("/game/email/wcp_black.png"),
  wcp_brown: new Sprite("/game/email/wcp_brown.png"),
  app_border: new Sprite("/game/email/app_border.png"),
  exit_btn: new Sprite("/game/email/exit_btn.png"),
  default_picture_0: new Sprite("/game/email/default_picture_0.png"),
  default_picture_1: new Sprite("/game/email/default_picture_1.png"),
  default_picture_2: new Sprite("/game/email/default_picture_2.png"),
  default_picture_3: new Sprite("/game/email/default_picture_3.png"),
  default_picture_4: new Sprite("/game/email/default_picture_4.png"),
  default_picture_5: new Sprite("/game/email/default_picture_5.png"),
  default_picture_6: new Sprite("/game/email/default_picture_6.png"),
  default_picture_7: new Sprite("/game/email/default_picture_7.png"),
};

const spriteArr = Object.values(sprites);
const promises = spriteArr.map((sprite) => sprite.load());
await Promise.all(promises);

export default sprites;

export function findSprite(spriteName: string) {
  const sprite = sprites[spriteName.replaceAll("-", "_")];
  if (!sprite) {
    throw new Error(`Sprite ${spriteName} not found`);
  }
  return sprite;
}

