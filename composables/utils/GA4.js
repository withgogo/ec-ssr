import { statisticsGaFb } from "@/composables/api/home/index.ts";

export function storageSend(eventType, data, dataType) {
    let params = {
      type: dataType,
      event: eventType,
      data: data ? JSON.stringify(data) : "{}",
    }
    statisticsGaFb(params).then((res) => {
      if (res.code == 200) {
      }
    });
  }
// GA4 
export function sendDataGA(eventType, data) {
  const { gtag } = useGtag()
    // console.log('GA-eventType----',eventType)
    // console.log('GA-data----',data)
    // console.log('GA-gtag----',gtag)
    gtag("event", eventType, data);
    storageSend(eventType, data, "GA");
}

// FB meta-pixel
export function sendDataFBPixel(eventType, fbData) {
  const { $fbq } = useNuxtApp()
  $fbq("track", eventType, fbData);
  storageSend(eventType, fbData, "FB");
}
// FB 微数据标签
export function createFBPixel(data) {
  let {
    id,
    goodsData,
    goodsName,
    fullPath,
    goodsPrice,
    stock
  } = data
  // console.log('createFBPixel====',data)
  // 定义JSON-LD数据
  var jsonLdData = {
    "@context": "http://schema.org",
    "@type": "Product",
    "id": '', // 项目的唯一内容 ID。如果可能，请使用商品的 SKU。每个内容 ID 只能在目录中出现一次。如果同一 ID 存在多个实例，我们将忽略所有实例
    "description": goodsData.seoDescription || goodsData.goodsService, // 商品的描述。
    "productID": id, //商品的零售商编号。
    "sku": "",
    "brand": goodsData.brandName, //商品的品牌。
    "name": goodsName, //商品的名称。
    "image_link": fullPath, //商品图片
    "image": fullPath,
    "offers": {
      "@type": "offers",
      "highPrice": goodsData.goodsPrice, //最高价格
      "lowPrice": goodsData.rebatePrice > 0 ? goodsData.rebatePrice : goodsData
      .storePrice, //最低价格 
      "price": goodsPrice, //商品的当前价格
      // "offerCount": "1", //商品
      'availability': stock > 0 ? 'in stock' :
      'out of stock', //商品的当前库存情况：in stock、out of stock、available for order、discontinued。在“offers”下加入此条目。
      "priceCurrency": "TWD" //货币类型
    },
    "url": window.location.href //商品页面的完整网址。
  };
  // console.log('jsonLdData====',jsonLdData)
  // 将JSON-LD数据转换为JSON字符串
  var jsonLdString = JSON.stringify(jsonLdData, null, 2); // 使用缩进以提高可读性
  
  // 查询之前创建的script，然后删除掉
  var scriptTags = document.getElementsByTagName('script');
  for (var i = 0; i < scriptTags.length; i++) {
    if (scriptTags[i].type === 'application/ld+json') {
    // 删除标签
    scriptTags[i].parentNode.removeChild(scriptTags[i]);
    }
  }
  // 创建一个新的script标签
  var scriptTag = document.createElement('script');
  // 设置script标签的type属性
  scriptTag.type = 'application/ld+json';
  // 将JSON-LD数据作为文本插入到script标签中
  scriptTag.textContent = jsonLdString;
  // 将script标签添加到文档的head部分
  document.head.appendChild(scriptTag);
}

