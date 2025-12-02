export const SETTINGAUTOSAVE = "settingAutosave"; // Referência à opção de salvamento automático
export const SETTINGFILTER = "settingFilter"; // Referência à opção de filtro visual
export const SETTINGSPOPUP = "settingPopup"; // Referência à opção de salvamento automático

export type Setting =
  | typeof SETTINGAUTOSAVE
  | typeof SETTINGFILTER
  | typeof SETTINGSPOPUP;
