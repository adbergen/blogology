<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  methods: {
    handleAuthStateChanged() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log(user.uid);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
    mounted() {
      this.handleAuthStateChanged();
    }
  }
};
</script>
