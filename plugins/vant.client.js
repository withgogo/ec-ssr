import Vant from 'vant';
import zh from 'vant/es/locale/lang/zh-CN';
import tw from 'vant/es/locale/lang/zh-TW';

export default defineNuxtPlugin(async (NuxtApp) => {

  const Cookies = useCookie('lang')
  Cookies.value = Cookies.value || 'tw'
  
  NuxtApp.vueApp.use(Vant, {
    locale: Cookies.value,
  })
})

