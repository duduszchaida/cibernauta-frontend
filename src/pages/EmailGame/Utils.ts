export const Utils = {
  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  },

  randomArrayId(arr: any[]): number {
    return this.randomInt(0, arr.length);
  },
};
