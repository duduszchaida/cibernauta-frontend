import ScrollBar from "../../Elements/ScrollBar.ts";
import Position from "../../Position.ts";
import EmailPicture from "./EmailPicture.ts";
import EmailContent, { CONTENT } from "./EmailContent.ts";
import { type EmailData } from "./EmailData.ts";
import { PICTURE } from "./EmailPicture.ts";
import type { Evaluation } from "./Evaluation.ts";
import EmailTextElement, { ADDRESS, NAME } from "./EmailTextElement.ts";

// Dicionário de seleção de anomalias, para cada referência de um elemento, guarda se ele foi selecionado como anomalia
export type AnomalySelection = Record<string, boolean>;

// Gerencia a interação do jogador com um email
export default class EmailInterface {
  emailData!: EmailData; // Dados do email atual
  emailContent!: EmailContent; // Conteúdo do email atual
  anomalies!: AnomalySelection; // Dicionário de quais elementos do email atual são anomalias
  anomalyParagraphs!: number[]; // Parágrafos do email atual que contém anomalia
  scrollBar: ScrollBar | null = null; // Objeto de barra de scroll
  selectedAnomalies: AnomalySelection = {
    name: false,
    content: false,
    address: false,
    picture: false,
  }; // Anomalias selecionadas pelo usuário
  [PICTURE]!: EmailPicture; // Elemento de foto de perfil do email
  [ADDRESS]!: EmailTextElement; // Elemento de endereço do email
  [NAME]!: EmailTextElement; // Elemento de nome do email

  constructor(data: EmailData) {
    this.newData(data);
  }

  /**
   * Com um dado EmailData atualiza os elementos e propriedades relacionadas ao email atual
   * @param data
   */
  newData(data: EmailData) {
    this.emailData = data;
    this.emailContent = new EmailContent(this.emailData.text);
    this[PICTURE] = new EmailPicture({
      pos: new Position(8, 8),
      height: 32,
      width: 32,
      anomaly: true,
      spriteName: data.picture,
    });
    this[NAME] = new EmailTextElement({
      pos: new Position(44, 10),
      font: "wcp",
      color: "brown",
      text: data.name,
      reference: NAME,
      anomaly: false,
    });
    this[ADDRESS] = new EmailTextElement({
      pos: new Position(44, 28),
      font: "minecraftia",
      color: "light_brown",
      text: data.address,
      reference: ADDRESS,
      anomaly: false,
    });
    if (this.emailContent.needsScroll) {
      this.scrollBar = new ScrollBar(
        this.emailContent.textHeight,
        this.emailContent.scrollShiftAmmount,
      );
    } else {
      this.scrollBar = null;
    }
    this.anomalies = {
      name: data.anomalyName ?? false,
      address: data.anomalyAddress ?? false,
      picture: data.anomalyPicture ?? false,
      content: (data.anomalyParagraphs ?? []).length > 0,
    };
    this.anomalyParagraphs = data.anomalyParagraphs ?? [];
  }

  /**
   * Verifica se o parágrafo selecionado possúi uma anomalía
   * @returns
   */
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
    return null;
  }

  /**
   * Altera estado de selecionado de um elemento de email a partir de uma dada referência
   * @param reference
   */
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

  /**
   * Atualiza qual o parágrafo selecionado do conteúdo do email atual dado um index de parágrafo
   * @param paragraphId
   */
  selectParagraph(paragraphId: number) {
    if (this.emailContent.selectedParagraph != paragraphId) {
      this.emailContent.selectedParagraph = paragraphId;
    } else {
      this.emailContent.selectedParagraph = null;
    }
  }

  /**
   * Executa a função de scroll do email e da bara de scroll com um dado numero
   * @param scroll
   */
  scrollEmail(scroll: number) {
    this.emailContent.scroll(scroll);
    this.scrollBar?.scroll(scroll);
  }

  /**
   * Executa a função de scrollTo do email e da bara de scroll com uma dada altura
   * @param height
   */
  scrollEmailTo(height: number) {
    this.emailContent.scrollTo(height);
    this.scrollBar?.scrollTo(height);
  }

  /**
   * Compara a seleção de anomalias com as anomalias do email atual e retorna um Evaluation a partir delas e uma dada classificação
   * @param classification
   * @returns
   */
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
