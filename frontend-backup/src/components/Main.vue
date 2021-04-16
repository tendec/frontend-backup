<template>
  <v-container class="container">
    <v-app-bar app color="white" height="88px">
      <div class="d-flex align-center">
        <v-img
          alt="Masking Icon"
          class="shrink mr-2"
          contain
          src="../assets/pic/masking-icon.png"
          transition="scale-transition"
          width="50"
        />

        <v-img
          alt="Masking Title"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          src="../assets/pic/masking-title.png"
          width="300"
        />
      </div>
      <v-btn
        to="/main"
        plain
        class="text-capitalize button-navbar"
        color="black"
      >
        <span>Projects</span>
      </v-btn>
      <v-btn
        to="/main"
        plain
        class="text-capitalize button-navbar"
        color="black"
      >
        <span>Templates</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="black"
            class="button-navbar"
            x-large
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Help</span>
      </v-tooltip>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="info-user button-navbar">
            {{ username }}
            <v-icon color="black" large>mdi-account-circle</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text class="button-navbar"><span>Profile</span></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text class="button-navbar" @click="logoutBtnClick">
              <span>Logout</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            plain
            v-bind="attrs"
            v-on="on"
            class="text-capitalize button-navbar"
            color="black"
          >
            Language
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <span>English</span>
          </v-list-item>
          <v-list-item>
            <span>日本語</span>
          </v-list-item>
          <v-list-item>
            <span>Tiếng Việt</span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-container class="d-flex flex-column align-center">
      <v-card class="mt-7 mb-5" width="600px" elevation="3">
        <v-text-field
          placeholder="Project name"
          counter="100"
          v-model="name"
          class="ml-5 mr-5"
        ></v-text-field>
        <v-textarea
          placeholder="Project Description"
          counter="500"
          outlined
          no-resize
          v-model="description"
          class="ml-5 mr-5"
          height="125px"
        ></v-textarea>
        <div class="d-flex justify-center mb-5">
          <v-btn text @click="resetInputValue">CANCEL</v-btn>
          <v-btn color="blue" class="button-function" @click="createBtnClick">CREATE</v-btn>
        </div>
      </v-card>
    </v-container>

    <v-card v-if="cardsLength > 3" flat class="ml-7 mr-7 mb-10">
      <v-card-subtitle class="pl-0 pb-1">Recent</v-card-subtitle>
      <hr />
      <div class="d-flex">
        <card v-for="card in cardsRecent" :key="card.code" :data="card" />
      </div>
    </v-card>
    <v-card flat class="ml-7 mr-7">
      <v-card-subtitle class="pl-0 pb-1">All Projects</v-card-subtitle>
      <hr />
      <div class="d-flex mb-16">
        <card v-for="card in cards" :key="card.code" :data="card" />
      </div>
      <div class="d-flex justify-center text-subtitle-2">
        <span v-if="!cardsLength">Project not found!</span>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Main",
  data() {
    return {
      name: "",
      description: "",
    };
  },
  components: {
    Card,
  },
  computed: {
    username() {
      return this.$store.state.activeUser.username;
    },
    cards() {
      return this.$store.state.activeUser.cards;
    },
    cardsLength() {
      return this.$store.state.activeUser.cards.length;
    },
    cardsRecent() {
      let cards = this.$store.state.activeUser.cards;
      return cards.slice(cards.length - 3, cards.length);
    },
  },
  methods: {
    logoutBtnClick() {
      this.$store.state.activeUser = null;
      this.$store.commit("saveData");
      this.$router.push({ name: "Login" });
    },
    resetInputValue() {
      this.name = "";
      this.description = "";
    },
    createBtnClick() {
      this.$store.commit("addNewCard", this.name, this.description);
      this.name = "";
      this.description = "";
      this.$store.commit("saveData");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.button-navbar:hover {
  background-color: rgba(211, 211, 211, 0.3) !important;
  color: blue !important;
}
.info-user {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
  color: black;
}
</style>
