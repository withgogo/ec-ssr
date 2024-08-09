import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

// 套餐商品详情
export function packageItems(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/package-items',
      data,
      method :'GET',
  })
}
// 验证商品
export function checkGoods(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/check',
      data,
      method :'POST',
  })
}

// 普通 商品详情
export function goodsItems(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/items',
      data,
      method :'GET',
  })
}

// 到货通知
export function goodsArriveMsg(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/arrive-msg',
      data,
      method :'POST',
  })
}


// 猜你喜欢
export function goodsListBottom(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/goods_list_bottom',
      data,
      method :'GET',
  })
}

//收藏
export function addGoodsFavorite(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/add_goods_favorite',
      data,
      method :'GET',
  })
}
//收藏取消
export function goodsFavoriteDel(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods/goods_favorite_del',
      data,
      method :'GET',
  })
}

