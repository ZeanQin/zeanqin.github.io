<template>
  <b-container>
    <div v-for="article in articles" :key="article.slug" class="my-4">
      <div class="article-meta">
        {{ $moment(article.updatedAt).format('dddd, Do MMMM YYYY') }}
      </div>
      <nuxt-link
        class="h2 article-title my-3"
        :to="{
          name: showingDrafts ? 'drafts-id' : 'articles-id',
          params: { id: article.slug },
        }"
      >
        {{ article.title }}
      </nuxt-link>
      <p>{{ article.excerpt }}</p>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    articles: {
      type: Array,
      required: true,
    },
    showingDrafts: {
      type: Boolean,
      default: false,
    },
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
