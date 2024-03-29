// axios
import request from '@/utils/request'

// 获取采购到货表头
export function getPuArrivalHead(data) {
  return request({
    url: 'GetPuArrivalHead',
    method: 'post',
    data
  })
}

//获取采购到货明细
export function getPuArrival(data) {
  return request({
    url: 'GetPuArrival',
    method: 'post',
    data
  })
}

//采购到货 提交
export function savePuArrival(data) {
  return request({
    url: 'SavePurArrPrint',
    method: 'post',
    data
  })
}
