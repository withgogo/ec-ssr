import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import zh from 'element-plus/es/locale/lang/zh-cn'
import tw from 'element-plus/es/locale/lang/zh-tw'

export default defineNuxtPlugin(async (NuxtApp) => {
  // nuxtApp包含的属性可看文档 https://nuxt.com/docs/guide/going-further/internals
  // 全局组件引入
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    NuxtApp.vueApp.component(key, component)
  }
  
  const Cookies = useCookie('lang')
  Cookies.value = Cookies.value || 'tw'
  
  NuxtApp.vueApp.use(ElementPlus, {
    locale: tw,
  })
})

