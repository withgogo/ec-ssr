import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

// 用户信息
export function getUserInfo(data: any){
  return  useHttpRequest({
      url:'/api/charger/userInfo',
      data,
      method :'GET',
  })
}
// 绑定的第三方列表
export function getBindProvider(data: any){
  return  useHttpRequest({
      url:'/api/h5/getBindProvider',
      data,
      method :'GET',
  })
}

// 修改用户信息
export function accountSave(data: any){
  return  useHttpRequest({
      url:'/api/h5/userCenter/account_save',
      data,
      method :'POST',
  })
}
// 修改用户信息 上传图片
export function uploadImg(data: any) {
  return useHttpRequest({
    url: '/api/h5/article/upload',
    method: 'POST',
    data
  })
}


// // 解绑
export function providerUnbind(data: any) {
  return useHttpRequest({
    url: '/api/h5/providerUnbinding',
    method: 'POST',
    data
  })
}


// line授权登录回来之后获取的code 获取用户是否已经绑定成功
export function getLineInfo(data: any) {
  return useHttpRequest({
    url: '/api/charger/get-line-info',
    method: 'GET',
    data
  })
}


export function saveDirectSellingUser(data: any) {
  return useHttpRequest({
    url:  "/api/direct/user/save-direct-selling",
    method: 'POST',
    data
  })
}


