<template>
  <div>
    <home-banner />
    <article-list :articles="articles" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import HomeBanner from '~/components/home-banner.vue'

export default Vue.extend({
  layout: 'default',
  components: {
    'home-banner': HomeBanner,
  },
  async asyncData({ $content }: Context) {
    const articles = await $content('articles')
      .sortBy('createdAt', 'desc')
      .only(['title', 'slug', 'createdAt', 'excerpt'])
      .fetch()
    return { articles }
  },
  head() {
    return {
      title: 'Home - Zean Qin',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Welcome to my website. I am a full stack software developer who also loves machine learning.',
        },
      ],
    }
  },
})
</script>
