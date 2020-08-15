<template>
  <div>
    <home-banner />
    <b-container>
      <div v-for="article in articles" :key="article.slug" class="my-4">
        <div class="article-meta">
          {{ $moment(article.updatedAt).format('dddd, Do MMMM YYYY') }}
        </div>
        <nuxt-link
          class="h2 article-title my-3"
          :to="{ name: 'articles-id', params: { id: article.slug } }"
        >
          {{ article.title }}
        </nuxt-link>
        <p>{{ article.excerpt }}</p>
      </div>
    </b-container>
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
      .sortBy('updatedAt', 'desc')
      .only(['title', 'slug', 'updatedAt', 'excerpt'])
      .fetch()
    return { articles }
  },
})
</script>

<style lang="scss" scoped>
.article-meta {
  font-size: 0.8rem;
  color: grey;
}

.article-title {
  font-weight: 400 !important;
}
</style>
