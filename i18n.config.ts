
import zh from './lang/zh'
import tw from './lang/tw'

const messages = {
	zh,
	tw
}
// 思路 判断当前浏览器的语言然后设置i18n的语言，defineI1nCon8fig但是在页面初次加载时无法使用函数方法
export function getLanguage() {
	const chooseLanguage = useCookie('lang')
	if (chooseLanguage.value) return chooseLanguage.value == 'zh-cn' ?'zh': chooseLanguage.value == 'zh-tw' ? 'tw' : chooseLanguage.value
	// if has not choose language
	let  language = (navigator.language || navigator.browserLanguage).toLowerCase() 
	console.log('language=========-------', language)
	let getLang = language=='zh-cn' ? 'zh' : language=='zh-tw'?'tw' : language
	const locales = Object.keys(messages)
	// console.log('getLang====',getLang)
	for (const lang of locales) {
		  console.log('lang------',lang)
		if (getLang.indexOf(lang) > -1) {
			return lang
		}
	}
	return 'zh'
}

export default defineI18nConfig(() => ({
	legacy: false,
	globalInjection: true,
	locale: 'tw',
	messages: messages,
}))