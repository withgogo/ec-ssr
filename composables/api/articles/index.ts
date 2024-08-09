
import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

export function getSysInfo(data: any){
  return  useHttpRequest({
      url:'/api/h5/article/get-sys-info',
      data,
      method :'GET',
  })
}