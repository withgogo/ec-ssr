import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

// 添加购物车
export function addGoodsCart(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/add-goods-cart',
      data,
      method :'POST',
      headers:{
        'content-type': 'application/json'
      }
  })
}
// 购物车列表
export function getGoodsCart1(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/goods-cart1',
      data,
      method :'GET'
  })
}

//清除失效商品
export function cartClear(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/clear',
      data,
      method :'POST'
  })
}

//删除
export function cartRemove(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/remove',
      data,
      method :'POST'
  })
}

//修改购物车数量
export function goodsCountAdjust(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/goods-count-adjust',
      data,
      method :'POST'
  })
}

// 拆分物流
export function goodsCartCheck(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/goods-cart-check',
      data,
      method :'POST'
  })
}


// 拆分团购 预购
export function goodsCartPre(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/goods-cart-pre',
      data,
      method :'POST'
  })
}

// 商品验证
export function choseGiftCheck(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/chose-gift-check',
      data,
      method :'POST'
  })
}


//  获取购物车总数量
export function cartCount(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/cart-count',
      data,
      method :'GET'
  })
}


export function cartCountAgain(data: any){
  return  useHttpRequest({
      url:'/api/h5/cart/buy-again',
      data,
      method :'POST'
  })
}






