import  {useHttpRequest}  from '@/composables/utils/request';

export function getLevelInfo(data: any){
  return  useHttpRequest({
      url:'/api/h5/user-level/get-level-info',
      data,
      method :'GET',
  })
}