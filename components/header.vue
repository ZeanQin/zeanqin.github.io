<template>
  <b-navbar toggleable="lg" variant="light" sticky class="shadow-sm">
    <b-container>
      <b-navbar-brand type="dark" class="px-2 rounded">
        <nuxt-link :to="{ name: 'index' }">
          <span>ZEAN</span>
          <span class="font-weight-bold">QIN</span>
        </nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <template v-slot:default="{ expanded }">
          <font-awesome-icon v-if="expanded" :icon="['fas', 'bars']" />
          <font-awesome-icon v-else :icon="['fas', 'bars']" />
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'about' }">
            About
          </b-nav-item>
          <b-nav-item :to="{ name: 'projects' }">
            Projects
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" align="right">
          <search />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Header',
})
</script>
