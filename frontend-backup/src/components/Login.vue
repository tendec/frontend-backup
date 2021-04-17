<template>
  <v-container>
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

      <v-spacer></v-spacer>

      <v-btn to="/" plain class="text-capitalize button-navbar">
        <span>Login</span>
      </v-btn>
      <v-btn to="/register" plain class="text-capitalize button-navbar">
        <span>Register</span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            plain
            v-bind="attrs"
            v-on="on"
            class="text-capitalize button-navbar"
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
      <v-card class="mt-15 mb-12" width="600px" elevation="3">
        <v-form ref="form">
          <v-card-title class="pa-5 card-title">Login</v-card-title>
          <v-text-field
            type="email"
            label="Email *"
            v-model="email"
            :rules="[rules.requiredEmail]"
            :error-messages="
              invalidEmail ? 'These credentials do not match our records.' : ''
            "
            class="mt-8 page-input"
            validate-on-blur
          ></v-text-field>
          <v-text-field
            label="Password *"
            v-model="password"
            :append-icon="!eye ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEye"
            :type="!eye ? 'text' : 'password'"
            :rules="[rules.requiredPassword]"
            :error-messages="
              invalidPassword ? 'The password is incorrect.' : ''
            "
            class="page-input"
            ref="password"
            validate-on-blur
          ></v-text-field>
          <v-checkbox label="Remember Me" class="page-input mt-2"></v-checkbox>
        </v-form>
        <v-btn
          @click="loginBtnClick"
          class="page-input mt-2 mb-8 button-function"
          color="blue"
          ><span>LOGIN</span></v-btn
        >
      </v-card>

      <v-img
        alt="Masking Icon"
        class="shrink mt-16"
        contain
        src="../assets/pic/insight-tec.png"
        transition="scale-transition"
        width="200"
      />
      <span class="font-italic text-caption text--secondary"
        >Copyright © 2020 Insight Technology Inc.</span
      >
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      eye: true,
      invalidEmail: false,
      invalidPassword: false,
      rules: {
        requiredEmail: (value) =>
          !!value || "The e-mail address field is required.",
        requiredPassword: (value) =>
          !!value || "The password field is required.",
      },
    };
  },
  methods: {
    loginBtnClick() {
      if (this.$refs.form.validate()) {
        let users = this.$store.state.users;
        let emails = users.map((user) => user.email);
        let index = emails.indexOf(this.email);
        let passwords = users.map((user) => user.password);
        if (index == -1) {
          this.invalidEmail = true;
          this.$refs.password.reset();
        } else {
          if (passwords[index] !== this.password) {
            this.invalidPassword = true;
            this.password = "";
          } else {
            this.$store.commit("setActiveUser", users[index]);
            this.$store.commit("saveData");
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.$router.push({ name: "Main" });
          }
        }
      }
    },
    toggleEye() {
      this.eye = !this.eye;
    },
  },
};
</script>

<style scoped>
.button-navbar:hover {
  background-color: rgba(211, 211, 211, 0.3);
  color: blue;
}
</style>
