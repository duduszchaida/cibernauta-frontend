import { findSprite } from "../../FindSprite";
import { MALICIOUS, SAFE, SPAM } from "../EmailScene/EmailData";
import * as EmailList from "../EmailScene/EmailList";
import { NOTEPAD } from "../EmailScene/Notepad";
import type { Level } from "./Level";

// Referências de níveis
export const CONTROLSLEVEL = "controlsLevel";
export const TUTORIALLEVEL = "tutorialLevel";
export const ELEMENTSLEVEL = "elementsLevel";
export const ADDRESSESLEVEL = "addressesLevel";
export const CONTACTSLEVEL = "contactsLevel";
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
    name: "Os quatro elementos",
    goal: 1500,
    emailDataList: [
      EmailList.mailElementsMal1,
      EmailList.mailElementsMal2,
      EmailList.mailElementsMal3,
      EmailList.mailElementsMal4,
      EmailList.mailElementsSafe1,
      EmailList.mailElementsSafe2,
      EmailList.mailSafeGrandma1,
      EmailList.mailElementsMal5,
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
  [ADDRESSESLEVEL]: {
    name: "Endereços",
    goal: 2000,
    emailDataList: [
      EmailList.mailSafeGrandma2,
      EmailList.mailAddressMal1,
      EmailList.mailAddressMal2,
      EmailList.mailAddressMal3,
      EmailList.mailAddressMal4,
      EmailList.mailAddressSafe1,
      EmailList.mailAddressSafe2,
      EmailList.mailAddressSafe3,
      EmailList.mailGenMal1,
    ],
    reference: ADDRESSESLEVEL,
    buttons: [SAFE, MALICIOUS, NOTEPAD],
    starterEmail: EmailList.mailTutorialNotepad,
    canSelect: true,
    secondsTimer: 210,
    notepadPages: [
      findSprite("page_tutorial"),
      findSprite("page_section_address"),
      EmailList.addresses.grandma +
        "\n" +
        EmailList.addresses.cibernauta +
        "\n" +
        EmailList.addresses.choppu +
        "\n" +
        EmailList.addresses.fritter +
        "\n" +
        EmailList.addresses.rubloks +
        "\n" +
        EmailList.addresses.pineappleBook +
        "\n" +
        EmailList.addresses.catMusic,
      EmailList.addresses.tecnus + "\n" + EmailList.addresses.mail,
    ],
  },
  [CONTACTSLEVEL]: {
    name: "Contatos",
    goal: 2100,
    emailDataList: [
      EmailList.mailSafeGrandma2,
      EmailList.mailContactMal1,
      EmailList.mailContactMal2,
      EmailList.mailContactMal3,
      EmailList.mailContactMal4,
      EmailList.mailContactSpam1,
      EmailList.mailContactSpam2,
      EmailList.mailContactSpam3,
      EmailList.mailContactSpam4,
      EmailList.mailContactSafe1,
      EmailList.mailContactSafe2,
      EmailList.mailContactSafe3,
    ],
    reference: CONTACTSLEVEL,
    buttons: [SAFE, MALICIOUS, SPAM, NOTEPAD],
    starterEmail: EmailList.mailTutorialContact,
    canSelect: true,
    secondsTimer: 240,
    notepadPages: [
      findSprite("page_section_address"),
      EmailList.addresses.grandma +
        "\n" +
        EmailList.addresses.cibernauta +
        "\n" +
        EmailList.addresses.choppu +
        "\n" +
        EmailList.addresses.fritter +
        "\n" +
        EmailList.addresses.rubloks +
        "\n" +
        EmailList.addresses.pineappleBook +
        "\n" +
        EmailList.addresses.catMusic,
      EmailList.addresses.tecnus +
        "\n" +
        EmailList.addresses.mail +
        "\n" +
        EmailList.addresses.jitjot +
        "\n" +
        EmailList.addresses.yvideos,
      findSprite("page_section_contacts"),
      EmailList.names.catMusic +
        "\n" +
        EmailList.names.cibernauta +
        "\n" +
        EmailList.names.fritter +
        "\n" +
        EmailList.names.mail +
        "\n" +
        EmailList.names.grandma +
        "\n" +
        EmailList.names.tecnus,
    ],
  },
};

// Ordem dos níveis no jogo
export const levelOrder: Level[] = [
  LevelList[CONTROLSLEVEL],
  LevelList[TUTORIALLEVEL],
  LevelList[ELEMENTSLEVEL],
  LevelList[ADDRESSESLEVEL],
  LevelList[CONTACTSLEVEL],
];
