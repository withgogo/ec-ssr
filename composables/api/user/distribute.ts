import  {useHttpRequest}  from '@/composables/utils/request';

//分销 推广中心
export function getCenter(data: any){
  return  useHttpRequest({
      url:'/api/direct/get-center',
      data,
      method :'GET',
  })
}
//获取分销规则，未登录情况下获取分销描述
export function getDesc(data: any){
  return  useHttpRequest({
      url:'/api/direct/get-desc',
      data,
      method :'GET',
  })
}
//海报列表
export function posterList(data: any){
  return  useHttpRequest({
      url:'/api/direct/get-poster-list',
      data,
      method :'GET',
  })
}
// 保存海报
export function posterSave(data: any){
  return  useHttpRequest({
      url:'/api/direct/save',
      data,
      method :'POST',
  })
}
// 分销排行
export function  getLowerLevel(data: any){
  return  useHttpRequest({
      url:'/api/direct/get-lower-level',
      data,
      method :'GET',
  })
}
//是否显示分销
export function  isShowDistribute(data: any){
  return  useHttpRequest({
      url:'/api/direct/if-show-poster',
      data,
      method :'GET',
  })
}
