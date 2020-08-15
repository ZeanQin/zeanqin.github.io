<template>
  <div class="search-wrapper w-100">
    <b-form-input
      ref="search"
      v-model="query"
      class="search"
      :class="[
        showAutosuggest
          ? 'shadow-sm border border-bottom-0 border-info bg-light rounded-bottom-0'
          : '',
      ]"
      type="search"
      autocomplete="off"
      placeholder="Type to search"
      @click="showAutosuggest = true"
    />

    <div
      v-if="showAutosuggest"
      v-closable="{
        exclude: ['search'],
        handler: 'onClose',
      }"
      class="auto-suggest"
      :class="[
        showAutosuggest
          ? 'shadow-sm border border-top-0 border-info bg-light rounded-bottom'
          : '',
      ]"
    >
      <div v-if="articles.length < 1" class="p-3">
        {{ query ? `Couldn't find anything.` : 'What are you looking for? ' }}
      </div>
      <b-row
        v-for="article of articles"
        v-else
        :key="article.slug"
        class="border-bottom p-3"
        no-gutters
      >
        <b-col cols="9">
          <nuxt-link
            :to="{ name: 'articles-id', params: { id: article.slug } }"
            class="d-flex flex-column"
          >
            <div class="font-weight-bold">{{ article.title }}</div>
            <div>{{ article.excerpt }}</div>
          </nuxt-link>
        </b-col>
        <b-col
          class="d-flex flex-column align-items-end justify-content-center"
        >
          <b-badge variant="primary">{{ article.category }}</b-badge>
          <div class="text-right">
            Updated:
            {{ $moment(article.updatedAt).format('D/M/YYYY') }}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      query: '',
      showAutosuggest: false,
      articles: [],
    }
  },
  watch: {
    async query(query) {
      if (!query) {
        this.articles = []
        return
      }

      this.articles = await this.$content('articles', {
        deep: true,
        text: false,
      })
        .search(query)
        .limit(5)
        .sortBy('updatedAt', 'desc')
        .only(['title', 'excerpt', 'slug', 'category', 'updatedAt'])
        .fetch()
    },
  },
  methods: {
    onClose() {
      this.showAutosuggest = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
@import 'node_modules/bootstrap/scss/bootstrap';

.search-wrapper {
  position: relative !important;

  & .search {
    background-color: $gray-100;

    &::-webkit-search-cancel-button {
      /* Remove default */
      -webkit-appearance: none;

      /* Now your own custom styles */
      cursor: pointer;
      height: 20px;
      width: 20px;
      background-image: url('~assets/images/general/times.svg');
      background-repeat: no-repeat;
      background-position: right;
    }
  }

  & .auto-suggest {
    position: absolute;
    top: 37px;
    left: 0;
    right: 0;

    & a {
      color: $gray-900;
    }

    & .row:hover {
      background-color: $gray-200;
    }
  }
}

@media (min-width: 992px) {
  .search-wrapper {
    & .search {
      width: 600px;
    }
  }
}
</style>
