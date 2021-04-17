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
      <v-card class="mt-1 mb-12" width="600px" elevation="3">
        <v-form ref="form">
          <v-card-title class="pa-5 card-title">Register</v-card-title>
          <v-text-field
            type="text"
            label="Username *"
            v-model="username"
            :rules="[rules.requiredName]"
            :error-messages="
              takenUsername ? 'The name has already been taken.' : ''
            "
            class="mt-8 page-input"
            validate-on-blur
            @keyup.enter="registerBtnClick"
          ></v-text-field>
          <v-text-field
            type="email"
            label="Email *"
            v-model="email"
            :rules="[rules.requiredEmail, rules.validEmail]"
            :error-messages="
              takenEmail ? 'The e-mail address has already been taken.' : ''
            "
            class="page-input"
            validate-on-blur
            @keyup.enter="registerBtnClick"
          ></v-text-field>
          <v-text-field
            label="Password *"
            v-model="password"
            :append-icon="!eyePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEyePassword"
            :type="!eyePassword ? 'text' : 'password'"
            :rules="[
              rules.requiredPassword,
              rules.minLength,
              rules.validPassword,
              rules.matching(password, cfpassword),
            ]"
            class="page-input"
            validate-on-blur
            @keyup.enter="registerBtnClick"
          ></v-text-field>
          <v-text-field
            label="Confirm Password *"
            v-model="cfpassword"
            :append-icon="!eyeCfPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEyeCfPassword"
            :type="!eyeCfPassword ? 'text' : 'password'"
            class="page-input"
            validate-on-blur
            @keyup.enter="registerBtnClick"
          ></v-text-field>
        </v-form>
        <v-btn
          @click="registerBtnClick"
          class="page-input mt-5 mb-8 button-function"
          color="blue"
          ><span>REGISTER</span></v-btn
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
import User from "../assets/class/user.js";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      cfpassword: "",
      eyePassword: true,
      eyeCfPassword: true,
      takenUsername: false,
      takenEmail: false,
      rules: {
        requiredName: (value) => !!value || "The name field is required.",
        requiredEmail: (value) =>
          !!value || "The e-mail address field is required.",
        validEmail: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "The e-mail address format is invalid.",
        requiredPassword: (value) =>
          !!value || "The password field is required.",
        validPassword: (value) =>
          /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(value) ||
          "Your password must contain at least one uppercase or lowercase letter, number digit and special character: @$!%*?&",
        minLength: (value) =>
          (value || "").length >= 8 ||
          "The password must be at least 8 characters.",
        matching: (value1, value2) =>
          value1 === value2 || "The password confirmation does not match.",
      },
    };
  },
  methods: {
    registerBtnClick() {
      if (this.$refs.form.validate()) {
        let user = new User(this.username, this.email, this.password, []);
        this.$store.commit("addNewUser", user);
        this.$store.commit("setActiveUser", user);
        this.$store.commit("saveData");
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        this.$router.push({ name: "Main" });
      }
    },
    checkUsername() {
      let users = this.$store.state.users;
      let usernames = users.map((user) => user.username);
      if (usernames.includes(this.username)) {
        this.takenUsername = true;
      }
    },
    checkEmail() {
      let users = this.$store.state.users;
      let emails = users.map((user) => user.email);
      if (emails.includes(this.email)) {
        this.takenEmail = true;
      }
    },
    toggleEyePassword() {
      this.eyePassword = !this.eyePassword;
    },
    toggleEyeCfPassword() {
      this.eyeCfPassword = !this.eyeCfPassword;
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
