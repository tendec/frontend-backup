<template>
  <v-container>
    <v-app-bar app color="white" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Masking Icon"
          class="shrink mr-2"
          contain
          src="../assets/pic/masking-icon.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Masking Title"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          src="../assets/pic/masking-title.png"
          width="250"
        />
      </div>
      <v-btn to="/register">
        <span>Project</span>
      </v-btn>
      <v-btn to="/register">
        <span>Template</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn>
        <span>Help</span>
      </v-btn>
      <v-hover v-slot="{ hover }">
        <div class="d-flex flex-column">
          <div style="background: black">
            {{ username }}
            <v-icon>mdi-account</v-icon>
          </div>
          <v-scroll-y-transition>
            <v-btn v-if="hover"> <span>Profile</span> </v-btn>
          </v-scroll-y-transition>
          <v-scroll-y-transition>
            <v-btn v-if="hover" @click="logoutBtnClick">
              <span>Logout</span>
            </v-btn>
          </v-scroll-y-transition>
        </div>
      </v-hover>
      <v-btn>
        <span>Language</span>
      </v-btn>
    </v-app-bar>

    <v-card>
      <v-text-field
        placeholder="Project name"
        counter="100"
        v-model="name"
      ></v-text-field>
      <v-text-field
        placeholder="Project Description"
        counter="500"
        outlined
        no-resize
        v-model="description"
      ></v-text-field>
      <v-btn @click="resetInputValue">CANCEL</v-btn>
      <v-btn @click="createBtnClick">CREATE</v-btn>
    </v-card>

    <div v-if="cardsLength > 3">
      <span>Recent Projects</span>
      <hr />
      <div class="d-flex">
        <card v-for="card in cardsRecent" :key="card.code" :data="card" />
      </div>
    </div>
    <div>
      <span>All Projects</span>
      <hr />
      <div class="d-flex">
        <card v-for="card in cards" :key="card.code" :data="card" />
      </div>
      <span v-if="!cardsLength">Project not found!</span>
    </div>
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
      return cards.slice(cards.length - 3, cards.length)
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
