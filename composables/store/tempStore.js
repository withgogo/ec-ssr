// import publicData from "@/composables/utils/publicData.js";
// let { getCartCount } = publicData
import { cartCount } from "@/composables/api/user/cart.ts";
export const useTempStore = defineStore(
  "tempStore",
  () => {
    let historyList = ref([]); //搜索数据列表
    // 搜索数据列表存储
    const setHistoryList = (lable) => {
      let target = historyList.value.find(item=>item.value == lable.value|| lable.value==item.key )
      if(!target){
        historyList.value.push(lable);

      }
      // console.log(JSON.stringify(historyList.value));
    };
    // 购物车数量
    let cartCounter = ref(0)
    const getCountCart = async()=>{
      if (process.client) {
         let groupStore = useGroupStore()
         let data = {
          isGroupPrivate:groupStore.isPrivate,
          groupId:groupStore.groupId
         }
        await 
        cartCount(data).then((response) => {
          if (response.code == 200) {
            cartCounter.value = response.data.cart_count;
          }
        });
      }
    }
    // 获取购物车数量
    const cartCountCp = computed(() => {
      return cartCounter.value;
    });

    // banner 数据
    const slideSwiperList = ref([])

    // 用户昵称 。pc 显示
    const userName = ref()
    const getUserName = computed(() => {
      return userName.value;
    });

    return {
      historyList,
      setHistoryList,
      cartCountCp,
      getCountCart,
      slideSwiperList,
      cartCounter,
      getUserName,
      userName
    };
  },
  {
    persist: false,
  }
);
