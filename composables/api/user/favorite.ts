import  {useHttpRequest}  from '@/composables/utils/request';

// 我的收藏
export function getFavorite(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/favorite',
      data,
      method :'Get',
  })
}

