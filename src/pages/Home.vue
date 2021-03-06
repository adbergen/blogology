<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newPostContent"
            label="What's Happening?"
            counter
            autogrow
            maxlength="280"
            class="new-post"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://en.gravatar.com/userimage/202821422/a87e067304889e88293c27db83cba1e3.jpeg"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewPost"
            class="q-mb-lg"
            unelevated
            rounded
            no-caps
            :disable="!newPostContent"
            color="primary"
            label="Post"
          />
        </div>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item class="post q-py-md" v-for="post in posts" :key="post.id">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://en.gravatar.com/userimage/202821422/a87e067304889e88293c27db83cba1e3.jpeg"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Anthony Bergen</strong>
                <span class="text-grey-7">
                  @bergenphysique <br class="lt-md" />&bull;
                  {{ post.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="post-content text-body1"
                >{{ post.content }}
              </q-item-label>
              <div class="row justify-between q-mt-sm post-icons">
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />
                <q-btn
                  @click="toggleLiked(post)"
                  :color="post.liked ? 'pink' : 'grey'"
                  :icon="post.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="deletePost(post)"
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { formatDistance } from "date-fns";

export default {
  name: "PageIndex",
  data() {
    return {
      newPostContent: "",
      posts: [
        // {
        //   id: "ID1",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eadistinctio dolore dolorem? Nostrum explicabo deserunt repudiandae,id earum pariatur. Eum aliquid autem modi architecto in labore dignissimos id quod? Incidunt!",
        //   date: 1615051570957,
        //   liked: false
        // },
        // {
        //   id: "ID2",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eadistinctio dolore dolorem? Nostrum explicabo deserunt repudiandae,id earum pariatur. Eum aliquid autem modi architecto in labore dignissimos id quod? Incidunt!",
        //   date: 1615051570957,
        //   liked: true
        // }
      ]
    };
  },
  methods: {
    addNewPost() {
      let newPost = {
        content: this.newPostContent,
        date: Date.now(),
        liked: false
      };
      // this.posts.unshift(newPost);
      // Add a new document with a generated id.
      db.collection("posts")
        .add(newPost)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      this.newPostContent = "";
    },
    deletePost(post) {
      db.collection("posts")
        .doc(post.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(post) {
      db.collection("posts")
        .doc(post.id)
        .update({
          liked: !post.liked
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  mounted() {
    db.collection("posts")
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let postChange = change.doc.data();
          postChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New post: ", postChange);
            this.posts.unshift(postChange);
          }
          if (change.type === "modified") {
            console.log("Modified post: ", postChange);
            let index = this.posts.findIndex(post => post.id === postChange.id);
            Object.assign(this.posts[index], postChange);
          }
          if (change.type === "removed") {
            console.log("Removed post: ", postChange);
            let index = this.posts.findIndex(post => post.id === postChange.id);
            this.posts.splice(index, 1);
          }
        });
      });
  }
};
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
