
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import {showToast } from 'vant';
import { Header, RequestData, RequestResponse } from './utils/dataType';
// import { clearStorageOutLogin } from './utils/dataStorage';
// import { getDeviceType } from './utils/tools';
const useHttp = async (options: RequestData): Promise<RequestResponse> => {
	const router = useRouter();
	const route = useRoute();
	let layout = useState("layout");
	// let { t } = useI18n();
	// console.log('useI18n()===',useI18n())
	await nextTick(); //解决刷新页面useFetch无返回
	const runtimeConfig = useRuntimeConfig()
	let storeId: number = runtimeConfig.public.storeId
	let isApp: number = runtimeConfig.public.isApp //是否app
	let platform = getDeviceType()
	let PcPlatform: boolean = layout.value == 'pc' ? true : false
	let token = null
	if (process.client) {
		token = localStorage.getItem("login_token")
	  }
	let header: Header = {
		"token": token,
		"belong-store": storeId,
		"terminal": isApp == 1 ? `app|${platform}` : PcPlatform == true ? 'pc' : `h5|${platform}`,
		"is-app": isApp,
		"content-type": options.headers && options.headers["content-type"] ? options.headers["content-type"] : "application/x-www-form-urlencoded",
		"isSsr":1
	}
	options.headers = header
	const reqUrl = options.url;
	let params = {
		method: options?.method,
		headers: options.headers,
		responseType:options?.responseType?options.responseType:undefined 
	}
	if (options.headers["content-type"] == 'application/json' || options.data instanceof FormData) {
		params.body = options?.data
		if(options.data instanceof FormData){
			delete params.headers['content-type']
		}
	} else {
		params.params = options?.data
	}
	return new Promise((resolve, reject) => {
		$fetch(reqUrl, { ...params })
			.then((data, error) => {
				if (error) {
					reject(error);
					return;
				}
				const value = data;
				
				// console.log('value======',value)
				if (!value) {
					console.log("执行错误了");
					// 这里处理错误回调
					reject(value)
					// $router.replace('/reject/' + value.status)
				} else if (value.code === 102) {
					if(layout.value == 'pc'){
						ElMessage({
							message: value.msg,
							type: "error",
						});
					}else{
						showToast(value.msg)
					}
				}else if(value.code === 40014 || value.code === 44000){
					resolve(value);
					if(layout.value == 'pc'){
						// ElMessage(t('message.loginContent'))
						ElMessage('登录信息失效，请重新登录')
					}else{
						// showToast(t('message.loginContent'))
						showToast('登录信息失效，请重新登录')
					}
					clearStorageOutLogin()
					let routePath =  router.currentRoute.value.path
					if (routePath.indexOf('/TW') > -1) {
						router.push({
							path:'/login/login-code'
						})
					}
					else if(routePath.indexOf('/group-coupon') > -1 || routePath.indexOf('/dietitian-pay') > -1 || routePath.indexOf('/login-line') > -1){
					}
					else{
						// router.go(0)
					}

				} else {
					resolve(value);
				}
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

export function useHttpRequest(options: RequestData): Promise<RequestResponse> {
	return useHttp(options)
}

