export const SAFE = "safe";
export const MALICIOUS = "malicious";
export const SPAM = "spam";

// Dados dos emails
export type EmailData = {
  text: string; // Texto do conteúdo
  address: string; // Endereço de quem enviou
  name: string; // Nome de quem enviou
  picture: string; // Nome do sprite usado para a imagem de perfil
  class: typeof SAFE | typeof MALICIOUS | typeof SPAM; // Classificação do email
  anomalyAddress?: boolean; // Identifica se o enderço é uma anomalia
  anomalyName?: boolean; // Identifica se o nome é uma anomalia
  anomalyPicture?: boolean; // Identifica se a imagem de perfil é uma anomalia
  anomalyParagraphs?: number[]; // Lista de quais parágrafos são anomalias
};
