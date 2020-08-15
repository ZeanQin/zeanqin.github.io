<template>
  <div class="banner py-4 py-lg-5">
    <b-container>
      <b-row class="align-items-center">
        <b-col cols="12" sm="4" lg="3" class="profile">
          <b-img
            :src="require('~/assets/images/general/profile_square.jpg')"
            rounded="circle"
            thumbnail
          />
        </b-col>
        <b-col>
          <h2
            :style="{ color: '#FFF' }"
            class="text-center mb-2 mb-sm-3 mb-lg-4"
          >
            Zean Qin
          </h2>
          <div class="d-flex flex-wrap justify-content-center">
            <b-button variant="transparent-primary" class="m-1" disabled>
              <font-awesome-icon :icon="['far', 'file-pdf']" />
              Resume
            </b-button>
            <b-button
              variant="transparent-success"
              class="m-1"
              href="mailto:me@zean.be"
            >
              <font-awesome-icon :icon="['far', 'envelope']" />
              Email
            </b-button>
            <b-button
              variant="transparent-warning"
              class="m-1"
              href="https://github.com/ZeanQin"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              GitHub
            </b-button>
            <b-button
              variant="transparent-danger"
              class="m-1"
              href="https://www.linkedin.com/in/zeanqin"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
              LinkedIn
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomeBanner',
})
</script>

<style lang="scss" scoped>
.banner {
  background: url('~assets/images/general/home_banner.jpg') center center/cover;
}

@media (max-width: 575.98px) {
  .profile {
    text-align: center;

    & img {
      width: 150px;
    }
  }
}
</style>
