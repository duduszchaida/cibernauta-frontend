import { PICTURE } from "./EmailPicture";
import { ADDRESS, NAME } from "./EmailTextElement";
import type { CONTENT } from "./EmailContent";

// Avaliação de e-mail
// Representa se cada elemento foi selecionado/classificado corretamente
// true = acerto
// false = erro
// null = nulo
export type Evaluation = {
  [PICTURE]: boolean | null;
  [ADDRESS]: boolean | null;
  [NAME]: boolean | null;
  [CONTENT]: boolean | null;
  class: boolean | null;
};
