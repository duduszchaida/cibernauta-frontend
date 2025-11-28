import { findSprite } from "../../FindSprite";
import { MALICIOUS, SAFE, SPAM } from "../EmailScene/EmailData";
import * as EmailList from "../EmailScene/EmailList";
import { NOTEPAD } from "../EmailScene/Notepad";
import type { Level } from "./Level";

// Referências de níveis
export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const ELEMENTSLEVEL = "elementsLevel";
export const NOTEPADLEVEL = "notepadLevel";
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
      EmailList.mailClassMal1,
      EmailList.mailClassMal2,
      EmailList.mailClassMal3,
      EmailList.mailClassSafe1,
      EmailList.mailClassSafe2,
    ],
    reference: TUTORIALLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialClass,
    canSelect: false,
    secondsTimer: 180,
  },
  [ELEMENTSLEVEL]: {
    name: "Elementos de email",
    goal: 1500,
    emailDataList: [
      EmailList.mailElementsMal1,
      EmailList.mailElementsMal2,
      EmailList.mailElementsMal3,
      EmailList.mailElementsMal4,
      EmailList.mailElementsSafe1,
      EmailList.mailElementsSafe2,
      EmailList.mailSafeGrandma1,
    ],
    reference: ELEMENTSLEVEL,
    buttons: [SAFE, MALICIOUS],
    starterEmail: EmailList.mailTutorialElements,
    canSelect: true,
    secondsTimer: 180,
    notepadPages: [
      findSprite("page_tutorial"),
      findSprite("page_section_address"),
      "cibernauta@mail.com",
    ],
  },
  [NOTEPADLEVEL]: {
    name: "Teste do caderno",
    goal: 2500,
    emailDataList: [],
    reference: NOTEPADLEVEL,
    buttons: [SAFE, MALICIOUS, NOTEPAD],
    starterEmail: EmailList.mailTutorialTest,
    canSelect: true,
    secondsTimer: 180,
    notepadPages: [
      findSprite("page_tutorial"),
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
  // LevelList[NOTEPADLEVEL],
  LevelList[TESTLEVEL],
];
