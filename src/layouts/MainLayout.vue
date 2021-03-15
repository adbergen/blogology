<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm"> {{ $route.name }} </span>
          <q-icon
            class="q-pa-md lt-md header-icon"
            name="fas fa-dna"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>
        <q-btn @click="logout" color="primary" label="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" :width="283" bordered>
      <q-icon class="q-pa-md" name="fas fa-dna" size="lg" color="primary" />

      <q-list>
        <q-item to="/home" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="psychology" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="login" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Login/Register</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
       <News :apiKey="apiKey" />
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "firebase";
import News from "../components/News"
require('dotenv').config
console.log("HERE IT IS", process.env.VUE_APP_APIKEY)
export default {
  data() {
    return {
      left: false,
      right: false,
      isLoggedIn: false,
      currentUser: false,
      apiKey: process.env.VUE_APP_APIKEY
    };
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push("/");
      });
    }
  },
  components: {
    News
  }
};
</script>

<style lang="sass">
.header-icon
  postion: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
