import  {useHttpRequest}  from '@/composables/utils/request';
// 发票列表
export function vatinvoiceList(data: any) {
  return useHttpRequest({
    url: '/api/h5/vatinvoice/list',
    method: 'GET',
    data
  })
}
// 手机条形码验证
export function checkMobileCarrier(data: any) {
  return useHttpRequest({
    url: '/api/lj/order/checkMobileCarrier',
    method: 'POST',
    data
  })
}
// 发票保存
export function invoiceSave(data: any) {
  return useHttpRequest({
    url: '/api/h5/vatinvoice/tw-save',
    method: 'POST',
    data
  })
}
// 获取发票详情 
export function vatinvoiceDetail(data: any) {
  return useHttpRequest({
      url: '/api/h5/vatinvoice/detail',
      data,
      method: 'GET',
  })
}
// 发票删除
export function vatinvoiceDel(data: any) {
  return useHttpRequest({
      url: '/api/h5/vatinvoice/del',
      data,
      method: 'POST',
  })
}