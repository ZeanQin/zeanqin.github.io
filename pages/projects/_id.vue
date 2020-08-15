<template>
  <div>Project: {{ id }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      id: this.$route.params.id,
    }
  },
})
</script>
