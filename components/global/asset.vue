<template>
  <div
    :style="{ display: newline ? 'block' : 'inline' }"
    :class="newline ? ['d-flex', 'justify-content-center'] : ''"
  >
    <b-img
      v-if="isImage"
      :alt="name"
      :src="require(`~/assets/images/${src}`)"
      fluid
      rounded
      @load="onImageLoad"
    />
    <b-link v-else :href="`/${src}`" target="_blank">{{ name }}</b-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mediumZoom from 'medium-zoom'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    newline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isImage() {
      return !!this.src.match(/.(jpg|jpeg|png|gif)$/i)
    },
  },
  methods: {
    onImageLoad(event: any) {
      mediumZoom(event.target, { background: '#FFFFFFF2' })
    },
  },
})
</script>
