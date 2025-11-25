import type { EmailData } from "../EmailScene/EmailManager";

export type Level = {
  name: string;
  goal: number;
  reference: string;
  emailDataList: EmailData[];
  starterEmail?: EmailData;
  buttons: string[];
  canInspect: boolean;
};
