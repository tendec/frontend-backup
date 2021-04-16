export default class Card {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.code = Math.random();
  }
}
