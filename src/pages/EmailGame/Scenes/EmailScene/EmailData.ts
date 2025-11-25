export const SAFE = "safe";
export const MALICIOUS = "malicious";
export const SPAM = "spam";

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
