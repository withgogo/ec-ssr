
import  {useHttpRequest}  from '@/composables/utils/request';
import { Header } from 'element-plus/es/components/table-v2/src/components/index.mjs';
// import  { RequestData}  from '@/utils/dataType';

export function h5Index(data: any){
  return  useHttpRequest({
      url:'/api/h5/index',
      data,
      method :'GET',
  })
}

// 店铺信息
export function storeInfo(data: any){
  return  useHttpRequest({
      url:'/api/h5/store-info',
      data,
      method :'GET',
  })
}

//系统配置
export function storeConfig(data: any){
  return  useHttpRequest({
      url:'/api/h5/config',
      data,
      method :'GET',
  })
}


export function statisticsGaFb(data: any){
  return  useHttpRequest({
      url:'/api/h5/ga4/statistics',
      data,
      method :'POST',
  })
}
export function statisticAd(data: any){
  return  useHttpRequest({
      url:'/api/h5/ad/statistic',
      data,
      method :'POST',
      headers :{
        'content-type':'application/json'
      }
  })
}