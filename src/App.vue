<template>
  <div id="app">
    <div class="app-container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>

      <redblue ref="redblue" />
    </div>
  </div>
</template>
<script>
import redblue from '@/components/redblue'
export default {
  name: 'App',
  components: { redblue },
  data() {
    return {
      duration: { enter: 300, leave: 1000 },
      transitionName: 'van-slide-right',
      isForbidden: true
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  watch: {},
  methods: {},
  created() {
    let { query } = this.$route
    if (Object.keys(query).length < 2) {
      query = MyLStorage.get('model')
    }
    this.$store.dispatch('setModel', query)
    this.isForbidden = Object.keys(query).length <= 0
  },
  mounted() {}
}
</script>
<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
}
.van-enter-active-class,
.van-leave-active-class {
  transition-property: background-color, transform;
}

.van-enter-class,
.van-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
</style>
