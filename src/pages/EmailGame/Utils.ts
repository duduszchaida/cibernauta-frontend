const logDict: Record<string, any> = {};

// Um objeto com funcções genêricas
export const Utils = {
  /**
   * Retorna um Id aleatório de um dado array
   * @param arr
   * @returns
   */
  randomArrayId(arr: any[]): number {
    return Math.floor(Math.random() * arr.length);
  },

  /**
   * Formata um dado número de acordo com a quantidade dada de casas à direita, até 6 casas
   * @param number
   * @param housesLeft
   * @returns
   */
  numberFormat(number: number, housesLeft: number = 0): string {
    let negative = false;
    if (number < 0) {
      negative = true;
      number = number * -1;
    }
    if (housesLeft == 0) {
      housesLeft = number.toString().length;
    }
    let thousands = Math.floor(number / 1000).toString();
    if (housesLeft - 3 > 0) {
      while (thousands.length < housesLeft - 3) {
        thousands = "0" + thousands;
      }
      thousands += ".";
    } else {
      thousands = "";
    }
    housesLeft -= Math.max(0, housesLeft - 3);
    let hundreds = (number % 1000).toString();
    while (hundreds.length < housesLeft) {
      hundreds = "0" + hundreds;
    }
    return (negative ? "-" : "") + thousands + hundreds;
  },

  /**
   * Faz o log de dado objeto no console apenas uma vez
   * @param thing
   * @returns
   */
  logOnce(thing: any) {
    let str = thing.toString();
    if (logDict[str]) {
      return;
    }
    logDict[str] = true;
    console.log(thing);
  },
};
