<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap"
      rel="stylesheet"
    />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),
  created() {
    this.$store.commit("loadData");
    if (this.$store.state.activeUser !== null) {
      this.$router.push({ name: "Main" });
    }
  },
};
</script>

<style>
html, body {
  overflow-y: hidden !important;
}
* {
  font-family: "Noto Serif JP", serif;
}
.card-title {
  background-color: rgba(211, 211, 211, 0.5);
  border-bottom: 1px solid lightgray;
}
.page-input {
  margin: 0 88px 0 88px;
}
.button-function {
  color: white !important;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  height: 100%;
  background-color: lightgray;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 5px;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>
