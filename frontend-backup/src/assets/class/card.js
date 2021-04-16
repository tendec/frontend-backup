export default class Card {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.code =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
  }
}
