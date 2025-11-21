import EmailContent from "./EmailContent";

// Email anomaly references
export const CONTENT = "content";
export const ADDRESS = "address";
export const NAME = "name";
export const PICTURE = "picture";
export const SAFE = "safe";
export const MALICIOUS = "malicious";
export const SPAM = "spam";
export type AnomalyList = Record<string, boolean>;

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

export default class Email {
  emailContent: EmailContent;
  senderAddress: string;
  senderName: string;
  picture: string;
  anomalies: AnomalyList;
  anomalyParagraphs: number[];
  class: typeof SAFE | typeof MALICIOUS | typeof SPAM;

  constructor(args: EmailData) {
    this.emailContent = new EmailContent({
      text: args.text,
    });
    this.senderAddress = args.address;
    this.senderName = args.name;
    this.picture = args.picture;
    this.class = args.class;
    this.anomalies = {
      name: args.anomalyName ?? false,
      content: args.anomalyContent ?? false,
      address: args.anomalyAddress ?? false,
      picture: args.anomalyPicture ?? false,
    };
    this.anomalyParagraphs = args.anomalyParagraphs ?? [];
  }

  paragraphCheck() {
    if (this.emailContent.selectedParagraph != null) {
      if (
        this.anomalyParagraphs.includes(this.emailContent.selectedParagraph)
      ) {
        return true;
      }
    } else if (this.anomalyParagraphs.length == 0) {
      return true;
    }
    return false;
  }
}
