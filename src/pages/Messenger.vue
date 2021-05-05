<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
        
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          'doing fine, how r you?',
          'I just feel like typing a really, really, REALLY long message to annoy you...'
        ]"
        size="12"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['Did it work?']"
        stamp="1 minutes ago"
        size="12"
        text-color="white"
        bg-color="primary"
      />
    </div>
  </div>
</template>

<script>
import db from "src/services/firebase/database";
import { formatDistance } from "date-fns";
import firebase from "firebase"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "PageIndex",
  data() {
    return {
      newPostContent: null,
      posts: [
      ],
      uid: null,
      postedBy: null,
    };
  },
  methods: {
    addNewPost() {
      let newPost = {
        content: this.newPostContent,
        date: Date.now(),
        liked: false,
        reposted: false,
        uid: this.$store.state.auth.uid,
        postedBy: this.username
      };
      // this.posts.unshift(newPost);
      // Add a new document with a generated id.
      db.collection("posts")
        .add(newPost)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      this.newPostContent = null;
    },
    deletePost(post) {
      db.collection("posts")
        .doc(post.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(post) {
      db.collection("posts")
        .doc(post.id)
        .update({
          liked: !post.liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    toggleReposted(post) {
      db.collection("posts")
        .doc(post.id)
        .update({
          reposted: !post.reposted,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
  mounted() {
    db.collection("posts")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        
        snapshot.docChanges().forEach((change) => {
          let postChange = change.doc.data();
          postChange.id = change.doc.id;
          
          if (change.type === "added") {
            console.log("New post: ", postChange);
            this.posts.unshift(postChange);
          }
          if (change.type === "modified") {
            console.log("Modified post: ", postChange);
            let index = this.posts.findIndex(
              (post) => post.id === postChange.id
            );
            Object.assign(this.posts[index], postChange);
          }
          if (change.type === "removed") {
            console.log("Removed post: ", postChange);
            let index = this.posts.findIndex(
              (post) => post.id === postChange.id
            );
            this.posts.splice(index, 1);
          }
        });
      });
  },
  created () {
    console.log('FIREBASE AUTH USER uid', this.$store.state.auth.uid)
    var user = firebase.auth().currentUser;
  this.email = user.email;
  this.username = "@" + this.$store.state.auth.email.split('@')[0]
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
.new-post
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.post:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.post-content
  white-space: pre-line
.post-icons
  margin-left: -5px
</style>
