<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        lg="4"
        class="py-4 d-flex align-items-center justify-content-center"
      >
        <b-img
          :src="require(`~/assets/images/projects/${imageName}`)"
          fluid
          thumbnail
        />
      </b-col>
      <b-col
        class="border-bottom py-4 d-flex flex-column justify-content-center align-items-start"
      >
        <div class="h4 my-2">{{ title }}</div>
        <div class="font-italic my-2">{{ date }}</div>
        <div class="my-2">
          <span class="font-weight-bold">Summary</span>
          <slot name="summary">
            {{ summary }}
          </slot>
        </div>
        <div class="my-2">
          <b-button
            variant="translucent-success"
            :href="reportUrl"
            target="_blank"
          >
            <font-awesome-icon :icon="['far', 'file-pdf']" />
            Final Report
          </b-button>
          <b-button
            v-if="codeUrl"
            variant="translucent-info"
            :href="codeUrl"
            target="_blank"
          >
            <font-awesome-icon :icon="['fas', 'code']" />
            Source Code
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProjectSummary',
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: '',
    },
    reportUrl: {
      type: String,
      required: true,
    },
    codeUrl: {
      type: String,
      default: '',
    },
    imageName: {
      type: String,
      required: true,
    },
  },
})
</script>
