export const useCvsStore = defineStore('cvsStore', () => {
  const cvsStoreData = reactive({
      type: null,
      isHome:0,
      gcs: null,
      deliveryType: null,
      deliveryAddressId: null,
      famiStoreInfo:null,
      unimartStoreInfo:null,
      hilifeStoreInfo:null,
      name:null,
      mobile:null,
      invoiceInfo:null,
      defaultAddressInfo:null,
      gift:null,
      couponId:null,
      goodsId:null, 
      gsp:null,//商品规格
      count:0,//商品数量
      packageList:[],
      urlSearch:null , //pos支付url 携带参数数据
      pickUpAddressId:null,

      callbackUrl:null, //返回一页的路径
      callbackDate:null, //返回一页的参数
  })


  // 搜索数据列表存储
  const setCvsStoreData = (data) => {
    cvsStoreData.type = data.type
    cvsStoreData.isHome = data.isHome
    cvsStoreData.gcs = data.gcs
    // cvsStoreData.gift = data.gift
    cvsStoreData.deliveryType = data.deliveryType
    cvsStoreData.deliveryAddressId = data.deliveryAddressId
    cvsStoreData.famiStoreInfo = data.famiStoreInfo
    cvsStoreData.unimartStoreInfo = data.unimartStoreInfo
    cvsStoreData.hilifeStoreInfo = data.hilifeStoreInfo
    cvsStoreData.name = data.name
    cvsStoreData.mobile = data.mobile
    cvsStoreData.invoiceInfo = data.invoiceInfo
    cvsStoreData.defaultAddressInfo = data.defaultAddressInfo
    // cvsStoreData.goodsId = data.goodsId
    // cvsStoreData.gsp = data.gsp
    // cvsStoreData.count = data.count
    cvsStoreData.urlSearch = data.urlSearch
    cvsStoreData.pickUpAddressId = data.pickUpAddressId
  }
  //清除
  const clearCvsStoreData = ()=>{
      cvsStoreData.type = null
      cvsStoreData.isHome = 0
      cvsStoreData.gcs = null
      cvsStoreData.gift = null
      cvsStoreData.deliveryType = null
      cvsStoreData.deliveryAddressId = null
      cvsStoreData.defaultAddressInfo = null
      cvsStoreData.famiStoreInfo = null
      cvsStoreData.unimartStoreInfo = null
      cvsStoreData.hilifeStoreInfo = null
      cvsStoreData.name = null
      cvsStoreData.mobile = null
      cvsStoreData.invoiceInfo = null
      cvsStoreData.goodsId = null
      cvsStoreData.gsp = null
      cvsStoreData.count = null
      cvsStoreData.packageList = []
      cvsStoreData.couponId =  null
      cvsStoreData.urlSearch = null
      cvsStoreData.pickUpAddressId = null
      cvsStoreData.callbackUrl = null
      cvsStoreData.callbackDate = null
  }
  return {
    cvsStoreData,  
    setCvsStoreData,
    clearCvsStoreData,
    }
}, {
  persist: true,
})
 