<template>
  <v-container>
    <v-btn @click="logoutBtnClick"><span>Logout</span></v-btn>
    <h1>Main page</h1>
  </v-container>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  methods: {
    logoutBtnClick() {
      this.$store.state.activeUser = null;
      this.$store.commit("saveData");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
