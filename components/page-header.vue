<template>
  <div
    class="d-flex align-items-center justify-content-center title bg-gradient"
  >
    <span class="h2 text text-center text-light">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.title {
  height: 100px;
}
</style>
