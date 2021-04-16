<template>
  <v-card>
    <div class="d-flex">
      <v-card-title>{{ data.name }}</v-card-title>
      <v-icon @click="copyCard">mdi-content-copy</v-icon>
    </div>
    <v-card-subtitle>{{ data.code }}</v-card-subtitle>
    <v-card-text>@{{ data.description }}@</v-card-text>
    <v-btn @click="deleteCard">DELETE</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          name: "",
          description: "",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    copyCard() {
      let cards = this.$store.state.activeUser.cards;
      let code = this.data.code;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].code == code) {
          this.$store.commit("addNewCard", cards[i].name, cards[i].description);
          this.$store.commit("saveData");
        }
      }
    },
    deleteCard() {
      let cards = this.$store.state.activeUser.cards;
      let code = this.data.code;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].code == code) {
          cards.splice(i, 1);
          this.$store.commit("saveData");
        }
      }
    },
  },
};
</script>
