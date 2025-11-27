const logDict: Record<string, any> = {};
export const Utils = {

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  },

  randomArrayId(arr: any[]): number {
    return this.randomInt(0, arr.length);
  },

  numberFormat(score: number, housesLeft: number = 0): string {
    let negative = false;
    if (score < 0) {
      negative = true;
      score = score * -1;
    }
    if (housesLeft == 0) {
      housesLeft = score.toString().length;
    }
    let thousands = Math.floor(score / 1000).toString();
    if (housesLeft - 3 > 0) {
      while (thousands.length < housesLeft - 3) {
        thousands = "0" + thousands;
      }
      thousands += ".";
    } else {
      thousands = "";
    }
    housesLeft -= Math.max(0, housesLeft - 3);
    let hundreds = (score % 1000).toString();
    while (hundreds.length < housesLeft) {
      hundreds = "0" + hundreds;
    }
    return (negative ? "-" : "") + thousands + hundreds;
  },

  isStringArray(value: unknown): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  },

  logOnce(thing: any){
    let str = thing.toString();
    if (logDict[str]){
      return;
    }
    logDict[str] = true;
    console.log(thing);
  }
};
