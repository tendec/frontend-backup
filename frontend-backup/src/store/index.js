import Vue from "vue";
import Vuex from "vuex";
import User from "../assets/class/user.js";
import Card from "../assets/class/card.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    activeUser: null,
  },
  mutations: {
    saveData(state) {
      localStorage.setItem("coreData", JSON.stringify(state));
    },
    loadData(state) {
      let str = localStorage.getItem("coreData");
      if (str !== null) {
        let stateData = JSON.parse(str);
        for (let i = 0; i < stateData.users.length; i++) {
          let user = new User(
            stateData.users[i].username,
            stateData.users[i].email,
            stateData.users[i].password,
            stateData.users[i].cards
          );
          state.users.push(user);
          if (stateData.activeUser !== null) {
            if (
              user.checkUser(
                stateData.activeUser.email,
                stateData.activeUser.password
              )
            ) {
              state.activeUser = user;
            }
          }
        }
      }
    },
    addNewUser(state, user) {
      state.users.push(user);
    },
    setActiveUser(state, user) {
      state.activeUser = user;
    },
    addNewCard(state, name, description) {
      let card = new Card(name, description);
      state.activeUser.cards.push(card);
    },
  },
  actions: {},
  modules: {},
});
