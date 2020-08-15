<template>
  <nav class="section-nav">
    <ol>
      <li
        v-for="link of toc"
        :key="link.id"
        :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
      >
        <a :href="`#${link.id}`">{{ link.text }}</a>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      // see https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (entry.intersectionRatio > 0) {
            document
              ?.querySelector(`.section-nav li a[href="#${id}"]`)
              ?.parentElement?.classList.add('active')
          } else {
            document
              ?.querySelector(`.section-nav li a[href="#${id}"]`)
              ?.parentElement?.classList.remove('active')
          }
        })
      })

      // Track all sections that have an `id` applied
      document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
        observer.observe(section)
      })
    })
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';

.section-nav {
  /* Sidebar Navigation */
  padding-left: 0;
  border-left: 1px solid $gray-200;

  & a {
    text-decoration: none;
    display: block;
    padding: 0.125rem 0;
    color: #ccc;
    transition: all 50ms ease-in-out; /* 💡 This small transition makes setting of the active state smooth */

    &:hover,
    &:focus {
      color: #666;
    }
  }

  /* ScrollSpy active styles */
  & li.active > a {
    color: $gray-900;
    font-weight: 500;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    &.toc2 {
      margin-left: 1rem;
    }
    &.toc3 {
      margin-left: 1.8rem;
    }
  }
}
</style>
