<template>
    <footer>
        <div class="auto" style="width: 1200px;">
            <!-- <div class="footer-article fontW flex box-content-b">
                <p class="footer-article-content">1800+ google 4.9星超好評Cofit團隊</p>
                <p class="footer-article-content">全台最大營養師團隊，最懂你的購物商城</p>
                <p class="footer-article-content">Change behavior, live better</p>
            </div> -->
            <div class="flex align-items-center just-between servce-four box-content-b">
                <div class="servce-four-one flex align-items-center">
                    <el-image src="/img/home/transport.png" class="servce-four-one-icon"></el-image>
                    <span class="servce-four-one-text">
                        <!-- 全站滿1500免運 -->
                        {{ $t('foot.val1') }}</span>
                </div>
                <div class="servce-four-one flex align-items-center">
                    <el-image src="/img/home/zan.png" class="servce-four-one-icon-zan"></el-image>
                    <span class="servce-four-one-text">
                        <!-- 醫師,藥師,營養師 產品把關 -->
                        {{ $t('foot.val2') }}</span>
                </div>
                <div class="servce-four-one flex align-items-center">
                    <el-image src="/img/home/service.png" class="servce-four-one-icon"></el-image>
                    <span class="servce-four-one-text">
                        <!-- 一對一客服 -->
                        {{ $t('foot.val3') }}</span>
                </div>
                <div class="servce-four-one flex align-items-center">
                    <el-image src="/img/home/cup.png" class="servce-four-one-icon"></el-image>
                    <span class="servce-four-one-text">
                        <!-- 会员制度 -->
                        {{ $t('foot.val7') }}
                    </span>
                </div>
            </div>
        </div>
        <div style="background-color: #F5F5F5;">
            <div class="privacy-clause flex" style="width: 1200px;">
                <div style="width:500px" class="privacy-clause-logo">
                    <el-image src="/img/logo/footer-logo.png"></el-image>
                    <p>
                        <!--  2024 群健科技股份有限公司 COPYRIGHT CofitⓇ Healthcare Inc. ALL RIGHTS RESERVED -->
                        {{ $t('foot.val6') }}
                    </p>
                    ALL RIGHTS RESERVED
                </div>
                <div class="flex just-around flex1">
                    <div class="pointer">
                        <p @click="changeView('rule')" class="privacy-clause-text">
                            <!-- 隱私政策 -->
                            {{ $t('header.privacy') }}
                        </p>
                        <p @click="changeView('aboutUs')" class="privacy-clause-text">
                            <!-- 服務條款 -->
                            {{ $t('foot.val5') }}
                        </p>
                        <p @click="changeView('memberRule')" class="privacy-clause-text">
                            <!-- 会员制度 -->
                            {{ $t('foot.val7') }}
                        </p>
                    </div>
                    <div class="pointer">
                        <p @click="changeView('aboutUs')" class="privacy-clause-text">
                            <!-- 關於Cofit -->
                            {{ $t('foot.aboutCofit') }}
                        </p>
                        <p @click="changeView('memberRule')" class="privacy-clause-text">
                            <!-- 加入我們 -->
                            {{ $t('foot.addUs') }}

                        </p>
                    </div>
                    <div>
                        <p v-if="state.tel" class="privacy-clause-text">
                            <!-- 客服電話 -->
                            {{ $t("foot.phone") }} | {{state.tel}}
                        </p>
                        <p v-if="state.serviceTime" class="privacy-clause-text">
                            <!-- 服務時間 | 週一～週五10:00~18:00 -->
                            {{ $t("foot.serviceTime") }} | {{state.serviceTime}}
                        </p>
                        <p v-if="state.email"  class="privacy-clause-text">
                            <!-- 客服信箱 -->
                            {{ $t("foot.email") }} | <span class="pointer" @click="sendEmail()()">{{state.email}}</span>
                        </p>
                        <a v-if="state.storeLinechat" :href="storeLinechat" class="contact-line flex flex-center pointer">
                            <!-- 聯絡Line 客服 -->
                            {{ $t("foot.cellLine") }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElLoading } from 'element-plus'
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const router = useRouter();
const state=reactive({
	storeLinechat:null,
	email:null,
	serviceTime:null,
	tel:null
})
const sendEmail = () => {
  const mailtoLink = 'mailto:'+state.email;
  console.log("mailto",mailtoLink)
  window.location.href = mailtoLink;
}
// 点击 跳转其他的页面
const changeView = (type) => {
    switch (type) {
        case 'rule':         //隐私政策
            router.push({
                path: `/articles`,
                query: {
                    type: "privacy"
                }
            });
            break;
        case 'memberRule':        //会员规则
            // 代码块2
            router.push({
               path: `/articles`,
               query: {
                   type: "membership"
               }
            });
            break;
        case 'aboutUs':      // 关于我门
            router.push({
                path: `/articles`,
                query: {
                    type: "about_us"
                }
            });
            break;
        case 'theme':    // 切换主题
            let theme = useState("theme");
            let newTheme = theme.value == "pink" ? "dark" : "pink";
            useState("theme").value = newTheme;
            break;
        case 'loginOut':         // 登出
            loginOut().then((response) => {
                if (response.code == 200) {
                    showToast(response.data)
                    clearStorageOutLogin()
                }
            });
            break;
    }
}
const getStoreInfo = () => {
    let storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
    // console.log(storeInfo.codePrompt)
    if (storeInfo != null && storeInfo !== undefined) {
        state.storeLinechat = storeInfo.storeLinechat
		state.serviceTime=storeInfo.serviceTime
		state.email=storeInfo.storeEmail
		state.tel=storeInfo.storeTelephone
    }
};
onMounted(() => {
    getStoreInfo()
});
</script>

<style lang="scss" scoped>
.footer-article {
    flex-direction: column;
    align-items: center;
    color: #5e5873;
    // font-feature-settings: "clig" off, "liga" off;
    // font-family: "Noto Sans";
    font-size: 24px;
}

.footer-article-content {
    margin-bottom: 16px;
}

.servce-four {}

.servce-four-one {
    width: 286px;
    height: 80px;
    background-color: #00acc8;
    border-radius: 6px;
    background: rgba(0, 172, 200, 0.08);
}

.servce-four-one-icon {
    width: 55px;
    height: 67px;
}

.servce-four-one-icon-zan {
    width: 52px;
    height: 60px;
}

.servce-four-one-text {
    display: inline-flex;
    width: 182px;
    color: #2b6cb0;
    text-align: center;
    // font-feature-settings: "clig" off, "liga" off;
    // font-family: Outfit;
    font-size: 24px;
    font-weight: 600;
    margin: auto;
}

.privacy-clause {
    padding: 24px 100px 40px 100px;
    color: #5E5873;
    font-size: 16px;
    margin: 0 auto;
}

.privacy-clause-logo {
    padding: 10px;
}

.privacy-clause-text {
    margin-bottom: 12px;
}

.contact-line {
    border-radius: 27px;
    background: #39CD00;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    height: 42px;
    width: 144px;
}

.box-content-b {
    margin-bottom: 36px;
}
</style>