import  {useHttpRequest}  from '@/composables/utils/request';
// 地址下拉
export function getArea(data: any){
  return  useHttpRequest({
      url:'/api/h5/address/get-area',
      data,
      method :'GET',
  })
}

// 地址列表
export function queryAddressList(data: any) {
  return useHttpRequest({
    url: '/api/h5/address/get',
    method: 'GET',
    data
  })
}
// 删除地址
export function deleteAddress(data: any) {
  return useHttpRequest({
    url: '/api/h5/address/deleteByIds',
    method: 'GET',
    data
  })
}
// 保存地址
export function saveAddress(data: any) {
  return useHttpRequest({
    url: '/api/h5/address/edit',
    method: 'GET',
    data
  })
}

// 获取地址详情
export function getAddressInfo(data: any) {
  return useHttpRequest({
    url: '/api/h5/address/getInfo',
    method: 'GET',
    data
  })
}

// 超商
export function twReturnlogView(data: any) {
  return useHttpRequest({
    url: '/api/lj/logistics/tw-returnlog-view',
    method: 'GET',
    data
  })
}