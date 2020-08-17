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
    </b-container>
  </div>
</template>

<script>
import PageHeader from '~/components/page-header.vue'
export default {
  components: {
    'page-header': PageHeader,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
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
