<template>
  <div>
    <page-header title="Drafts" />
    <article-list :articles="articles" :showing-drafts="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  layout: 'default',
  async asyncData({ $content }: Context) {
    const articles = await $content('drafts')
      .sortBy('createdAt', 'desc')
      .only(['title', 'slug', 'createdAt', 'excerpt'])
      .fetch()
    return { articles }
  },
  head() {
    return {
      title: 'Drafts - Zean Qin',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'List of drafts that are in progress and will be published soon.',
        },
      ],
    }
  },
})
</script>
