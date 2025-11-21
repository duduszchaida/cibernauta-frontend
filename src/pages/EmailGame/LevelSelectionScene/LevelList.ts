import type { Level } from "./LevelSelectionScene";

export const TESTLEVEL = "testLevel";
export const TESTLEVEL2 = "testLevel2";
export const TESTLEVEL3 = "testLevel3";
export const TESTLEVEL4 = "testLevel4";
export const TESTLEVEL5 = "testLevel5";

export const LevelList: Record<string, Level> = {
  [TESTLEVEL]: {
    name: "Testing level",
    goal: 1000,
    emailReferences: {},
  },
  [TESTLEVEL2]: {
    name: "Fase muito massa woow",
    goal: 1000,
    emailReferences: {},
  },
  [TESTLEVEL3]: {
    name: "Propagandas",
    goal: 1000,
    emailReferences: {},
  },
  [TESTLEVEL4]: {
    name: "Alguém pediu um código?",
    goal: 500,
    emailReferences: {},
  },
  [TESTLEVEL5]: {
    name: "Testing level",
    goal: 1000,
    emailReferences: {},
  },
};
