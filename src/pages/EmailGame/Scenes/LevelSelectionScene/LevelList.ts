import * as EmailList from "../EmailScene/EmailList";
import { MALICIOUS, SAFE, SPAM } from "../EmailScene/EmailManager";
import type { Level } from "./Level";

export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
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
  [TESTLEVEL]: {
    name: "Fase com todos os emails",
    goal: 10000,
    emailDataList: [...EmailList.nonTutorials],
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS, SPAM],
    canInspect: false,
    secondsTimer: 300,
  },
};

export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
  LevelList[TESTLEVEL],
];
