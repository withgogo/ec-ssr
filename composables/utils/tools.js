import { useI18n } from "vue-i18n";
// 防抖
export function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 节流
export function throttle(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func.apply(this, args);
      }, delay);
    }
  };
}
// 转换日期
export function transformTime(time) {
  let date = new Date(time * 1000); // 接口时间戳比较特殊
  let y = date.getFullYear();
  let m =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return y + "-" + m + "-" + d;
}

// date.js
export function formatDate(date, fmt) {
  // console.log('date---',date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 超商 宅配
export function arraySplit(string) {
  let { t } = useI18n();
  let newArr = [];
  if (string && string.indexOf(",") > -1) {
    let arr = string.split(",");
    let home = arr.findIndex((item) => item == "home");
    let cvs = arr.findIndex((item) => item == "cvs");
    let self = arr.findIndex((item) => item == "self");
    if (home > -1) {
      newArr[home] = t("otherWords.zhai");
    }
    if (cvs > -1) {
      newArr[cvs] = t("otherWords.chao");
    }
    if (self > -1) {
      newArr[self] = t("otherWords.zi");
    }

    return newArr;
  } else if (string) {
    if (string === "cvs") {
      newArr[0] = t("otherWords.chao");
    } else if (string === "home") {
      newArr[0] = t("otherWords.zhai");
    } else {
      newArr[0] = t("otherWords.zi");
    }
    return newArr;
  }
}

// 超过千位的 //积分计算
export function division(num) {
  // console.log(num)
  if(!num) return 0
  if (num > 0) {
    if (num > 9999) {
      return accDiv(num, 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  } else if (num <= 0) {
    return 0;
  }
}
// 加法
export function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//乘法
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
//除法
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {} //--小数点后的长度
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {} //--小数点后的长度
  // with(Math){
  r1 = Number(arg1.toString().replace(".", "")); //--去除小数点变整数
  r2 = Number(arg2.toString().replace(".", "")); //--去除小数点变整数
  return (r1 / r2) * Math.pow(10, t2 - t1); //---整数相除 在乘上10的平方  小数点的长度
  // }
}
// 时间弹框添加生日picker 年月日
export function formatter(type, option) {
  let { t } = useI18n();
  if (type === "year") {
    option.text += t("otherWords.year");
  }
  if (type === "month") {
    option.text += t("otherWords.month");
  }
  if (type === "day") {
    option.text += t("otherWords.ri");
  }
  return option;
}

export function numberToCurrencyNo(value) {
  // console.log("currencyvalue",value)
  if (!value) return 0;
  // 获取整数部分
  const intPart = Math.trunc(value);
  // 整数部分处理，增加,
  const intPartFormat = intPart
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  // 预定义小数部分
  let floatPart = "";
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split(".");
  if (valueArray.length === 2) {
    // 有小数部分
    floatPart = valueArray[1].toString(); // 取得小数部分
    return intPartFormat + "." + floatPart;
  }
  return intPartFormat + floatPart;
}
// 获取店铺id
export function getStoreId() {
  const runtimeConfig = useRuntimeConfig();
  let storeId = runtimeConfig.public.storeId;
  return storeId;
}

// 是否app
export function getIsApp() {
  const runtimeConfig = useRuntimeConfig();
  let isApp = runtimeConfig.public.isApp;
  return isApp;
}
// 倒计时获取时间
export function countDownFn(end_time) {
  var nowDate = new Date();
  var EndDate =
    end_time.toString().indexOf("-") > -1
      ? new Date(end_time.replace(/-/g, "/"))
      : end_time;
  var dateDiff = EndDate - nowDate.getTime();
  var days = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出天数
  //计算出小时数
  var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);

  let data = {
    days,
    hours,
    minutes,
    seconds,
  };
  return data;
}

export function validUserName(str, deliveryType) {
  ///<summary>获得字符串实际长度，中文2，英文1</summary>
  ///<param name="str">要获得长度的字符串</param>
  var realLength = 0,
    len = str.length,
    charCode = -1;
  if (deliveryType == 2) {
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
  } else if (deliveryType == 3) {
    realLength = str.length;
  } else {
    realLength = str.length;
  }
  return realLength;
}

//手机格式验证
export function isValidPhone(phoneNum, type) {
  console.log(phoneNum);
  console.log(type);
  var reg = new RegExp("^[0][9][0-9]{8}$|^[9][0-9]{8}$");
  if (type == "zh") {
    reg = new RegExp("^[1][3-9][0-9]{9}$");
  }
  let flag = true;
  if (reg.test(phoneNum)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}


//手机格式验证，只能是09开头的10位手机号
export function isValidPhoneCheck(phoneNum, type) {
  console.log(phoneNum);
  console.log(type);
  var reg = new RegExp("^[0][9][0-9]{8}$");
  if (type == "zh") {
    reg = new RegExp("^[1][3-9][0-9]{9}$");
  }
  let flag = true;
  if (reg.test(phoneNum)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

//手机格式验证
export function isValidEmail(val) {
  let regEmail =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,20}$/;
  let flag = true;
  if (regEmail.test(val)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

export function Copy(content) {
  let textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.readOnly = "readOnly";
  document.body.appendChild(textarea);
  textarea.select(); // 选择对象
  textarea.setSelectionRange(0, content.length); //核心
  let result = document.execCommand("Copy"); // 执行浏览器复制命令
  textarea.remove();
  return result;
}
export function cardSplice(val) {
  const cardSplice = (val) => {
    if (val == null || val === "") {
      return "";
    }
    let card = null;
    if (val) {
      card = `******${val.slice(6, val.length)}`;
    }

    return card;
  };
}

// 折扣 显示 几折
export function computedDiscount(count) {
  if (count > 0 && count < 1) {
    let result =
      (count * 10 + " ").indexOf(".") > -1 ? count * 100 : count * 10;
    return result.toFixed(0);
  } else {
    return 1;
  }
}

// 判断当前设备
export function getDeviceType() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPod/i)
  ) {
    return "iOS"; // iOS device
  } else if (userAgent.match(/Android/i)) {
    return "Android"; // Android device
  } else if (userAgent.match(/webOS/i) || userAgent.match(/Palm/i)) {
    return "Palm"; // Palm device
  } else if (userAgent.match(/BlackBerry/i) || userAgent.match(/IEMobile/i)) {
    return "BlackBerry"; // BlackBerry device
  } else if (userAgent.match(/Windows Phone/i)) {
    return "Windows Phone"; // Windows Phone device
  } else {
    return "Unknown"; // Unknown device
  }
}
//判断是不是line登陆
export function isLineBrowser() {
  return /Line/.test(navigator.userAgent);
}
//   信用卡 隐藏前几位
export function bankCardSplice(val) {
  if (val == null || val === "") {
    return "";
  }
  let card = null;
  if (val) {
    card = `******${val.slice(6, val.length)}`;
  }
  return card;
}
// 改为了 向上取整数
export function useMathCeil(arg1) {
  if (arg1 > 0) {
    return Math.ceil(arg1);
  } else if (arg1 == 0) {
    return 0;
  }
}

export function replaceImageWidth(detail) {
  // if(detail.indexOf('img')>-1){
  var content = detail.replace(/<img[^>]*>/gi, function (match1, capture) {
    match1 = match1.replace(
      /(style="(.*?)")|(width="(.*?)")|(height="(.*?)")/gi,
      ""
    );
    return match1;
  });
  // console.log('imagewidth=' + content)
  content = content.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
  content = content.replace(
    /\<p/gi,
    '<p style="font-size: 14px;margin: 10rpx 0"'
  );

  //  console.log('p=' + content)
  return content;
  // }
}

export function phoneValidation(phoneNum) {
  // var reg = /^1[0-9]{10}$/,
  var reg = new RegExp("^[1][3-9][0-9]{9}$");
  let flag = true;
  if (!reg.test(phoneNum)) {
    // console.log('手机号格式输入不正确！', phoneNum)
    flag = false;
  }
  return flag;
}

export function phoneTWValidation(phoneNum) {
  // var reg = new RegExp("^[0][9][0-9]{8}$|[9][0-9]{8}$")
  const reg = new RegExp("^[0][9][0-9]{8}$|^[9][0-9]{8}$");
  let flag = true;
  if (reg.test(phoneNum)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

export function getAppPlatform() {
  var browser = navigator.userAgent.toLowerCase();
  var agent = "";
  if (browser.match(/Alipay/i) == "alipay") {
    agent = "alipay";
  } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
    console.log("微信app的浏览器");
    agent = "wechat";
  } else if (browser.match(/line/i) == "line") {
    console.log("LINE的浏览器");
    agent = "line";
  } else {
    console.log("其它浏览器");
    agent = "other";
  }
  return agent;
}
