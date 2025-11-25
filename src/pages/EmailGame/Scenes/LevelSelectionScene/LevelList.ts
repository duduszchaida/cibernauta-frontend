import * as EmailList from "../EmailScene/EmailList";
import {
  MALICIOUS,
  SAFE,
  SPAM,
  type EmailData,
} from "../EmailScene/EmailManager";
import type { Level } from "./Level";

export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const TESTLEVEL = "testLevel";

const allMail: EmailData[] = [];

(Object.keys(EmailList) as Array<keyof typeof EmailList>).forEach((k) => {
  allMail.push(EmailList[k]);
});

export const LevelList: Record<string, Level> = {
  [CONTROLSLEVEL]: {
    name: "Aprendendo os Controles",
    goal: 200,
    emailDataList: [],
    reference: CONTROLSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialControls,
    canInspect: false,
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
  },
  [TESTLEVEL]: {
    name: "Fase com todos os emails",
    goal: 10000,
    emailDataList: [...allMail],
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS, SPAM],
    canInspect: false,
  },
};

export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
  LevelList[TESTLEVEL],
];
