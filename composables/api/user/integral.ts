import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

// 折扣明细
export function getDiscountList(data: any){
  return  useHttpRequest({
      url:'/api/h5/user-level/get-discount-list',
      data,
      method :'GET',
  })
}

// 积分明细
export function getIntegralList(data: any){
    return  useHttpRequest({
        url:'/api/h5/integral/get-integral-list',
        data,
        method :'GET',
    })
  }

  // 用户积分 
export function getIntegralInfo(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/get-integral-info',
      data,
      method :'POST',
  })
}