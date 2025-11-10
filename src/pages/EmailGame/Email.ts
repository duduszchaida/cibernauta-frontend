import EmailContent from "./Elements/EmailContent";

export default class Email {
  emailContent: EmailContent;
  senderAddress: string;
  senderName: string;
  picture: string;
  constructor(args: {
    text: string;
    address: string;
    name: string;
    picture: string;
  }) {
    this.emailContent = new EmailContent({
      text: args.text,
    });
    this.senderAddress = args.address;
    this.senderName = args.name;
    this.picture = args.picture;
  }
}
