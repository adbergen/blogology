<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newPost"
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
          class="q-mb-lg"
          unelevated
          rounded
          no-caps
          :disable="!newPost"
          color="primary"
          label="Publicize"
        />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />
    <q-list>
      <q-item class="q-py-md">
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
            <span class="text-grey-7"> @bergenphysique</span>
          </q-item-label>
          <q-item-label class="post-content text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
            distinctio dolore dolorem? Nostrum explicabo deserunt repudiandae,
            id earum pariatur. Eum aliquid autem modi architecto in labore
            dignissimos id quod? Incidunt!
          </q-item-label>
          <div class="row justify-between q-mt-sm post-icons">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      newPost: ""
    };
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
.post-content
  white-space: pre-line
.post-icons
  margin-left: -5px
</style>
