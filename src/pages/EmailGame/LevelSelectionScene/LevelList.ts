import * as EmailList from "../EmailScene/EmailList";
import { MALICIOUS, SAFE } from "../EmailScene/EmailManager";
import type { Level } from "./Level";

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
    emailDataList: [],
    reference: CONTROLSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailSafeControls,
  },
  // [TUTORIALLEVEL]: {
  //   name: "Primeiro contato",
  //   goal: 500,
  //   emailDataList: [],
  //   reference: TUTORIALLEVEL,
  // },
  // [TESTLEVEL]: {
  //   name: "Testing level",
  //   goal: 1000,
  //   emailDataList: [],
  //   reference: TESTLEVEL,
  // },
  // [TESTLEVEL2]: {
  //   name: "Fase muito massa woow",
  //   goal: 1000,
  //   emailDataList: [],
  //   reference: TESTLEVEL2,
  // },
  // [TESTLEVEL3]: {
  //   name: "Propagandas",
  //   goal: 1000,
  //   emailDataList: [],
  //   reference: TESTLEVEL3,
  // },
  // [TESTLEVEL4]: {
  //   name: "Alguém pediu um código?",
  //   goal: 500,
  //   emailDataList: [],
  //   reference: TESTLEVEL4,
  // },
  // [TESTLEVEL5]: {
  //   name: "Testing level",
  //   goal: 1000,
  //   emailDataList: [],
  //   reference: TESTLEVEL5,
  // },
};

export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
];
