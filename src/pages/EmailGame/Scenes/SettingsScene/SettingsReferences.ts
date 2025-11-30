export const SETTINGAUTOSAVE = "settingAutosave";
export const SETTINGFILTER = "settingFilter";
export const SETTINGPOPUP = "settingPopup";

export type Setting =
  | typeof SETTINGAUTOSAVE
  | typeof SETTINGFILTER
  | typeof SETTINGPOPUP;
