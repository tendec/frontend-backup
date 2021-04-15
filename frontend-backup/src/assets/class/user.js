export default class User {
  constructor(username, email, password, cards) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cards = cards;
  }
  checkUser(email, password) {
    if (this.email == email && this.password == password) {
      return true;
    } else {
      return false;
    }
  }
}
