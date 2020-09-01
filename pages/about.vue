<template>
  <div>
    <page-header title="About me" />
    <b-container class="py-4">
      <b-row>
        <b-col md="3" class="profile">
          <b-img
            :src="require('~/assets/images/general/profile_square.jpg')"
            rounded="circle"
            thumbnail
          />
        </b-col>
        <b-col>
          <p>
            Hello! I'm Zean Qin, a software engineer based in Melbourne,
            Australia.
          </p>
          <p>
            I love building things that live on the web, whether that be
            websites, applications, or anything in between.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '~/components/page-header.vue'

export default Vue.extend({
  layout: 'default',
  components: {
    'page-header': PageHeader,
  },
  head() {
    return {
      title: 'About Me - Zean Qin',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Full stack software developer who also loves machine learning.',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@media (max-width: 767.98px) {
  .profile {
    text-align: center;

    & img {
      width: 150px;
    }
  }
}
</style>
