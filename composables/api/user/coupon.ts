import  {useHttpRequest}  from '@/composables/utils/request';

//我的优惠券
export function myCoupon(data: any){
  return  useHttpRequest({
      url:'/api/h5/coupon/my-coupon',
      data,
      method :'GET',
  })
}

// 优惠券列表
export function couponList(data: any){
    return  useHttpRequest({
        url:'/api/h5/coupon/list',
        data,
        method :'GET',
    })
  }

//   领取优惠券
export function getCoupon(data: any){
    return  useHttpRequest({
        url:'/api/h5/coupon/getCoupon',
        data,
        method :'GET',
    })
  }