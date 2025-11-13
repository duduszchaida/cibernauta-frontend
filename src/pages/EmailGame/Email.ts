import EmailContent from "./Elements/EmailContent";

// Email anomaly references
export const CONTENT = "content";
export const ADDRESS = "address";
export const PICTURE = "picture";

export default class Email {
  emailContent: EmailContent;
  senderAddress: string;
  senderName: string;
  picture: string;
  anomalies: string[];

  constructor(args: {
    text: string;
    address: string;
    name: string;
    picture: string;
    anomalies?: string[];
  }) {
    this.emailContent = new EmailContent({
      text: args.text,
    });
    this.senderAddress = args.address;
    this.senderName = args.name;
    this.picture = args.picture;
    this.anomalies = args.anomalies ?? [];
  }
}
