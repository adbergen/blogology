<template>
  <q-page>
    <div class="q-py-lg q-px-md">
      <q-input
        bottom-slots
        v-model="newContent"
        label="What's Happening?"
        counter
        autogrow
        maxlength="280"
        class="new-content"
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>

        <template v-slot:after>
          <q-btn
            unelevated
            rounded
            no-caps
            :disable="!newContent"
            color="primary"
            label="Publicize"
          />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      newContent: ""
    };
  }
};
</script>

<style lang="sass">
.new-content
  textarea
    font-size: 19px
    line-height: 1.4 !important
</style>
