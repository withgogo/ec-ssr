import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import AppConfig from "./app.config";
const { keywords, description, title, port } = AppConfig;
export default defineNuxtConfig({
	// pages: false,
	devServer: {
		port: port,
	},
	// 配置动态打包文件中的数据env.
	runtimeConfig: {
		// apiSecret 只能在服务器端上访问
		// apiSecret: '123',
		// 需要写在public里面，否则客户端无法访问  public 命名空间中定义的，在服务器端和客户端都可以普遍访问
		public: {
			storeId: process.env.VUE_APP_STORE_ID,
			isApp: process.env.VUE_APP_IS_APP, //是否app
			ljPayBankCardSdk: process.env.VUE_APP_LJ_SDK_URL, // 新增信用卡sdk
			serverType: process.env.VUE_APP_LJ_SERVER_TYPE,
			lineProviderCode: process.env.VUE_APP_LINE_PROVIDER_CODE,  //line 登陆
			metapixel: {
				default: { id: process.env.VUE_PUBLIC_FBQ_ID },
			}
		},
	},
	modules: [
		"@element-plus/nuxt",
		"@vant/nuxt",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt", //持久化存储
		"nuxt-gtag",
		"nuxt-meta-pixel"
	],
	gtag: {
		id: process.env.VUE_PUBLIC_GTAG_ID,
		enabled: true
	},
	pinia: {
		autoImports: [
			"defineStore", // import { defineStore } from 'pinia'
		],
	},
	piniaPersistedstate: {
		storage: "localStorage", //持久化存储位子 localStorage
	},
	i18n: {
		vueI18n: "./i18n.config.ts",
	},
	elementPlus: {
		/** Options */
	},
	vant: {
		/** Options */
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width,initial-scale=1",
			title: title,
			meta: [
				{
					name: "apple-mobile-web-app-capable",
					content: "yes",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
				},
				{
					name: "description",
					content: description,
				},
				{
					name: "Keywords",
					content: keywords,
				},
				{ property: "og:type", content: "website" },
			],

			link: [
				{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }
			],
			script: [
				{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
				{
					// src: "./public/js/gtm.js",
				}
			]
		},
	},
	css: ["@/assets/css/index.scss", "aos/dist/aos.css"],
	alias: {
		//可以设置文件别名
		// "@img": "/assets/img",  //引入图片别名  这里很多原因导致img无法正常使用,img放在了public下面
	},
	vite: {
		css: {
			postcss: {
				plugins: [
					postcsspxtoviewport8plugin({
						unitToConvert: "px", // 要转化的单位
						viewportWidth: 375, // UI设计稿的宽度
						unitPrecision: 6, // 转换后的精度，即小数点位数
						propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
						viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
						fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
						selectorBlackList: ["el-",], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
						minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
						mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
						replace: true, // 是否转换后直接更换属性值
						include: [/mb(\/.*)?$/], // 只匹配mobile相关文件
						exclude: [/node_modules/,
							/pc(\/.*)?$/,
							/Pc[\s\S]*/,
							/pc[\s\S]*.vue/,
							/Tips(\/.*)?$/,
							/NavBar(\/.*)?$/,
							/EarlyBird(\/.*)?$/,
							/Goods(\/.*)?$/,
							/Group(\/.*)?$/,
							/CountDown(\/.*)?$/,
							/Member(\/.*)?$/,
							/Home(\/.*)?$/,
							/common.scss/,
							/Card(\/.*)?$/,
							/unsubscribe(\/.*)?$/,
							/LoginPopup(\/.*)?$/,//LoginPopup 没登陆重新登陆
							/element-plus/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
						landscape: false, // 是否处理横屏情况
					}),
				],
			},
			preprocessorOptions: {
				scss: {
					additionalData:
						'@import "@/assets/css/variable.scss";@import "@/assets/css/mixin.scss";',
					loadPaths: ["@/assets/css"],
				},
			},
		},
		// svg引入
		plugins: [
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "assets/svg")],
			}),
		],
	},
	nitro: {
		// 用于客户端代理
		devProxy: {
			"/api": {
				target: process.env.VUE_APP_BASE_API, // 这里是接口地址
				changeOrigin: true,
				prependPath: true,
			},
		},
	},
	imports: {
		dirs: ["composables/**"], //自动导入api下面的文件
	},
	compatibilityDate: '2024-08-09'
});
