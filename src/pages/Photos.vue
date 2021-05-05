<template>
  <div class="q-pa-md">
    <q-btn
      push
      color="teal"
      label="Trigger"
      @click="trigger"
      class="q-mb-md"
    />

    <div class="q-gutter-md row items-start">

      <!-- notice "basic" prop (which disables default animation) -->
      <q-img
        :src="url"
        style="width: 150px"
        :ratio="1"
        basic
        spinner-color="white"
        class="rounded-borders"
      >
        <div class="absolute-bottom text-center text-italic text-body2">
          None
        </div>
      </q-img>

      <q-img
        v-for="transition in transitions"
        :key="transition"
        :transition="transition"
        :src="url"
        style="width: 150px"
        ratio="1"
        spinner-color="white"
        class="rounded-borders"
      >
        <div class="absolute-bottom text-center text-body2">
          {{ transition }}
        </div>
      </q-img>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://placeimg.com/500/300/nature',
      transitions: [
        'slide-right',
        'slide-left',
        'slide-up',
        'slide-down',
        'fade',
        'scale',
        'rotate',
        'flip-right',
        'flip-left',
        'flip-up',
        'flip-down',
        'jump-right',
        'jump-left',
        'jump-up',
        'jump-down'
      ]
    }
  },

  methods: {
    trigger () {
      this.url = 'https://placeimg.com/500/300/nature?t=' + Math.random()
    }
  }
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
