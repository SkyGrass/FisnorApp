<template>
  <div class="container">
    <div class="header van-hairline--bottom">
      <van-form>
        <van-field
          class="item"
          v-model="headForm.cWhName"
          readonly
          name="cWhName"
          label="仓库"
          placeholder="请选择仓库"
          is-link
          @click="openWarehouse"
        />
        <van-field
          class="item"
          v-model="headForm.cRdName"
          readonly
          name="cRdName"
          label="出库方式"
          placeholder="请选择出库方式"
          is-link
          @click="openRd"
        />
        <van-field
          class="item"
          v-model="headForm.cDepName"
          readonly
          name="cDepName"
          label="部门"
          placeholder="请选择部门"
          is-link
          @click="openDeptpartment"
        />
        <van-field class="item" v-model="headForm.cMemo" name="cMemo" label="备注" placeholder="备注" />
      </van-form>
    </div>
    <van-tabs v-model="active" color="#008577">
      <van-tab title="扫描页">
        <div class="list0" id="list0">
          <div ref="postForm" class="postForm inputForm">
            <van-field
              type="text"
              name="cPosName"
              label="货位"
              ref="ele_cPosName"
              v-model="form.cPosName"
              autocomplete="off"
              placeholder="扫描或录入货位"
              v-show="control.usePos"
              id="ele_cPosName"
              @keyup.enter="queryPos"
            ></van-field>

            <van-field
              type="text"
              name="cBarcode"
              label="条码"
              ref="ele_cBarcode"
              v-model="form.cBarcode"
              autocomplete="off"
              placeholder="扫描或录入箱号条码"
              id="ele_cBarcode"
              @keyup.enter="queryInv"
            ></van-field>
            <van-field
              name="cBoxNO"
              label="箱号"
              ref="ele_cBoxNO"
              v-model="form.cBoxNO"
              readonly
              placeholder="箱号"
            ></van-field>
            <van-field
              name="cInvCode"
              label="存货编码"
              ref="ele_cInvCode"
              v-model="form.cInvCode"
              readonly
              placeholder="存货编码"
            ></van-field>
            <van-field
              name="cInvName"
              label="存货名称"
              ref="ele_cInvName"
              v-model="form.cInvName"
              readonly
              placeholder="存货名称"
            ></van-field>
            <van-field
              name="cInvStd"
              label="规格型号"
              ref="ele_cInvStd"
              v-model="form.cInvStd"
              readonly
              placeholder="规格型号"
            ></van-field>
            <van-field
              name="cComUnitName"
              label="单位"
              ref="ele_cComUnitName"
              v-model="form.cComUnitName"
              readonly
              placeholder="单位"
            ></van-field>
            <van-field
              name="cBatch"
              label="批号"
              ref="ele_cBatch"
              v-model="form.cBatch"
              v-show="showBatch"
              readonly
              placeholder="批号"
            ></van-field>
            <van-field
              name="iPlanQuantity"
              label="发货数量"
              ref="ele_iPlanQuantity"
              v-model="form.iPlanQuantity"
              placeholder="发货数量"
              readonly
            ></van-field>
            <van-field
              name="iCommitQuantity"
              label="已扫数量"
              ref="ele_iCommitQuantity"
              v-model="form.iCommitQuantity"
              placeholder="已扫数量"
              readonly
            ></van-field>
            <van-field
              name="iStockQuantity"
              label="库存数量"
              ref="ele_iStockQuantity"
              v-model="form.iStockQuantity"
              placeholder="库存数量"
              readonly
            ></van-field>
            <van-field
              type="number"
              name="iQuantity"
              label="数量"
              ref="ele_iQuantity"
              v-model="form.iQuantity"
              id="ele_iQuantity"
              readonly
            ></van-field>
          </div>
          <div class="btns">
            <van-button class="btn" size="small" @click="doClear">清空</van-button>
            <!-- <van-button
              class="btn"
              size="small"
              color="#008577"
              type="info"
              @click="inputQuantity"
              :disabled="forbiddenSub"
              >确定</van-button
            > -->
          </div>
        </div>
      </van-tab>
      <van-tab title="列表页">
        <div class="list1">
          <van-empty class="custom-image" description="没有记录" v-if="cacheList.length <= 0" />
          <van-list>
            <ul
              v-for="(item, index) in cacheList"
              :key="index"
              style="padding: 5px; font-size: 14px"
              class="van-hairline--bottom"
              @click="onDelete(index)"
            >
              <li style="padding: 2px">行号：{{ item.iRowno }}</li>
              <li style="padding: 2px">箱号{{ item.cBoxNO }}</li>
              <li style="padding: 2px">存货编码：{{ item.cInvCode }}</li>
              <li style="padding: 2px">存货名称：{{ item.cInvName }}</li>
              <li style="padding: 2px">规格型号：{{ item.cInvStd }}</li>
              <li style="padding: 2px; width: 80%; display: inline-flex; justify-content: space-between">
                <div>单位：{{ item.cComUnitName }}</div>
                <div>数量：{{ item.iQuantity }}</div>
              </li>
              <li style="padding: 2px; width: 80%; display: inline-flex; justify-content: space-between">
                <div>货位：{{ item.cPosName }}</div>
                <div>批号：{{ item.cBatch }}</div>
              </li>
            </ul>
            <van-submit-bar
              style="background-color: #e6e6e6"
              button-color="#008577"
              :disabled="cacheList.length <= 0"
              button-text="提交"
              @submit="onSave"
              :loading="submitLoading"
            />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="源单页">
        <div class="list">
          <ul style="padding: 5px; font-size: 14px">
            <li style="padding: 2px">日期：{{ queryForm.dDate }}</li>
            <li style="padding: 2px">单号：{{ queryForm.cCode }}</li>
            <li style="padding: 2px">客户：{{ queryForm.cCusCode }}||{{ queryForm.cCusName }}</li>
          </ul>
          <van-divider>明细</van-divider>
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <ul
              v-for="(item, index) in sourceList"
              :key="index"
              style="padding: 5px; font-size: 14px"
              class="van-hairline--bottom"
            >
              <li style="padding: 2px">行号：{{ item.iRowno }}</li>
              <li style="padding: 2px">存货编码：{{ item.cInvCode }}</li>
              <li style="padding: 2px">存货名称：{{ item.cInvName }}</li>
              <li style="padding: 2px">规格型号：{{ item.cInvStd }}</li>
              <li style="padding: 2px">单位：{{ item.cComUnitName }}</li>
              <li style="padding: 2px; width: 80%; display: inline-flex; justify-content: space-between">
                <div>批号：{{ item.cBatch }}</div>
                <div>数量：{{ item.iQuantity }}</div>
              </li>
            </ul>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <warehouse ref="warehouse" :source="sources.warehouseList" @choose="pickWarehouse" @cancel="cancelPicker" />
    <deptpartment
      ref="deptpartment"
      :source="sources.departmentList"
      @choose="pickDeptpartment"
      @cancel="cancelPicker"
    />
    <rd ref="rd" :source="sources.rdList" @choose="pickRd" @cancel="cancelPicker" />
    <input class="bottom" v-show="false" readonly />
  </div>
</template>
<script>
import { getDispatch, saveProStockOut } from '@/api/so'
import { newGuid, floatAdd, floatSub } from '@/utils'
import warehouse from '@/components/warehouse'
import deptpartment from '@/components/deptpartment'
import rd from '@/components/rd'
import { getWarehouse, getDepartment, getRdStyle, getPosition, getBox } from '@/api/base'
import dayjs from 'dayjs'
export default {
  name: `so_form`,
  components: { warehouse, deptpartment, rd },
  data() {
    this.confirm = 0
    return {
      active: 0,
      queryForm: {},
      headForm: {
        cWhCode: '',
        cWhName: '',

        cRdCode: '',
        cRdName: '',

        cDepCode: '',
        cDepName: '',
        cMemo: '',
        cSource: '发货单',
        FROB: '1'
      },
      sourceList: [],
      loading: false,
      finished: false,
      curRow: {},
      cacheList: [],
      submitLoading: false,
      sources: {
        warehouseList: [],
        departmentList: [],
        rdList: []
      },
      control: {
        usePos: false,
        useBatch: false,
        useQuality: false,
        groupType: 1
      },
      cSign: newGuid(),
      form: {
        iRowno: '',

        cBoxNO: '',

        cPosCode: '',
        cPosName: '',
        cBarcode: '',
        cInvCode: '',
        cInvName: '',
        cInvStd: '',
        cComUnitCode: '',
        cComUnitName: '',
        cBatch: '',
        iMassDate: '', //质保期时长
        cMassUnit: '', //质保期时长单位 1 年 、2 月、 3 日
        dMdate: '', //生产日期
        dVdate: '', //到期日期
        iPlanQuantity: '',
        iCommitQuantity: '',
        iQuantity: '',

        iChangRate: 0,
        iNum: 0,
        cSourceBillID: '',
        cSourceBillNo: '',
        cSourceBillEntryID: ''
      },
      curEle: ''
    }
  },
  watch: {
    active(newV, oldV) {
      if (newV == 0) {
        this.setFocus()
      }
    }
  },
  methods: {
    onLoad() {
      this.sourceList = []
      getDispatch({ cFilter: this.queryForm.ID, FROB: this.queryForm.bRob })
        .then(({ Data }) => {
          this.sourceList = Data
        })
        .catch(err => {})
      this.loading = false
      this.finished = true
    },
    onDelete(index) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定要移除当前记录吗?'
        })
        .then(() => {
          this.cacheList.splice(index, 1)
        })
        .catch(() => {
          // on cancel
        })
    },
    doClear() {
      this.clearForm()
    },
    onSubmit() {
      const exist = this.cacheList.filter(f => {
        return f.cBoxNO == this.form.cBoxNO
      })
      if (exist.length > 0) {
        return this.$toast({
          type: 'fail',
          message: '当前箱号已扫描!',
          onOpened: () => {
            this.form.cBarcode = ''
            this.curEle = 'ele_cBarcode'
            this.setFocus()
          }
        })
      }

      // 红字检查库存
      if (!this.checkStock()) {
        this.curEle = 'ele_cBarcode'
        return this.$toast({
          type: 'fail',
          message: '当前库存量不够!',
          onOpened: () => {
            this.setFocus(true)
          }
        })
      }

      if (!this.checkPlan()) {
        this.curEle = 'ele_iQuantity'
        return this.$toast({
          type: 'fail',
          message: '数量超过源单!',
          onOpened: () => {
            this.setFocus(true)
          }
        })
      }

      this.cacheList.push(Object.assign({}, this.form))

      this.clearForm()
    },
    onSave() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定要提交记录吗?'
        })
        .then(() => {
          this.submitLoading = true
          const { accountId } = this.$store.getters
          const form = Object.assign({}, this.headForm, {
            cSign: this.cSign,
            FROB: this.queryForm.redblue == '1' ? '1' : '-1',
            cCusCode: this.queryForm.cCusCode,
            cAcc_Id: accountId
          })
          saveProStockOut(
            Object.assign(
              {},
              [form].map(m => {
                return {
                  cSign: m.cSign,
                  FROB: m.FROB,
                  cAcc_Id: m.cAcc_Id,
                  cCusCode: m.cCusCode,
                  cWhCode: m.cWhCode,
                  cRdCode: m.cRdCode,
                  cDepCode: m.cDepCode,
                  cMemo: m.cMemo,
                  cPersonCode: '',
                  cPersonName: '',
                  cLoader: '',
                  cCarNo: '',
                  cCarType: ''
                }
              })[0],
              {
                Entry: this.cacheList.map(m => {
                  return {
                    cBoxNO: m.cBoxNO,
                    cSourceBillID: m.cSourceBillID,
                    cSourceBillNo: m.cSourceBillNo,
                    cSourceBillEntryID: m.cSourceBillEntryID,
                    cInvCode: m.cInvCode,
                    cPosCode: m.cPosCode,
                    cBatch: m.cBatch,
                    iMassDate: m.iMassDate,
                    cMassUnit: m.cMassUnit,
                    dMdate: m.dMdate,
                    dVdate: m.dVdate,
                    iQuantity: m.iQuantity,
                    iChangRate: m.iChangRate,
                    iNum: m.iNum
                  }
                })
              }
            )
          )
            .then(({ Data, Message }) => {
              this.$toast({
                type: 'success',
                message: '提交成功!',
                onClose: () => {
                  this.submitLoading = false
                  this.$router.go(-1)
                  // this.onLoad()
                  // this.cacheList = []
                  // this.active = 0
                  // this.cSign = newGuid()
                }
              })
            })
            .catch(({ Message }) => {
              this.submitLoading = false
            })
        })
        .catch(e => {})
    },
    openWarehouse() {
      if (this.forbidden) {
        return this.$toast({ type: 'fail', message: '已经有扫描记录,禁止操作!' })
      }
      this.$refs.warehouse.open()
    },
    openDeptpartment() {
      this.$refs.deptpartment.open()
    },
    openRd() {
      this.$refs.rd.open(0)
    },
    pickWarehouse({ cWhCode, cWhName, bWhPos }) {
      this.headForm.cWhName = cWhName
      this.headForm.cWhCode = cWhCode
      this.control.usePos = bWhPos
      this.$nextTick(() => {
        this.curEle = bWhPos ? 'ele_cPosName' : 'ele_cBarcode'
        this.setFocus()
      })
    },
    pickDeptpartment({ cDepCode, cDepName }) {
      this.headForm.cDepName = cDepName
      this.headForm.cDepCode = cDepCode
    },
    pickRd({ cRdCode, cRdName }) {
      this.headForm.cRdCode = cRdCode
      this.headForm.cRdName = cRdName
    },
    cancelPicker() {
      this.setFocus()
    },
    setFocus(flag) {
      if (this.curEle != '') {
        setTimeout(() => {
          this.$refs[this.curEle].focus()
          if (window.android) {
            if (this.curEle != 'ele_iQuantity' || flag) {
              android.HideSoftKeyboard()
            }
          }
          setTimeout(() => {
            if (window.android) {
              if (this.curEle != 'ele_iQuantity') {
                android.HideSoftKeyboard()
              }
            }
          }, 50)
        }, 10)
      }
    },
    queryPos() {
      if (this.control.usePos && this.form.cPosName == '') {
        return this.$toast({
          type: 'fail',
          message: '请先扫描货位',
          onOpened: () => {
            this.form.cPosName = ''
            this.setFocus()
          }
        })
      }
      getPosition({ cWhCode: this.cWhCode, cPosCode: this.form.cPosName })
        .then(({ Data }) => {
          if (Data.length > 0) {
            this.form.cPosCode = this.form.cPosName
            this.form.cPosName = Data[0].cPosName
            this.curEle = 'ele_cBarcode'
          } else {
            this.form.cPosName = ''
            this.curEle = 'ele_cPosName'
            this.$toast({ type: 'fail', message: '没有查询到货位!' })
          }
        })
        .catch(err => {
          this.form.cPosName = ''
          this.curEle = 'ele_cPosName'
        })
        .finally(() => {
          this.setFocus()
        })
    },
    queryInv() {
      if (this.control.usePos && this.form.cPosCode == '') {
        return this.$toast({
          type: 'fail',
          message: '请先扫描货位',
          onOpened: () => {
            this.form.cBarcode = ''
            this.setFocus()
          }
        })
      }
      if (this.form.cBarcode == '') {
        return this.$toast({
          type: 'fail',
          message: '请先扫描箱号条码',
          onOpened: () => {
            this.form.cBarcode = ''
            this.curEle = 'ele_cBarcode'
            this.setFocus()
          }
        })
      }
      const exist = this.cacheList.filter(f => {
        return f.cBoxNO == this.form.cBarcode
      })
      if (exist.length > 0) {
        return this.$toast({
          type: 'fail',
          message: '当前箱号已扫描!',
          onOpened: () => {
            this.form.cBarcode = ''
            this.curEle = 'ele_cBarcode'
            this.setFocus()
          }
        })
      }

      // getInventory({ cBarcode: this.form.cBarcode, cWhCode: this.cWhCode, cPosCode: this.form.cPosCode })
      getBox({
        FBoxNo: this.form.cBarcode,
        cWhCode: this.cWhCode,
        cType: '2',
        FROB: this.queryForm.redblue == '1' ? '1' : '-1'
      })
        .then(({ Data }) => {
          if (Data.length > 0) {
            const {
              bInvBatch,
              bInvQuality,
              cInvCode,
              cInvName,
              cInvStd,
              cComUnitCode,
              cComUnitName,
              cBatch,
              iMassDate,
              cMassUnit,
              iChangRate,
              dMdate,
              iStockQuantity,
              iGroupType,
              iQuantity
            } = Data[0]

            const rows = this.sourceList.filter(f => {
              return f.cInvCode == cInvCode
            })
            if (rows.length > 0) {
              const row = rows[0]

              this.control.useBatch = bInvBatch //是否批次管理
              this.control.useQuality = bInvQuality //是否保质期管理
              this.control.groupType = iGroupType //单位组类别 0 无换算、 1 固定换算、2 浮动换算

              this.form.cInvCode = cInvCode
              this.form.cInvName = cInvName
              this.form.cInvStd = cInvStd
              this.form.cComUnitCode = cComUnitCode
              this.form.cComUnitName = cComUnitName
              this.form.cBatch = cBatch
              this.form.iQuantity = iQuantity
              this.form.iStockQuantity = iStockQuantity

              //计算保质期
              if (bInvQuality) {
                this.form.iMassDate = iMassDate
                this.form.cMassUnit = cMassUnit

                this.form.dMdate = dMdate
                if (cMassUnit == '1') {
                  this.form.dVdate = new dayjs(dMdate).add(iMassDate, 'year').format('YYYY-MM-DD')
                } else if (cMassUnit == '2') {
                  this.form.dVdate = new dayjs(dMdate).add(iMassDate, 'month').format('YYYY-MM-DD')
                } else if (cMassUnit == '3') {
                  this.form.dVdate = new dayjs(dMdate).add(iMassDate, 'day').format('YYYY-MM-DD')
                }
              }

              this.form.cBoxNO = this.form.cBarcode
              this.form.iChangRate = iChangRate
              //todo 多计量计算
              this.form.iNum = 0

              const cacheRows = this.cacheList.filter(f => {
                return f.cInvCode == cInvCode
              })
              const total = cacheRows
                .map(f => f.iQuantity)
                .reduce((sum, item) => {
                  return floatAdd(sum, item)
                }, 0)
              this.form.iCommitQuantity = total

              this.form.iRowno = row.iRowno
              this.form.iPlanQuantity = row.iQuantity2

              this.form.cSourceBillID = row.ID //源单ID
              this.form.cSourceBillNo = row.cCode //源单单号
              this.form.cSourceBillEntryID = row.Autoid //源单表体ID

              // if (this.control.usePos) {
              //   this.form.cPosName = ''
              // } else {
              this.form.cBarcode = ''
              // }
              // this.curEle = 'ele_iQuantity'

              this.onSubmit()
            } else {
              this.form.cBarcode = ''
              this.curEle = 'ele_cBarcode'
              return this.$toast({
                type: 'fail',
                message: '当前存货不在源单内!',
                onOpened: () => {
                  this.setFocus(true)
                }
              })
            }
          } else {
            this.form.cBarcode = ''
            this.curEle = 'ele_cBarcode'
            return this.$toast({
              type: 'fail',
              message: '未能查询到存货信息!',
              onOpened: () => {
                this.setFocus(true)
              }
            })
          }
        })
        .catch(err => {
          this.form.cBarcode = ''
          this.curEle = 'ele_cBarcode'
        })
        .finally(() => {})
    },
    inputQuantity() {
      if (this.form.iQuantity == '') {
        this.form.iQuantity = ''
        this.curEle = 'ele_iQuantity'
        return this.$toast({
          type: 'fail',
          message: '请先录入数量',
          onOpened: () => {
            this.setFocus(true)
          }
        })
      }
      if (this.form.iRowno == '') {
        this.form.iQuantity = ''
        if (this.form.cPosCode == '') {
          this.curEle = 'ele_cPosName'
        } else if (this.form.cBarcode == '') {
          this.curEle = 'ele_cBarcode'
        }
        return this.$toast({
          type: 'fail',
          message: '请按流程进行扫描!',
          onOpened: () => {
            this.setFocus()
          }
        })
      }

      this.onSubmit()
    },
    clearForm() {
      this.form.cBarcode = ''
      this.setFocus()
    },
    onFocus(e) {
      var dom = document.activeElement.id
      this.curEle = dom
      const domTarget = document.querySelector('#' + dom)
      if (domTarget != void 0) {
        setTimeout(function () {
          domTarget.scrollIntoView(false)
        }, 300)
      }
      window.localStorage.setItem('curEle', dom)
    },
    checkPlan() {
      const l1 = this.cacheList
        .filter(f => {
          return f.cInvCode == this.form.cInvCode // && f.cBatch == this.form.cBatch
        })
        .map(m => m.iQuantity)

      const total = floatAdd(
        l1.reduce((sum, item) => {
          return floatAdd(sum, item)
        }, 0),
        this.form.iQuantity
      )

      const source = this.sourceList
        .filter(f => {
          return f.cInvCode == this.form.cInvCode // && f.cBatch == this.form.cBatch
        })
        .map(m => m.iQuantity)
      const source_total = floatAdd(
        source.reduce((sum, item) => {
          return floatAdd(sum, item)
        }, 0),
        0
      )

      return floatSub(source_total, total) >= 0
    },
    checkStock() {
      const l1 = this.cacheList
        .filter(f => {
          return f.cInvCode == this.form.cInvCode && f.cBatch == this.form.cBatch
        })
        .map(m => m.iQuantity)

      const total = floatAdd(
        l1.reduce((sum, item) => {
          return floatAdd(sum, item)
        }, 0),
        this.form.iQuantity
      )

      return floatSub(this.form.iStockQuantity, total) >= 0
    }
  },
  computed: {
    cWhCode() {
      return this.headForm.cWhCode
    },
    showStock() {
      return this.queryForm.bRob == '0'
    },
    showBatch() {
      return this.control.useBatch
    },
    showQuality() {
      return this.control.useQuality
    },
    showGroup() {
      return this.control.groupType != 0
    },
    forbidden() {
      return this.cacheList.length > 0
    },
    forbiddenSub() {
      return this.form.cSourceBillID == '' || this.form.iQuantity == '' || this.form.iQuantity == 0
    }
  },
  created() {
    this.queryForm = Object.assign({}, this.$route.query)
  },
  mounted() {
    this.onLoad()
    window.keyboardChange = state => {
      if (state) {
        if (this.activeElement != '') {
          this.onFocus()
        } else {
        }
      }
    }
    setTimeout(() => {
      getWarehouse({})
        .then(({ Data }) => {
          this.sources.warehouseList = Data
          if (Data.length > 0) {
            const { cWhCode, cWhName, bWhPos } = Data[0]
            this.headForm.cWhCode = cWhCode
            this.headForm.cWhName = cWhName

            this.control.usePos = bWhPos
            this.$nextTick(() => {
              this.curEle = bWhPos ? 'ele_cPosName' : 'ele_cBarcode'
              this.setFocus()
            })
          }
        })
        .catch(err => {})
    }, 50)

    setTimeout(() => {
      getDepartment({})
        .then(({ Data }) => {
          this.sources.departmentList = Data
          if (Data.length > 0) {
            const { cDepCode, cDepName } = Data.filter(f => {
              return f.cDepCode == this.queryForm.cDepCode
            })[0]
            this.headForm.cDepCode = cDepCode
            this.headForm.cDepName = cDepName
          }
        })
        .catch(err => {})
    }, 100)

    setTimeout(() => {
      getRdStyle({ cFilter: 'bRdFlag=0' })
        .then(({ Data }) => {
          this.sources.rdList = Data
          if (Data.length > 0) {
            const { cRdCode, cRdName } = Data.filter(f => {
              return f.cRdCode == this.queryForm.cRdCode
            })[0]
            this.headForm.cRdCode = cRdCode
            this.headForm.cRdName = cRdName
          }
        })
        .catch(err => {})
    }, 200)
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirm != 0) {
      delete window.keyboardChange
      next(false)
    }
    if (this.cacheList.length <= 0) {
      delete window.keyboardChange
      next()
    } else {
      setTimeout(() => {
        this.confirm = this.$dialog
          .confirm({
            title: '提示',
            message: '您确定要退出当前功能吗?'
          })
          .then(() => {
            delete window.keyboardChange
            next()
          })
          .catch(() => {
            delete window.keyboardChange
            next(false)
          })
      }, 200)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  .list0 .btns {
    display: flex;
    margin-top: 3px;
    margin-bottom: 20px;
    justify-content: space-around;
    .btn {
      width: 50%;
    }
  }
  .postForm {
    .van-cell {
      padding: 8px 10px;
      ::v-deep .van-cell__title {
        font-size: 15px;
        color: #333;
        width: 70px;
      }
    }
  }
  .list0,
  .list {
    height: calc(100vh - 210px);
    overflow: scroll;
  }
  .sourceList {
    height: calc(100vh - 210px);
    overflow: scroll;
  }
  .list1 {
    height: calc(100vh - 260px);
    overflow: scroll;
  }
  .form {
    width: 94vw;
  }
  .header {
    .item {
      padding: 8px 10px;
    }
  }
}
</style>
