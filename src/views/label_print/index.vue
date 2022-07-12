<template lang="">
  <div>
    <redblue ref="redblue" />
    <query ref="query" />
  </div>
</template>

<script>
import redblue from '@/components/redblue'
import query from '@/components/query'
export default {
  name: `label_print`,
  components: { redblue, query },
  mounted() {
    const { needpop } = this.$route.meta
    if (needpop) {
      //this.$refs.redblue.open()
      //this.$refs.query.open()
    }
  }
}
</script>
<style lang="scss"></style>
