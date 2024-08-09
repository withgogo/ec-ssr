import  {useHttpRequest}  from '@/composables/utils/request';
// ------信用卡
export function bankCardList(data: any) {
  return useHttpRequest({
    url: '/api/h5/bank-card/query-list',
    method: 'GET',
    data
  })
}
// 默认信用卡
export function setCardDefault(data: any) {
  return useHttpRequest({
    url: '/api/h5/bank-card/set-default',
    method: 'POST',
    data
  })
}
//解绑/删除

export function banckCardUnbind(data: any) {
  return useHttpRequest({
    url: '/api/h5/bank-card/unbind',
    method: 'POST',
    data
  })
}
//更新卡别名
export function setCardAlias(data: any) {
  return useHttpRequest({
    url: '/api/h5/bank-card/set-card-alias',
    method: 'POST',
    data
  })
}


//  获取绑卡token  绑卡支付
export function bindCardPayToken(data: any) {
  return useHttpRequest({
    url: '/api/lj/order/bind-card-pay-token',
    method: 'POST',
    data,
    headers :{
      'content-type': 'application/json'
    }
  })
}


//  获取绑卡 lv token 
export function bindCardToken(data: any) {
  return useHttpRequest({
    url: '/api/lj/card/get-card-token',
    method: 'POST',
    data,
    headers :{
      'content-type': 'application/json'
    }
  })
}

//  绑卡保存 token
export function bindCard(data: any) {
  return useHttpRequest({
    url: '/api/lj/card/bind-card',
    method: 'POST',
    data
  })
}

/// 主订单换卡
export function changeCard(data: any) {
  return useHttpRequest({
    url: '/api/h5/order/change-card',
    method: 'POST',
    data
  })
}



