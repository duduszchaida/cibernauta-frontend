import Sprite from "./Sprite";

const sprites: Record<string, Sprite> = {
  cam: new Sprite("/game/email/cam.png"),
  bg_blue: new Sprite("/game/email/bg_blue.png"),
  bg_beige: new Sprite("/game/email/bg_beige.png"),
  bg_green: new Sprite("/game/email/bg_green.png"),
  bg_save_screen: new Sprite("/game/email/bg_save_screen.png"),
  concepts_icon: new Sprite("/game/email/concepts_icon.png"),
  email_ui: new Sprite("/game/email/email_ui.png"),
  email_icon: new Sprite("/game/email/email_icon.png"),
  email_selection_cover: new Sprite("/game/email/email_selection_cover.png"),
  settings_icon: new Sprite("/game/email/settings_icon.png"),
  saves_icon: new Sprite("/game/email/saves_icon.png"),
  scroll_bar: new Sprite("/game/email/scroll_bar.png"),
  scroll_slot: new Sprite("/game/email/scroll_slot.png"),
  cursor_arrow: new Sprite("/game/email/cursor_arrow.png"),
  cursor_drag: new Sprite("/game/email/cursor_drag.png"),
  cursor_pointer: new Sprite("/game/email/cursor_pointer.png"),
  cursor_inspect: new Sprite("/game/email/cursor_inspect.png"),
  minecraftia_white: new Sprite("/game/email/minecraftia_white.png"),
  minecraftia_black: new Sprite("/game/email/minecraftia_black.png"),
  minecraftia_bnw: new Sprite("/game/email/minecraftia_bnw.png"),
  minecraftia_brown: new Sprite("/game/email/minecraftia_brown.png"),
  minecraftia_selected: new Sprite("/game/email/minecraftia_selected.png"),
  minecraftia_light_brown: new Sprite(
    "/game/email/minecraftia_light_brown.png",
  ),
  wcp_black: new Sprite("/game/email/wcp_black.png"),
  wcp_selected: new Sprite("/game/email/wcp_selected.png"),
  wcp_brown: new Sprite("/game/email/wcp_brown.png"),
  wcp_light_orange: new Sprite("/game/email/wcp_light_orange.png"),
  app_border: new Sprite("/game/email/app_border.png"),
  email_border: new Sprite("/game/email/email_border.png"),
  exit_btn: new Sprite("/game/email/exit_btn.png"),
  btn_safe: new Sprite("/game/email/btn_safe.png"),
  btn_malicious: new Sprite("/game/email/btn_malicious.png"),
  btn_spam: new Sprite("/game/email/btn_spam.png"),
  default_picture_0: new Sprite("/game/email/default_picture_0.png"),
  default_picture_1: new Sprite("/game/email/default_picture_1.png"),
  default_picture_2: new Sprite("/game/email/default_picture_2.png"),
  default_picture_3: new Sprite("/game/email/default_picture_3.png"),
  default_picture_4: new Sprite("/game/email/default_picture_4.png"),
  default_picture_5: new Sprite("/game/email/default_picture_5.png"),
  default_picture_6: new Sprite("/game/email/default_picture_6.png"),
  default_picture_7: new Sprite("/game/email/default_picture_7.png"),
  picture_selected: new Sprite("/game/email/picture_selected.png"),
  toolbar: new Sprite("/game/email/toolbar.png"),
  paragraph_selected: new Sprite("/game/email/paragraph_selected.png"),
  save_avatar_empty: new Sprite("/game/email/save_avatar_empty.png"),
  save_avatar_blue: new Sprite("/game/email/save_avatar_blue.png"),
  save_avatar_green: new Sprite("/game/email/save_avatar_green.png"),
  save_avatar_pink: new Sprite("/game/email/save_avatar_pink.png"),
  level_block: new Sprite("/game/email/level_block.png"),
  marker_finished: new Sprite("/game/email/marker_finished.png"),
  marker_perfect: new Sprite("/game/email/marker_perfect.png"),
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
