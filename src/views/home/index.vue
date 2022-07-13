<template>
  <div style="padding: 5px">
    <van-grid :gutter="10" clickable :column-num="3">
      <van-grid-item class="grid" v-for="menu in menus" :key="menu.id" @click="redirect(menu)">
        <van-image width="64" height="64" fit="cover" :src="menu.icon" />
        <p>{{ menu.label }}</p>
      </van-grid-item>
    </van-grid>
    <div class="footer">
      <van-row>
        <van-col class="item" span="12"
          ><div>登录人：{{ model.loginName }}</div></van-col
        >
        <van-col class="item" span="12"
          ><div>账套时间：{{ model.accountDate }}</div></van-col
        >
      </van-row>
      <van-row>
        <van-col class="item" span="12"
          ><div>当前账套：{{ model.accountName }}</div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/api/home'
import redblue from '@/components/redblue'
import { mapGetters } from 'vuex'
export default {
  name: `home`,
  components: { redblue },
  data() {
    return {
      list: [
        { id: 'a', icon: 'icon_list.png', label: '入库标签打印', path: 'pap' },
        { id: 'b', icon: 'icon_list.png', label: '采购入库', path: 'in' },
        { id: 'c', icon: 'icon_list.png', label: '仓库调拨[参照申请]', path: 'transfer' },
        { id: 'd', icon: 'icon_list.png', label: '产成品入库', path: 'pin' },
        { id: 'e', icon: 'icon_list.png', label: '销售发货', path: 'sout' },
        { id: 'f', icon: 'icon_list.png', label: '标签拆箱', path: '' },
        { id: 'g', icon: 'icon_list.png', label: '磨具查询', path: 'q1' },
        { id: 'h', icon: 'icon_list.png', label: '库存查询', path: 'q2' }
      ]
    }
  },
  computed: {
    model() {
      return this.$store.getters.model
    },
    menus() {
      return this.list.map(m => {
        m.icon = require('../../../static/' + m.icon)
        return m
      })
    }
  },
  methods: {
    redirect({ path }) {
      this.$router.push({
        path: path,
        query: {
          t: new Date() * 1
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.grid {
  ::v-deep .van-grid-item__content {
    background-color: inherit;
  }
  ::v-deep .van-grid-item__content:after {
    border: none;
  }
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 5px;
  font-size: 15px;
}
</style>
