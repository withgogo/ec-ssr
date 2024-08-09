<template>
    <div>
        <!-- 登录-->
        <el-dialog align-center v-model="props.loginShow" :show-close="false" width="400px"
            :style="{ padding: '13px 0' }" >
            <div>
                <!-- 登录 -->
                <div :class="[layout == 'pc' ? 'pc-login-title' : 'h5-login-title']">
                    <!-- 确认身份 -->
                    {{ $t('login.identificatio') }}
                </div>
                <div class="h5-login-content">
                    <!-- 手机号  pos  支付登陆 -->
                    <div v-if="props.posPhoneNum" class="flex align-items-center mtop5">
                        <div class="pc-font14" style="width:70px">
                            <!--    手机号 -->
                            {{$t('address.mobile')}}:</div>
                        <div class="flex1 "  :class="[layout=='pc'?'pc-font14':'font14']">
                            {{ props.posPhoneNum }}
                        </div>
                    </div>
                    <!-- 手机号-->
                    <div   v-else class="flex align-items-center mtop5">
                        <div class="pc-font14" style="width:70px">
                            <!-- 手机号 -->
                            {{ $t('address.mobile') }}:</div>
                            <el-input class="pc-input-box custom-input " size="large" 
                            v-model="state.phoneNum"
                            @input="state.phoneNum = String(state.phoneNum).replace(/[^\d]/g, '')"
                            :placeholder="$t('message.pleaceWriteMobile')">
                            <template #prepend>
                                <el-select  size="large" style="width:92px" v-model="state.countryCode" @change="changeCountryCode"
                                    :placeholder="$t('verify.pleaseChoiceValue')">
                                    <el-option v-for="(item, index) in state.countries" :key="index"
                                        :value="item.phoneCode">
                                        {{ locale == "tw" ? item.countryNameTw : item.countryNameCn }}
                                        {{ item.phoneCode }}
                                    </el-option>
                                </el-select>
                            </template>

                        </el-input>
                            
                    </div>
                    <!-- 验证码 -->
                    <div class="flex align-items-center mtop5">
                        <div class="pc-font14" style="width:60px">
                            <!-- 验证码 -->
                            {{ $t('login.code') }}:</div>
                        <div class="h5-input-box flex1 flex  h5-input-give-code">
                            <!-- 请输入验证码 -->
                            <input class="h5-text-input" v-model="state.phoneCode"
                                :placeholder="$t('login.codeInput')" />
                            <div class="h5-give-code" @click="giveCode">
                                {{ state.vcodeText }}
                            </div>
                        </div>
                    </div>
                    <div class="flex just-around" style="margin-top: 20px;">
                        <div class="h5-footer-btn" @click="toHome">
                            <!-- 返回首页 -->{{ $t('button.backHomeBtn') }}
                        </div>
                        <div class="h5-footer-btn h5-footer-btn-confirm buy" @click="confirmLogin">
                            <!-- 确定 -->
                            {{ $t('button.confirm') }}
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
      
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { country } from '@/composables/utils/country.js'
import { phoneCodeLogin } from '@/composables/api/login'
import { showLoadingToast, closeToast, showConfirmDialog, showSuccessToast, showFailToast, showToast, showDialog } from 'vant';
import { useI18n } from "vue-i18n";
let { t } = useI18n();
let { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const props = defineProps({
    posPhoneNum: {
        type: String,
        required: false,
        default: ''
    },
    loginShow: {
        type: Boolean,
        default: false
    }
})

const state = reactive({
    storeId: getStoreId(),
    countries: country,
    countryCode: locale.value == 'tw' ? '+886' : '+86',
    phoneNum: null,
    phoneCode: null,
    vcodeText: t('login.getCode'),//获取验证码 
    vcodeTextShow: true
})
// let loginShow = ref(true)
let countryCode = ref(false)
const emit = defineEmits(['loginConfirm']) //获取父组件的方法emit
// 首页
const toHome = () => {
    router.push({
        url: '/home'
    })
}
// 清空手机号和验证码
const changeCountryCode=()=>{
    state.phoneCode=''
    state.phoneNum=''
}
let layout = useState("layout");
//  登陆确认
const confirmLogin = () => {
    // pos支付的时候不需要验证手机号
    if (!props.posPhoneNum) {
        if (!state.phoneNum) {
            // 请正确输入手机号
            showToast(t('login.truePhone'))
            return
        }
        let country = null
        console.log(state.countryCode)
        if (state.countryCode == '+886') {
            country = 'tw'
        } else if (state.countryCode == '+86') {
            country = 'zh'
        }
        if (!isValidPhone(state.phoneNum, country)) {
            // 请正确输入手机号
            showToast(t('login.truePhone'))
            return
        }
    }
    if (!state.phoneCode) {
        //请获取验证码
        showToast(t('login.placeGetCode'))
        return
    }
    // /登入中...
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t("login.loginLoading"),
    });
    let wholePhone = props.posPhoneNum ? props.posPhoneNum : state.countryCode + state.phoneNum

    let data = {
        mobile_code: state.phoneCode,
        mobile: wholePhone,
        store_id: state.storeId,
        country_code: state.countryCode
    }
    phoneCodeLogin(data).then(response => {
        closeToast()
        if (response.code == 200) {
            let token = response.logintoken
            setStorageData('login_token', token)
            getUser()
            //登入成功
            showToast(t('login.loginSuccess'))
            router.go(0)
        } else {
            showToast(response.msg)
        }
    })
}

//  获取用户信息
const getUser = () => {
    getUserInfo().then((response) => {
        if (response.code == 200) {
            let { data } = response;
            setStorageData('userInfo', data)
            const store = useTempStore()
            store.userName = data.nick_name || data.realName
            store.getCountCart()
        } else {
            showToast(response.data)
        }
    });
};

// 获取验证码
const giveCode = () => {
    if (!state.vcodeTextShow) {
        // 获取验证码频繁
        showToast(t('message.getVcodeFrequently'))
        return
    }
    let country = null
    console.log(state.countryCode)
    if (state.countryCode == '+886') {
        country = 'tw'
    } else if (state.countryCode == '+86') {
        country = 'zh'
    }
    // pos 支付是 手机是传过来
    if (!props.posPhoneNum) {
        if (!isValidPhone(state.phoneNum, country)) {
            // 请正确输入手机号
            showToast(t('login.truePhone'))
            return
        }
    }
    let wholePhone = state.countryCode + state.phoneNum
    let data = {
        mobile: !props.posPhoneNum ? wholePhone : props.posPhoneNum,
        store_id: state.storeId
    }
    //获取验证码中
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t('message.getVcodeing') + '...',
    });
    sendSms(data).then(response => {
        closeToast()
        if (response.code !== 200 && response.code !== '200') {
            showToast(response.data)
        } else {
            let t = 60;
            console.log(t)
            timer(t);
        }

    })
}
const timer = (t) => {
    if (t > 0) {
        state.vcodeText = t + "s"
        state.vcodeTextShow = false
        console.log(t)
        t--;
        var t1 = setTimeout(function () {
            timer(t)
        }, 1000)

    } else {
        // 获取验证码
        state.vcodeText = t('login.getCode')
        state.vcodeTextShow = true
    }
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/login/index.scss";
@import "@/assets/css/pc-style.scss";
</style>