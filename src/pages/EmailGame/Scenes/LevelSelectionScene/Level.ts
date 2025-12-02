import type Sprite from "../../Sprites/Sprite";
import type { ButtonReference } from "../EmailScene/Buttons";
import type { EmailData } from "../EmailScene/EmailData";

// Dados de nível do jogo
export type Level = {
  name: string; // Nome do nível
  goal: number; // Pontuação nescessária para compltar o nível
  secondsTimer: number; // Segundos para o limíte de tempo do nível
  reference: string; // Texto de referência do nível
  emailDataList: EmailData[]; // Lista de dados de emails do nível
  starterEmail?: EmailData; // dados do email inicial do nível
  buttons: ButtonReference[]; // lista de referências dos botões usados no nível
  canSelect: boolean; // Indica se a função de selecionar elementos está habilitada no nível
  notepadPages?: (Sprite | string)[]; // Lista de sprites e textos para o caderno do nível
};
