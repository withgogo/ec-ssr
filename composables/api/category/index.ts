import  {useHttpRequest}  from '@/composables/utils/request';
// import  { RequestData}  from '@/utils/dataType';

// 分类
export function queryListClass(data: any){
  return  useHttpRequest({
      url:'/api/h5/goods-class/query-list',
      data,
      method :'GET'
  })
}

// 分类商品
export function queryListGoodsClass(data: any){
    return  useHttpRequest({
        url:'/api/h5/goods-class/goods_list_class',
        data,
        method :'GET'
    })
  }
  