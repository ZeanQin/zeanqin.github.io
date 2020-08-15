<template>
  <div>
    <app-header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/header.vue'

export default Vue.extend({
  components: {
    'app-header': Header,
  },
})
</script>
