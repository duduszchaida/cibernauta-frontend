import { findSprite } from "../../FindSprite";
import { MALICIOUS, SAFE, SPAM } from "../EmailScene/EmailData";
import * as EmailList from "../EmailScene/EmailList";
import { NOTEPAD } from "../EmailScene/Notepad";
import type { Level } from "./Level";

// Referências de níveis
export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const ELEMENTSLEVEL = "elementsLevel";
export const TESTLEVEL = "testLevel";

// Dicionário dos níveis com suas referências
export const LevelList: Record<string, Level> = {
  [CONTROLSLEVEL]: {
    name: "Aprendendo os Controles",
    goal: 200,
    emailDataList: [],
    reference: CONTROLSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialControls,
    canSelect: true,
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
    canSelect: false,
    secondsTimer: 180,
  },
  [ELEMENTSLEVEL]: {
    name: "Elementos de email",
    goal: 1,
    emailDataList: [],
    reference: ELEMENTSLEVEL,
    buttons: [SAFE, MALICIOUS, NOTEPAD],
    starterEmail: EmailList.mailTutorialElements,
    canSelect: true,
    secondsTimer: 180,
    notepadPages: [
      findSprite("page_tutorial"),
      "Neste caderno você vai encontrar todas as informações que precisa para identificar e classificar emails.",
      findSprite("page_section_address"),
      "cibernauta@mail.com",
    ],
  },

  // Debug
  [TESTLEVEL]: {
    name: "Fase com todos os emails",
    goal: 10000,
    emailDataList: [...EmailList.nonTutorials],
    starterEmail: EmailList.mailTutorialTest,
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS, SPAM],
    canSelect: false,
    secondsTimer: 300,
  },
};

// Ordem dos níveis no jogo
export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
  LevelList[ELEMENTSLEVEL],
  LevelList[TESTLEVEL],
];
