export function clearStorageOutLogin() {
  localStorage.removeItem("login_token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("URL");
  localStorage.removeItem("qiandaoTime");
  localStorage.removeItem("current_url");
  localStorage.removeItem("groupBigShow"); //团购显示的大图
  // const addressCvsStore = useCvsStore();
  // addressCvsStore.clearCvsStoreData();
  localStorage.removeItem("cvsStore"); //初始化的时候的默认的超商地址

}
export function clearStorageOrder() {
  const addressCvsStore = useCvsStore();
  addressCvsStore.clearCvsStoreData();
  localStorage.removeItem("cvsStore"); //初始化的时候的默认的超商地址
  localStorage.removeItem("storeAddress"); //超商地址选中的状态true false
  localStorage.removeItem("deliveryType"); //配送类型 是超商还是 宅配
  localStorage.removeItem("addrId"); //d地址的id
  localStorage.removeItem("Address"); //超商选中的地址
  localStorage.removeItem("supermarket"); //超商选中的地址
  localStorage.removeItem("name");
  localStorage.removeItem("mobile");
  localStorage.removeItem("invoiceInfo");
  localStorage.removeItem("invoice");
  localStorage.removeItem("packageList");
  localStorage.removeItem("FAMIC2C");
  localStorage.removeItem("UNIMARTC2C");
  localStorage.removeItem("HILIFEC2C");
  localStorage.removeItem("changeDelivery");
  localStorage.removeItem("urlSearch");
}

export function setStorageData(key, val) {
  if (val instanceof Object) {
    localStorage.setItem(key, JSON.stringify(val));
  } else {
    localStorage.setItem(key, val);
  }
}

export function getStorageData(key) {
  // let val = localStorage.getItem(key)
  // return JSON.parse(val)
}

// 获取getToken 是否存在
export function getToken(key, val) {
  if (localStorage.getItem("login_token")) {
    return true;
  } else {
    return false;
  }
}

// 获取用户信息
export function getUserInfoStorage(key, val) {
  if (localStorage.getItem("userInfo")) {
    let userInfo = localStorage.getItem("userInfo");
    // console.log(userInfo)
    return JSON.parse(userInfo);
  } else {
    return false;
  }
}
