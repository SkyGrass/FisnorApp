<template lang="">
  <div class="container">
    <van-form @submit="onSubmit" label-width="30px">
      <div class="top">
        <van-field
          clearable
          v-model="keyword"
          name="keyword"
          label="条件"
          ref="keyword"
          :readonly="readonly"
          placeholder="扫描或输入关键词回车查询"
          @keyup.enter="onSubmit"
        />
      </div>
      <div class="bottom">
        <van-row>
          <van-col span="12">
            <van-field
              label="开始"
              name="dBeginDate"
              is-link
              placeholder="选择开始时间"
              :value="startDateStr"
              input-align="right"
              @click="show1 = true"
              readonly
            />
          </van-col>
          <van-col span="12">
            <van-field
              label="结束"
              name="dEndDate"
              is-link
              placeholder="选择结束时间"
              :value="endDateStr"
              input-align="right"
              @click="show2 = true"
              readonly
            />
          </van-col>
        </van-row>
        <div class="list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <listitem v-for="(item, index) in list" :key="item.ID" :source="item" @choose="onChoose" />
          </van-list>
        </div>
      </div>
    </van-form>
    <!-- <van-calendar v-model="show1" /> -->
    <!-- <van-calendar v-model="show2" @confirm="onConfirm2" /> -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="form.dBeginDate"
        type="date"
        title="选择年月日"
        @confirm="onConfirm1"
        @cancel="show1 = false"
      />
    </van-popup>
    <van-popup v-model="show2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="form.dEndDate"
        type="date"
        title="选择年月日"
        @confirm="onConfirm2"
        @cancel="show2 = false"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import listitem from './listitem'
import { keyboard } from '@/mixins/keyboard'
import { getPuArrivalHead } from '@/api/pap'
export default {
  name: `pap`,
  components: { listitem },
  mixins: [keyboard],
  data() {
    return {
      keyword: '',
      form: { dBeginDate: '', dEndDate: '' },
      maxDate: new Date(),
      show1: false,
      show2: false,
      list: [],
      loading: false,
      finished: false,
      readonly: false
    }
  },
  computed: {
    startDateStr() {
      if (this.form.dBeginDate == '' || this.form.dBeginDate == null) return ''
      return this.formatDate(this.form.dBeginDate)
    },
    endDateStr() {
      if (this.form.dEndDate == '' || this.form.dEndDate == null) return ''
      return this.formatDate(this.form.dEndDate)
    }
  },
  watch: {
    show1(newV, oldV) {
      if (newV) {
        if (this.form.dBeginDate == '' || this.form.dBeginDate == null) {
          this.form.dBeginDate = new dayjs().toDate()
        }
      }
    },
    show2(newV, oldV) {
      if (newV) {
        if (this.form.dEndDate == '' || this.form.dEndDate == null) {
          this.form.dEndDate = new dayjs().toDate()
        }
      }
    }
  },
  methods: {
    open() {},
    onLoad() {
      this.list = []
      getPuArrivalHead(
        Object.assign(
          {},
          { dBeginDate: this.startDateStr, dEndDate: this.endDateStr, FRob: 1 },
          {
            cFilter: this.keyword == '' ? '' : JSON.stringify({ cCode: this.keyword })
          }
        )
      )
        .then(({ Data }) => {
          this.list = Data
        })
        .catch(err => {})
      this.loading = false
      this.finished = true
    },
    onSubmit() {
      this.onLoad()
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    onConfirm1(date) {
      this.show1 = false
      this.onLoad()
    },
    onConfirm2(date) {
      this.show2 = false
      this.onLoad()
    },
    onChoose(row) {
      this.$router.push({
        name: 'pap_form',
        query: row
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.keyword != void 0) {
        this.$refs.keyword.focus()
        if (window.android) {
          android.HideSoftKeyboard()
        }
        setTimeout(() => {
          if (window.android) {
            android.HideSoftKeyboard()
          }
        }, 100)
      }
    })
  },
  activated() {
    const scrollTop = this.$route.meta.scrollTop
    const $content = document.querySelector('.list')
    if (scrollTop && $content) {
      $content.scrollTop = scrollTop
    }
  }
}
</script>
<style lang="scss">
.container {
  height: 100vh;
  .bottom {
    .list {
      height: calc(100vh - 90px);
      overflow: scroll;
    }
  }
}
</style>
