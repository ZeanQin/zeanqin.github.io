<template>
  <div>
    <page-header :title="article.title" />
    <b-container class="py-3">
      <b-row>
        <b-col cols="12" sm="9">
          <nuxt-content :document="article" />
        </b-col>
        <b-col>
          <toc :toc="article.toc" class="toc d-none d-sm-block" />
        </b-col>
      </b-row>

      <!-- prev/next links -->
      <b-row v-if="prev || next" class="border-top align-items-center py-3">
        <b-col>
          <nuxt-link
            v-if="prev"
            class="h5 d-flex align-items-center"
            :to="{
              name: published ? 'articles-id' : 'drafts-id',
              params: { id: prev.slug },
            }"
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'chevron-left']" />
            {{ prev.title }}
          </nuxt-link>
        </b-col>
        <b-col>
          <nuxt-link
            v-if="next"
            class="h5 d-flex align-items-center justify-content-end"
            :to="{
              name: published ? 'articles-id' : 'drafts-id',
              params: { id: next.slug },
            }"
          >
            {{ next.title }}
            <font-awesome-icon class="ml-2" :icon="['fas', 'chevron-right']" />
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Result } from '@nuxt/content/types'
import PageHeader from '~/components/page-header.vue'
export default Vue.extend({
  components: {
    'page-header': PageHeader,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prev: {} as Result,
      next: {} as Result,
    }
  },
  watch: {
    'article.slug': {
      immediate: true,
      handler() {
        this.$content(this.published ? 'articles' : 'drafts')
          .only(['title', 'slug'])
          .sortBy('updatedAt', 'asc')
          .surround(this.article.slug)
          .fetch()
          .then(([prev, next]) => {
            this.prev = prev as Result
            this.next = next as Result
          })
      },
    },
  },
})
</script>

<style lang="scss">
.nuxt-content {
  & h2::before,
  & h3::before {
    display: block;
    content: ' ';
    margin-top: -60px;
    height: 60px;
    visibility: hidden;
    pointer-events: none;
  }
}

.toc {
  position: sticky;
  top: 4rem;
  align-self: start;
}
</style>
