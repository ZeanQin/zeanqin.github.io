<template>
  <article-detail :article="article" />
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('drafts', params.id).fetch()
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
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
}
</script>
