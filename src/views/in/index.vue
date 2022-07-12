<template lang="">
  <div>{{ JSON.stringify(this.$route.query) }}</div>
</template>

<script>
import redblue from '@/components/redblue'
import query from '@/components/query'
import { getWarehouse } from '@/api/base'
export default {
  name: `in`,
  components: { redblue, query },
  mounted() {
    // const resp = await getWarehouse({})
    // console.log(resp)
  }
}
</script>
<style lang="scss"></style>
