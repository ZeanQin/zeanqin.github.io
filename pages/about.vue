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
            I work in tech. When learning new things, I always find that
            researching a particular topic leads me to another topic which then
            leads me to other topics. And it's hard to track them all. The main
            purpose of the site is to build such a knowledge network to help me
            remembering things. I also put some of my practices, such as .vmrc,
            manuals such as setting up apache servers etc on the site. Together,
            I use this site to build my own knowledge graph.
          </p>

          <p>
            In addition, it contains my resume and portofolios.
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
