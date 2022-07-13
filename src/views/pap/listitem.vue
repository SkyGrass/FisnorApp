<template>
  <ul style="padding: 5px; font-size: 14px" class="van-hairline--bottom" @click="handlerClick">
    <li style="padding: 2px">日期：{{ source.dDate }}</li>
    <li style="padding: 2px">单号：{{ source.cCode }}</li>
    <li style="padding: 2px">供应商：{{ source.cVenCode }}||{{ source.cVenName }}</li>
    <li style="padding: 2px">备注：{{ source.cMemo }}</li>
  </ul>
</template>
<script>
export default {
  name: `listitem`,
  props: {
    source: {
      type: Object
    }
  },
  methods: {
    handlerClick(e) {
      this.$emit('choose', this.$props.source)
    }
  }
}
</script>
<style lang=""></style>
