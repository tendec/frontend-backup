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

      <v-spacer></v-spacer>

      <v-btn to="/">
        <span>Login</span>
      </v-btn>
      <v-btn to="/register">
        <span>Register</span>
      </v-btn>
      <v-btn>
        <span>Language</span>
      </v-btn>
    </v-app-bar>

    <v-card>
      <v-form ref="form">
        <v-card-title>Login</v-card-title>
        <v-text-field
          type="email"
          label="Email *"
          v-model="email"
          :rules="[rules.requiredEmail]"
          :error-messages="
            invalidEmail ? 'These credentials do not match our records.' : ''
          "
        ></v-text-field>
        <v-text-field
          label="Password *"
          v-model="password"
          :append-icon="!eye ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="toggleEye"
          :type="!eye ? 'text' : 'password'"
          :rules="[rules.requiredPassword]"
          :error-messages="invalidPassword ? 'The password is incorrect.' : ''"
        ></v-text-field>
        <v-checkbox label="Remember Me"></v-checkbox>
      </v-form>
      <v-btn @click="loginBtnClick"><span>LOGIN</span></v-btn>
    </v-card>

    <v-img
      alt="Masking Icon"
      class="shrink mr-2"
      contain
      src="../assets/pic/insight-tec.png"
      transition="scale-transition"
      width="250"
    />
    <span>Copyright © 2020 Insight Technology Inc.</span>
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
          this.password = "";
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
