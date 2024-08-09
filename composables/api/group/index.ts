
import { useHttpRequest } from '@/composables/utils/request';

// 团购活动列表
export function groupList(data: any) {
  return useHttpRequest({
    url: '/api/h5/group/list',
    data,
    method: 'GET',
  })
}

// 团购商品列表
export function groupGoodList(data: any) {
  return useHttpRequest({
    url: '/api/h5/group/good-list',
    data,
    method: 'GET',
  })
}

//早鸟礼
export function earlyBirdList(data: any) {
  return useHttpRequest({
    url: '/api/h5/early-bird/list',
    data,
    method: 'GET',
  })
}

//团购活动详情
export function groupInfo(data: any) {
  return useHttpRequest({
    url: '/api/h5/coupon/group-info',
    data,
    method: 'GET',
  })
}


//团购KOL
export function kolList(data: any) {
  return useHttpRequest({
    url: '/api/h5/group/kol-list',
    data,
    method: 'GET',
  })
}


//团购KOL 导出
export function exportExcelKol(data: any) {
  return useHttpRequest({
    url: '/api/h5/group/export-excel',
    data,
    method: 'POST',
    responseType: 'arrayBuffer',
  })
}
