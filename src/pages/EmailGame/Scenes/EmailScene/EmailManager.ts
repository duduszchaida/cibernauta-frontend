import ScrollBar from "../../Elements/ScrollBar";
import Position from "../../Position";
import EmailComponent from "./EmailComponent";
import EmailContent from "./EmailContent";
import type { Evaluation } from "./EmailScene";
import EmailTextComponent from "./EmailTextComponent";

// Email anomaly references
export const CONTENT = "content";
export const ADDRESS = "address";
export const NAME = "name";
export const PICTURE = "picture";
export const SAFE = "safe";
export const MALICIOUS = "malicious";
export const SPAM = "spam";
export type AnomalyList = Record<string, boolean | undefined>;

export type EmailData = {
  text: string;
  address: string;
  name: string;
  picture: string;
  class: typeof SAFE | typeof MALICIOUS | typeof SPAM;
  key: string;
  anomalyContent?: boolean;
  anomalyAddress?: boolean;
  anomalyName?: boolean;
  anomalyPicture?: boolean;
  anomalyParagraphs?: number[];
};

export default class EmailManager {
  emailData!: EmailData;
  emailContent!: EmailContent;
  anomalies!: AnomalyList;
  anomalyParagraphs!: number[];
  scrollBar: ScrollBar | null = null;
  selectedAnomalies: AnomalyList = {
    name: undefined,
    content: undefined,
    address: undefined,
    picture: undefined,
  };
  [PICTURE]!: EmailComponent;
  [ADDRESS]!: EmailTextComponent;
  [NAME]!: EmailTextComponent;

  constructor(data: EmailData) {
    this.newData(data);
  }

  newData(data: EmailData) {
    this.emailData = data;
    this.emailContent = new EmailContent(this.emailData.text);
    this[PICTURE] = new EmailComponent({
      pos: new Position(8, 8),
      height: 32,
      width: 32,
      anomaly: true,
      reference: PICTURE,
      spriteName: data.picture,
    });
    this[NAME] = new EmailTextComponent({
      pos: new Position(44, 10),
      font: "wcp",
      color: "brown",
      text: data.name,
      reference: NAME,
      anomaly: false,
    });
    this[ADDRESS] = new EmailTextComponent({
      pos: new Position(44, 28),
      font: "minecraftia",
      color: "light_brown",
      text: data.address,
      reference: ADDRESS,
      anomaly: false,
    });
    if (this.emailContent.hasScroll) {
      this.scrollBar = new ScrollBar(
        this.emailContent.textHeight,
        this.emailContent.scrollShiftAmmount,
      );
    } else {
      this.scrollBar = null;
    }
    this.anomalies = {
      name: data.anomalyName,
      content: data.anomalyContent,
      address: data.anomalyAddress,
      picture: data.anomalyPicture,
    };
    this.anomalyParagraphs = data.anomalyParagraphs ?? [];
  }

  paragraphCheck() {
    if (this.emailContent.selectedParagraph != null) {
      if (
        this.anomalyParagraphs.includes(this.emailContent.selectedParagraph)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.anomalyParagraphs.length == 0) {
      return null;
    }
    return false;
  }

  selectAnomaly(reference: string) {
    if (this[PICTURE].reference == reference) {
      this[PICTURE].selected = !this[PICTURE].selected;
    }
    if (this[ADDRESS].reference == reference) {
      this[ADDRESS].selected = !this[ADDRESS].selected;
    }
    if (this[NAME].reference == reference) {
      this[NAME].selected = !this[NAME].selected;
    }
    this.selectedAnomalies[reference] = !this.selectedAnomalies[reference];
  }

  selectParagraph(paragraphId: number) {
    if (this.emailContent.selectedParagraph != paragraphId) {
      this.emailContent.selectedParagraph = paragraphId;
    } else {
      this.emailContent.selectedParagraph = null;
    }
  }

  scrollEmail(scroll: number) {
    this.emailContent.scroll(scroll);
    this.scrollBar?.scroll(scroll);
  }

  scrollEmailTo(scroll: number) {
    this.emailContent.scrollTo(scroll);
    this.scrollBar?.scrollTo(scroll);
  }

  evaluate(classification: string): Evaluation {
    const result: Evaluation = {
      [ADDRESS]: null,
      [PICTURE]: null,
      [NAME]: null,
      [CONTENT]: null,
      class: false,
    };

    const keys: (keyof Evaluation)[] = [ADDRESS, PICTURE, NAME];

    keys.forEach((k) => {
      if (this.anomalies[k]) {
        if (this.selectedAnomalies[k]) {
          result[k] = true;
        }
      } else {
        if (this.selectedAnomalies[k]) {
          result[k] = false;
        } else {
          result[k] = null;
        }
      }
    });
    result.content = this.paragraphCheck();
    result.class = classification == this.emailData.class;
    return result;
  }
}
