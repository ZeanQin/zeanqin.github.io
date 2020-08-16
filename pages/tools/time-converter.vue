<template>
  <div>
    <page-header title="Time converter" />
    <b-container class="py-4">
      <div class="mb-3">
        A tool to convert a DateTime between local and ISO format.
      </div>
      <b-table-simple
        hover
        responsive
        stripped
        fixed
        borderless
        class="text-center"
        :style="{ 'min-height': '700px' }"
      >
        <b-thead class="bg-faded-primary text-primary">
          <b-tr>
            <b-th></b-th>
            <b-th colspan="2">Local Date/Date Time</b-th>
            <b-th colspan="2">ISO Format</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-th>Now</b-th>
            <b-td colspan="2">{{ localNow }}</b-td>
            <b-td colspan="2">{{ ISONow }}</b-td>
          </b-tr>
          <b-tr>
            <b-th>Custom</b-th>
            <b-td colspan="2">
              <b-form-datepicker v-model="localDate"></b-form-datepicker>
            </b-td>
            <b-td colspan="2">
              {{
                localDate
                  ? $moment(localDate).toISOString()
                  : 'Pick a date on the left'
              }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
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
  data() {
    return {
      localNow: '',
      ISONow: '',
      localDate: '',
    }
  },
  mounted() {
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime() {
      const now = this.$moment()

      this.localNow = now.toString()
      this.ISONow = now.toISOString()
    },
  },
})
</script>

<style lang="scss" scoped>
th,
td {
  vertical-align: middle;
}
</style>
