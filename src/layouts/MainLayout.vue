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

      <div class="q-pa-md absolute-bottom">
        <q-btn v-if="uid">
          <q-avatar class="absolute-left q-mt-xs q-ml-xs" size="xl">
            <img
              src="https://en.gravatar.com/userimage/202821422/a87e067304889e88293c27db83cba1e3.jpeg"
            />
          </q-avatar>
          <strong>Anthony Bergen</strong>
          <span> {{ username }} <br class="lt-md" /></span>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="mobileData" label="Dark Mode" />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img
                    src="https://en.gravatar.com/userimage/202821422/a87e067304889e88293c27db83cba1e3.jpeg"
                  />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">Anthony Bergen</div>
                <q-btn class="q-mb-xs"
                  color="primary"
                  label="Edit Profile"
                  push
                  size="sm"
                  @click="editProfile"
                  v-close-popup
                />
                <q-break />
                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  @click="logout"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
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
import News from "../components/News";
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      left: false,
      right: false,
      isLoggedIn: false,
      apiKey: process.env.VUE_APP_APIKEY,
      mobileData: true,
      bluetooth: false,
      username: null,
      uid: this.$store.state.auth.uid,
    };
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
    editProfile: function () {
     this.$router.push("edit-profile")
    }
  },
  components: {
    News,
  },
  created () {
    var user = firebase.auth().currentUser;
  this.email = user.email;
  this.username = "@" + this.email.split('@')[0]
 // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
},
computed: {
    ...mapGetters('user', ['currentUser']),
  },
  }
</script>

<style lang="sass">
.header-icon
  postion: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
