
import  {useHttpRequest}  from '@/composables/utils/request';

// 订单列表
export function orderList(data: any){
  return  useHttpRequest({
     url:'/api/h5/order/list',
       data,
      method :'GET',
  })
}


// 订单详情
export function orderInfo(data: any){
  return  useHttpRequest({
     url:'/api/h5/order/info',
       data,
      method :'GET',
  })
}


// 服务订单列表
export function getServiceOrderList(data: any){
  return  useHttpRequest({
     url:'/api/h5/service/query-user-goods-list',
       data,
      method :'GET',
  })
}
// 申请记录列表
export function orderReturnListLog(data: any){
  return  useHttpRequest({
     url:'/api/h5/refund/order-return-listlog',
       data,
      method :'GET',
  })
}
// 退货/退款列表
export function orderReturnList(data: any){
  return  useHttpRequest({
     url:'/api/h5/refund/list',
       data,
      method :'GET',
  })
}

////终止订单确认
export function orderStopApply(data: any) {
  return useHttpRequest({
    url: '/api/h5/order/stop-apply',
    method: 'POST',
    data
  })
}

// 查询最近购买的8个商品
export function getGoodsListRecently(data: any){
  return  useHttpRequest({
     url:'/api/h5/order/get-goods-list-recently',
       data,
      method :'GET',
  })
}
// 获取订单数量
export function orderCount(data: any){
  return  useHttpRequest({
     url:'/api/h5/order/user-order-info',
       data,
      method :'GET',
  })
}

//取消订单
export function orderCancel(data: any){
  return  useHttpRequest({
     url:'/api/h5/order/order-cancel',
       data,
      method :'POST',
  })
}

//退款
export function orderRefundPrice(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/refund',
      data,
      method :'POST',
  })
}

// 退货列表
export function orderRefundList(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/list',
      data,
      method :'GET',
  })
}

// 退货列表
export function orderReturnListlog(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/order-return-listlog',
      data,
      method :'GET',
  })
}

// 确认收货
export function orderCofirm(data: any){
  return  useHttpRequest({
      url:'/api/h5/order/cofirm',
      data,
      method :'POST',
  })
}


// 暂停 保存
export function orderPauseApply(data: any){
  return  useHttpRequest({
      url:'/api/h5/order/pause-apply',
      data,
      method :'POST',

  })
}

// 获取上次发货地址
export function getCvsAddr(data: any){
  return  useHttpRequest({
      url:'/api/h5/address/get-cvs-addr',
      data,
      method :'GET',
  })
}


// //修改地址保存
export function saveOrderAddress(data: any){
  return  useHttpRequest({
      url:'/api/h5/order/save-order-address',
      data,
      method :'POST',
      headers : {
        'content-type': 'application/json'
    }
  })
}


//退货 提交
export function returnApplySubmit(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/return-apply-submit',
      data,
      method :'POST',
      headers : {
        'content-type': 'application/json'
    }
  })
}


//退货 详情
export function orderReturnListlogDetail(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/order-return-listlog-detail',
      data,
      method :'GET'
  })
}

//确认撤销
export function returnApplyCancel(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/return-apply-cancel',
      data,
      method :'POST'
  })
}

//宅配 的退货物流
export function twHomeDeliver(data: any){
  return  useHttpRequest({
      url:'/api/lj/logistics/tw-home-deliver',
      data,
      method :'POST',
      headers : {
        'content-type': 'application/json'
    }
  })
}

//c超商的退货物流
export function twDeliver(data: any){
  return  useHttpRequest({
      url:'/api/lj/logistics/tw-deliver',
      data,
      method :'POST',
      headers : {
        'content-type': 'application/json'
    }
  })
}

export function twExpressLog(data: any){
  return  useHttpRequest({
      url:'/api/lj/logistics/tw-express-log',
      data,
      method :'GET'
  })
}


export function twDeliverFast(data: any){
  return  useHttpRequest({
      url:'/api/lj/logistics/tw-deliver-fast',
      data,
      method :'POST'
  })
}

export function returnlogView(data: any){
  return  useHttpRequest({
      url:'/api/h5/refund/returnlog-view',
      data,
      method :'GET'
  })
}

// 获取绿界物流
export function greenExpressLog(data: any){
  return  useHttpRequest({
      url:'/api/h5/order/green-express-log',
      data,
      method :'GET'
  })
}


// 获取订单数量
export function userOrderInfo(data: any){
  return  useHttpRequest({
      url:'/api/h5/order/user-order-info',
      data,
      method :'GET'
  })
}






