<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      outlined
      v-model="formData.name"
      label="Name"/>
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.email"
      type="email"
      label="Email"/>
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.password"
      type="password"
      label="Password"/>
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" /></div
  ></q-form>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.tab == "login") {
        console.log("login the user");
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )

          .then(userCredential => {
            // Signed in
            var user = userCredential.user;
            alert(`You are logged in as ${user.email}`)
            console.log(userCredential);
            // ...
            this.$router.push("/home");
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
          });
      } else {
        console.log("register the user");
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then(userCredential => {
            // Signed in
            var user = userCredential.user;
            alert(`Account created for ${user.email}`)
            console.log(userCredential);
            // ...
            this.$router.push("/home");
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
            // ..
          });
      }
    }
  }
};
</script>
