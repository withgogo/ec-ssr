
// 店铺信息
const getStoreInfo = (callback) => {
    storeInfo().then(response => {
      if (response.code == 200) {
        if (process.client) {
          setStorageData('storeInfo', response.data)
        }
        callback(response.data)
      }
    })
  }
  // 系统配置
  const getStoreConfig = (callback) => {
    storeConfig().then(response => {
      if (response.code == 200) {
        // let { locale } = useI18n()
        setStorageData('sysConfig', response.data)
        // locale.value = response.data.publishCountry =='tw' ? 'tw':'zh'
        callback(response.data.publishCountry)
        //  const language = useCookie('lang')
        //   language.value = locale.value
      }
    })
  }
  // 获取购物车数量
  const getCartCount = ()=>{
    cartCount().then(response => {
      if (response.code == 200) {
        console.log(response.data.cart_count)
        useState("cartCount", () => response.data.cart_count)
        console.log('cartCount---',tCount.value)
      }
    })
  }

  // 获取用户信息
  const getUser = () => {
    getUserInfo().then((response) => {
      if (response.code == 200) {
        let { data } = response;
        setStorageData('userInfo', data)
      }
    })
  }
  export default {
    getCartCount,
    getStoreConfig,
    getStoreInfo,
    getUser
  }