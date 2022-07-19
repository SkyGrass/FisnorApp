<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
    <van-picker
      show-toolbar
      title="选择入库方式"
      :columns="columns"
      :default-index="defaulIndex"
      @cancel="cancel"
      @confirm="select"
    />
  </van-popup>
</template>
<script>
export default {
  name: `rd`,
  props: {
    source: {
      type: Array,
      default() {
        return []
      }
    },
    defaulIndex: Number
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    columns() {
      return this.$props.source.map(m => {
        return `${m.cRdCode}||${m.cRdName}`
      })
    }
  },
  watch: {
    show(newV, oldV) {
      if (!newV) {
        this.$emit('cancel')
      }
    }
  },
  methods: {
    open() {
      this.show = true
    },
    dismiss() {
      this.show = false
    },
    cancel() {
      this.$emit('cancel')
      this.show = false
    },
    select(value, index) {
      this.$emit('choose', this.$props.source[index])
      this.show = false
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
