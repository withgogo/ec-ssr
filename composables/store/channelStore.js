import { statisticAd } from "@/composables/api/home/index.ts";
export const useChannelStore = defineStore(
  "channelStore",
  () => {
    let channelObj = reactive({
      source: null,
      medium: null,
      campaign: null,
    }); //搜索数据列表
    // 搜索数据列表存储


    const getChannel = async (data) => {
      let router = useRouter()
      let currentRouter = router.currentRoute.value.path
// console.log('----data--'+JSON.stringify(data))
      let Channel = {
        "goodsId": '',
        "landingPage": "",
        "localPage": data.url ? data.url : currentRouter,
        "opType": data.type,
        "orderId": '',
        "orderPaidAmount": 0,
        "utmCampaign": channelObj?.campaign,
        "utmMedium": channelObj?.medium,
        "utmSource": channelObj?.source,
        "gcsIds": data.gcsIds
      }
      if (data) {
        switch (data.type) {
          case 'landing_click':
            Channel.landingPage = data.url ? data.url : currentRouter
            // Channel.localPage = '/pages/group-buy/group-buy-detail';
            // Channel.opType = 'landing_click';
            break;
          case 'goods_click':
            // Channel.localPage = '/pages/goods/goods';
            Channel.goodsId = data.goodsId ? data.goodsId : '';
            // Channel.opType = 'goods_click';
            break;
          case 'add_to_cart':
            // Channel.localPage = '/pages/goods/goods';
            Channel.goodsId = data.goodsId ? data.goodsId : '';
            // Channel.opType = 'add_to_cart';
            break;
          case 'order_create':
            Channel.orderId = data.orderId ? data.orderId : '';
            // Channel.localPage = data.createPay == 'direct' ? '/pages/order/TW-direct-buy' : '/pages/order/TW-confirmation';
            // Channel.opType = 'order_create';x
            break;
          // case 'home_click':
          // Channel.localPage = '/pages/tabBar/home/home';
          // Channel.opType = 'home_click';
          // break;
          // case 'checkout_count':
          // Channel.opType = 'checkout_count';
          // break;
        }
      }



      statisticAd(Channel).then((res) => {
// console.log('---res'+JSON.stringify(Channel))
      })
    }


    // 判断渠道数据
    const channelData = async (option) => {
      let utm_campaign = option.utm_campaign !== null && option.utm_campaign !== undefined && option
        .utm_campaign !== 'null' && option.utm_campaign !== 'undefined' ? option.utm_campaign : ''
      let utm_medium = option.utm_medium !== null && option.utm_medium !== undefined && option.utm_medium !==
        'null' && option.utm_medium !== 'undefined' ? option.utm_medium : ''
      let utm_source = option.utm_source !== null && option.utm_source !== undefined && option.utm_source !==
        'null' && option.utm_source !== 'undefined' ? option.utm_source : ''
      // console.log('utm_campaign==', utm_campaign)
      // console.log('utm_medium==', utm_medium)
      // console.log('utm_source==', utm_source)
      if (utm_campaign && utm_medium && utm_source) {
        let channel = {
          campaign: utm_campaign,
          medium: utm_medium,
          source: utm_source
        }
        channelObj.source = utm_source
        channelObj.medium = utm_medium
        channelObj.campaign = utm_campaign

      // console.log('channelObj-----'+JSON.stringify(channelObj))
        return channel

      } else {
        return false
      }
    }

    return {
      channelData,
      getChannel,
      channelObj,
    };
  },
  {
    persist: true,
  }
);
