<template>
  <div>
    <page-header title="Search Test" />
    <b-container class="py-4"> <search /></b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Search from '~/components/global/search.vue'
export default Vue.extend({
  layout: 'default',
  components: {
    search: Search,
  },
})
</script>
