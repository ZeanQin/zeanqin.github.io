<template>
  <article-detail :article="article" :published="true" />
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.id).fetch()
    return { article }
  },
  head() {
    return {
      title: `${this.article.title} - Zean Qin`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.excerpt ?? this.article.title,
        },
      ],
    }
  },
}
</script>
