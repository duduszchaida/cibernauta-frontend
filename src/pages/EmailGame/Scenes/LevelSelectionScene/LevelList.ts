import { MALICIOUS, SAFE, SPAM } from "../EmailScene/EmailData";
import * as EmailList from "../EmailScene/EmailList";
import type { Level } from "./Level";

export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const ELEMENTSLEVEL = "elementsLevel";
export const TESTLEVEL = "testLevel";

export const LevelList: Record<string, Level> = {
  [CONTROLSLEVEL]: {
    name: "Aprendendo os Controles",
    goal: 200,
    emailDataList: [],
    reference: CONTROLSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialControls,
    canInspect: false,
    secondsTimer: 0,
  },
  [TUTORIALLEVEL]: {
    name: "Primeiro contato",
    goal: 1000,
    emailDataList: [
      EmailList.mailMal1,
      EmailList.mailMal2,
      EmailList.mailMal3,
      EmailList.mailSafe1,
      EmailList.mailSafe2,
    ],
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialClass,
    canInspect: false,
    secondsTimer: 180,
  },
  [ELEMENTSLEVEL]: {
    name: "Elementos de email",
    goal: 2000,
    emailDataList: [],
    reference: ELEMENTSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialElements,
    canInspect: true,
    secondsTimer: 180,
  },

  // Debug
  [TESTLEVEL]: {
    name: "Fase com todos os emails",
    goal: 10000,
    emailDataList: [...EmailList.nonTutorials],
    starterEmail: EmailList.mailTutorialTest,
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS, SPAM],
    canInspect: false,
    secondsTimer: 300,
  },
};

export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
  LevelList[ELEMENTSLEVEL],
  LevelList[TESTLEVEL],
];
