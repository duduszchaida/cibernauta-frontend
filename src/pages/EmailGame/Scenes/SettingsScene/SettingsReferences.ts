export const SETTINGAUTOSAVE = "settingAutosave";
export const SETTINGFILTER = "settingFilter";
export const SETTINGSAVEWARNING = "settingSaveWarning";

export type Setting =
  | typeof SETTINGAUTOSAVE
  | typeof SETTINGFILTER
  | typeof SETTINGSAVEWARNING;
