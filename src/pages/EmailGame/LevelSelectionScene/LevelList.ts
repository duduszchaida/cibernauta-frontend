import type { Level } from "./LevelSelectionScene";

export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const TESTLEVEL = "testLevel";
export const TESTLEVEL2 = "testLevel2";
export const TESTLEVEL3 = "testLevel3";
export const TESTLEVEL4 = "testLevel4";
export const TESTLEVEL5 = "testLevel5";

export const LevelList: Record<string, Level> = {
  [CONTROLSLEVEL]: {
    name: "Aprendendo os Controles",
    goal: 50,
    emailReferences: {},
    reference: CONTROLSLEVEL,
  },
  [TUTORIALLEVEL]: {
    name: "Primeiro contato",
    goal: 500,
    emailReferences: {},
    reference: TUTORIALLEVEL,
  },
  [TESTLEVEL]: {
    name: "Testing level",
    goal: 1000,
    emailReferences: {},
    reference: TESTLEVEL,
  },
  [TESTLEVEL2]: {
    name: "Fase muito massa woow",
    goal: 1000,
    emailReferences: {},
    reference: TESTLEVEL2,
  },
  [TESTLEVEL3]: {
    name: "Propagandas",
    goal: 1000,
    emailReferences: {},
    reference: TESTLEVEL3,
  },
  [TESTLEVEL4]: {
    name: "Alguém pediu um código?",
    goal: 500,
    emailReferences: {},
    reference: TESTLEVEL4,
  },
  [TESTLEVEL5]: {
    name: "Testing level",
    goal: 1000,
    emailReferences: {},
    reference: TESTLEVEL5,
  },
};

export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
];
