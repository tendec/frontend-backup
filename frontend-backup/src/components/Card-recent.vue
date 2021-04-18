<template>
  <v-card class="mt-5 mr-7" width="260px" v-ripple>
    <div class="d-flex flex-column card-title">
      <div class="d-flex">
        <v-card-title class="text-subtitle-2 pb-0 card-name"
          ><strong>{{ data.name }}</strong></v-card-title
        >
        <!-- <v-dialog v-model="dialogCopy" persistent width="fit-content">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="ml-auto mr-5 mt-4"
              color="blue"
              v-bind="attrs"
              v-on="on"
              small
              >mdi-content-copy</v-icon
            >
          </template>
          <v-card>
            <v-card-title>Confirm</v-card-title>
            <v-card-text
              >Project <strong>{{ data.name }}</strong> is going to be copied.
              Do you want to continue?</v-card-text
            >
            <v-card-actions>
              <v-btn @click="dialogCopy = false" text class="ml-auto"
                >CANCEL</v-btn
              >
              <v-btn
                @click="
                  copyCard();
                  dialogCopy = false;
                "
                text
                color="blue"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </div>
      <v-card-subtitle class="pt-0 card-code">{{ data.code }}</v-card-subtitle>
    </div>
    <div class="d-flex flex-column">
      <v-card-text class="card-desciption">{{ data.description }}</v-card-text>
      <v-dialog v-model="dialogDelete" persistent width="fit-content">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            color="black"
            class="ml-auto mb-2 mr-3"
            v-bind="attrs"
            v-on="on"
            >DELETE</v-btn
          >
        </template>
        <v-card>
          <v-card-title>Confirm</v-card-title>
          <v-card-text
            >Project <strong>{{ data.name }}</strong> is going to be removed.
            Are you sure?</v-card-text
          >
          <v-card-actions>
            <v-btn @click="dialogDelete = false" text class="ml-auto"
              >CANCEL</v-btn
            >
            <v-btn
              @click="
                deleteCard();
                dialogDelete = false;
              "
              text
              color="blue"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
// import Card from "../assets/class/card.js";

export default {
  name: "CardRecentComponent",
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
    return {
      dialogCopy: false,
      dialogDelete: false,
    };
  },
  methods: {
    /* copyCard() {
      let cards = this.$store.state.activeUser.cards;
      let code = this.data.code;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].code == code) {
          let card = new Card("Copy of " + cards[i].name, cards[i].description);
          this.$store.commit("addNewCard", card);
          this.$store.commit("saveData");
          break;
        }
      }
    }, */
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

<style scoped>
.card-title {
  background-color: rgba(211, 211, 211, 0.3);
  height: 70px;
}
.card-name {
  display: inline-block;
  width: 222px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-code {
  font-size: 10px;
}
.card-desciption {
  width: 222px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
