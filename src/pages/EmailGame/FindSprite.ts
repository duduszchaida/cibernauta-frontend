import Sprite from "./Elements/Sprite";

const sprites: Record<string, Sprite> = {
  app_border: new Sprite("/game/email/app_border.png"),

  bg_beige: new Sprite("/game/email/bg_beige.png"),
  bg_levels: new Sprite("/game/email/bg_levels.png"),
  bg_blue: new Sprite("/game/email/bg_blue.png"),
  bg_green: new Sprite("/game/email/bg_green.png"),
  bg_save_screen: new Sprite("/game/email/bg_save_screen.png"),
  bg_score: new Sprite("/game/email/bg_score.png"),
  bg_start: new Sprite("/game/email/bg_start.png"),

  btn_malicious: new Sprite("/game/email/btn_malicious.png"),
  btn_safe: new Sprite("/game/email/btn_safe.png"),
  btn_spam: new Sprite("/game/email/btn_spam.png"),
  btn_notepad: new Sprite("/game/email/btn_notepad.png"),
  btn_trash: new Sprite("/game/email/btn_trash.png"),
  btn_exit: new Sprite("/game/email/btn_exit.png"),
  btn_return: new Sprite("/game/email/btn_return.png"),

  cam: new Sprite("/game/email/cam.png"),

  cursor_arrow: new Sprite("/game/email/cursor_arrow.png"),
  cursor_drag: new Sprite("/game/email/cursor_drag.png"),
  cursor_inspect: new Sprite("/game/email/cursor_inspect.png"),
  cursor_pointer: new Sprite("/game/email/cursor_pointer.png"),
  cursor_right: new Sprite("/game/email/cursor_right.png"),
  cursor_left: new Sprite("/game/email/cursor_left.png"),

  email_border: new Sprite("/game/email/email_border.png"),
  email_selection_cover: new Sprite("/game/email/email_selection_cover.png"),
  email_ui: new Sprite("/game/email/email_ui.png"),

  icon_concepts: new Sprite("/game/email/icon_concepts.png"),
  icon_email: new Sprite("/game/email/icon_email.png"),
  icon_save: new Sprite("/game/email/icon_save.png"),
  icon_saves: new Sprite("/game/email/icon_saves.png"),
  icon_settings: new Sprite("/game/email/icon_settings.png"),

  level_block: new Sprite("/game/email/level_block.png"),

  marker_finished: new Sprite("/game/email/marker_finished.png"),
  marker_perfect: new Sprite("/game/email/marker_perfect.png"),

  minecraftia_black: new Sprite("/game/email/minecraftia_black.png"),
  minecraftia_bnw: new Sprite("/game/email/minecraftia_bnw.png"),
  minecraftia_brown: new Sprite("/game/email/minecraftia_brown.png"),
  minecraftia_light_brown: new Sprite(
    "/game/email/minecraftia_light_brown.png",
  ),
  minecraftia_selected: new Sprite("/game/email/minecraftia_selected.png"),
  minecraftia_white: new Sprite("/game/email/minecraftia_white.png"),

  notepad: new Sprite("/game/email/notepad.png"),

  objective_met: new Sprite("/game/email/objective_met.png"),
  objective_failed: new Sprite("/game/email/objective_failed.png"),

  page_test: new Sprite("/game/email/page_test.png"),
  page_tutorial: new Sprite("/game/email/page_tutorial.png"),
  page_section_address: new Sprite("/game/email/page_section_address.png"),

  paragraph_selected: new Sprite("/game/email/paragraph_selected.png"),
  pause_off_btn: new Sprite("/game/email/pause_off_btn.png"),
  pause_on_btn: new Sprite("/game/email/pause_on_btn.png"),
  pause_screen: new Sprite("/game/email/pause_screen.png"),

  picture_catmusic: new Sprite("/game/email/picture_catmusic.png"),
  picture_cibernauta: new Sprite("/game/email/picture_cibernauta.png"),
  picture_choppu: new Sprite("/game/email/picture_choppu.png"),
  picture_default_0: new Sprite("/game/email/picture_default_0.png"),
  picture_default_1: new Sprite("/game/email/picture_default_1.png"),
  picture_default_2: new Sprite("/game/email/picture_default_2.png"),
  picture_default_3: new Sprite("/game/email/picture_default_3.png"),
  picture_default_4: new Sprite("/game/email/picture_default_4.png"),
  picture_default_5: new Sprite("/game/email/picture_default_5.png"),
  picture_default_6: new Sprite("/game/email/picture_default_6.png"),
  picture_default_7: new Sprite("/game/email/picture_default_7.png"),
  picture_hacker_0: new Sprite("/game/email/picture_hacker_0.png"),
  picture_hacker_1: new Sprite("/game/email/picture_hacker_1.png"),
  picture_hacker_2: new Sprite("/game/email/picture_hacker_2.png"),
  picture_pbook: new Sprite("/game/email/picture_pbook.png"),
  picture_rubloks: new Sprite("/game/email/picture_rubloks.png"),
  picture_selected: new Sprite("/game/email/picture_selected.png"),
  picture_fritter: new Sprite("/game/email/picture_fritter.png"),

  popup: new Sprite("/game/email/popup.png"),

  save_avatar_blue: new Sprite("/game/email/save_avatar_blue.png"),
  save_avatar_empty: new Sprite("/game/email/save_avatar_empty.png"),
  save_avatar_green: new Sprite("/game/email/save_avatar_green.png"),
  save_avatar_pink: new Sprite("/game/email/save_avatar_pink.png"),

  scroll_bar: new Sprite("/game/email/scroll_bar.png"),
  scroll_slot: new Sprite("/game/email/scroll_slot.png"),
  start_btn: new Sprite("/game/email/start_btn.png"),
  toolbar: new Sprite("/game/email/toolbar.png"),

  wcp_black: new Sprite("/game/email/wcp_black.png"),
  wcp_brown: new Sprite("/game/email/wcp_brown.png"),
  wcp_light_orange: new Sprite("/game/email/wcp_light_orange.png"),
  wcp_lime: new Sprite("/game/email/wcp_lime.png"),
  wcp_red: new Sprite("/game/email/wcp_red.png"),
  wcp_selected: new Sprite("/game/email/wcp_selected.png"),
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
