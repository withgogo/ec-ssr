<template>
  <client-only>
    <div class="bgfff p-buttom">
      <!-- 收货方式 -->
      <div class="flex align-items-center mtop5">
        <span class="pc-font-right pc-font14">{{ $t("address.receiveType") }}:</span>
        <div v-for="(name, indexDelivery) in state.deliveryTypeList" :key="name.id">
          <div class="delivery-name pc-font14" @click="changeDelivery(name)" v-if="
            name.id == 2
              ? state.logisticsList && state.logisticsList?.indexOf('home') > -1
              : name.id == 3
                ? state.logisticsList && state.logisticsList?.indexOf('cvs') > -1
                : state.pickUp?.pickList.length > 0 &&
                state.logisticsList &&
                state.logisticsList?.indexOf('self') > -1
          " :class="state.deliveryType == name.id ? 'activedDelivery' : ''">
            {{ name.val }}
          </div>
        </div>
      </div>
      <!-- 宅配相关 -->
      <div class="flex mtop5" v-if="state.deliveryType == 2">
        <span class="pc-font14 pc-font-right"> {{ $t("address.deliveryAddress") }}:</span>
        <div style="width: 240px">
          <div class="addr-item-wrapper addr-item">
            <div class="inner-infos address-info inner-activ" v-if="state.defaultAddressInfo?.id">
              <!-- 收件人（电话） -->
              <div class="pc-font14 addr-hd">
                {{ state.defaultAddressInfo?.trueName }} ({{
                  state.defaultAddressInfo?.mobile
                }})
              </div>
              <!-- 地址 -->
              <div class="pc-font12">
                <span>{{ state.defaultAddressInfo?.area }}</span>
                <span class="pc-font12">{{ state.defaultAddressInfo?.area_info }}</span>
              </div>
              <div class="pc-font12" style="margin-top: 5px">
                {{ state.defaultAddressInfo?.telephone }}
              </div>
            </div>
          </div>
          <div class="flex just-between">
            <!-- 所有地址 -->
            <el-button type="primary" link @click="showAllAddress" v-if="state.addressList.length > 0">
              {{ $t("address.allAddress") }}
            </el-button>
            <!-- 使用新地址 -->
            <el-button type="primary" link @click="addAddress" >
              {{ $t("address.useNewAddress") }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- 自提点相关 -->
      <div class="mtop5" v-if="state.deliveryType == 1">
        <div class="flex align-items-center">
          <span class="pc-font14 pc-font-right">{{ $t("order.selfDelivery.chooseSelfDelivery") }}:</span>
          <!-- 自提点选择 -->
          <el-select v-model="state.pickUp.pickUpAddressId" @change="pickChange" style="width: 200px"
            :placeholder="$t('verify.pleaseChoiceValue')">
            <el-option v-for="pick in state.pickUp?.pickList" :key="pick.id" :label="pick.daName" :value="pick.id" />
          </el-select>
        </div>
        <div class="flex align-items-center" v-if="state.pickUp?.pickUpAddress">
          <span class="pc-font-right pc-font14"></span>
          <div class="">
            <!-- 联系人 -->
            <div class="mtop1">
              {{ $t("order.selfDelivery.contactPerson") }}:{{
                state.pickUp?.pickUpAddress?.daContactUser
              }}
            </div>
            <!-- 联系电话 -->
            <div class="mtop1">
              {{ $t("order.selfDelivery.contactPhone") }}:{{
                state.pickUp?.pickUpAddress?.daTel
              }}
            </div>
            <!-- 服务时间 -->
            <div class="mtop1 flex">
              {{ $t("order.selfDelivery.serviceTime") }}:
              <div v-html="state.pickUp?.pickUpAddress.daServiceDay"></div>
            </div>
            <!-- 服务点 -->
            <div class="mtop1">
              {{ $t("order.selfDelivery.pickupAddress") }}:{{
                state.pickUp?.pickUpAddress?.daAddress
              }}
            </div>
          </div>
        </div>
      </div>
      <!-- 超商 -->
      <div v-if="state.deliveryType == 3" class="flex align-items-center mtop5">
        <span class="pc-font-right pc-font14">
          <!-- 超商 -->
          {{ $t("order.supermarket") }}:</span>
        <el-radio-group v-model="cvsStore.deliveryAddressId" checked-color="#00ACC8" icon-size="18px"
          @change="cvsStoreChange" class="flex">
          <el-radio :value="delivery.ecc_code" v-for="delivery in cvsStore.superdeliveryList" class="mright10"
            :key="delivery.ecc_code">
            {{ delivery.companyName }}
          </el-radio>
        </el-radio-group>
      </div>
      <!-- 门市资讯 -->
      <div v-if="state.deliveryType == 3" class="flex align-items-center mtop5 pc-font14">
        <span class="pc-font-right">{{ $t("address.storeInformation") }}:</span>
        <div v-if="cvsStore.deliveryAddress">
          <div>{{ cvsStore.deliveryAddress?.CVSStoreName }}</div>
          <div>{{ cvsStore.deliveryAddress?.CVSAddress }}</div>
          <div>{{ cvsStore.deliveryAddress?.CVSTelephone }}</div>
        </div>
        <el-button style="margin-left: 20px" class="pc-font14" type="primary" @click="choiceStore()">{{
          $t("order.chooseShop") }}</el-button>
      </div>
      <!-- 发票信息 -->
      <div class="flex mtop5">
        <span class="pc-font-right pc-font14">{{ $t("invoice.invoiceInfo") }}:</span>
        <div style="width: 240px">
          <div class="addr-item-wrapper">
            <div class="inner-infos address-info inner-activ" v-if="state.invoiceInfo">
              <el-tag v-if="state.invoiceInfo?.invoice_type == 0">{{
                $t("invoice.personType")
                }}</el-tag>
              <el-tag v-if="state.invoiceInfo?.invoice_type == 1">{{ $t("invoice.companyType") }}
              </el-tag>
              <el-tag v-if="state.invoiceInfo?.carruer_type == 1">
                {{ $t("invoice.emailCarruerNum") }}
              </el-tag>
              <div class="pc-font14 addr-hd" style="margin-top: 5px">
                {{ state.invoiceInfo?.rcv_name }}
                <span v-if="state.invoiceInfo?.rcv_phone">({{ state.invoiceInfo?.rcv_phone }})</span>
              </div>
              <div class="pc-font12">
                <span>{{ state.invoiceInfo?.rcv_email }}</span>
                <div v-if="state.invoiceInfo?.carruer_type == 2">
                  <!-- 自然人凭证载具 -->
                  {{ $t("invoice.peopleCarruerNum") }}:{{
                    state.invoiceInfo?.carruer_num
                  }}
                </div>
                <!-- 手机条码载具 -->
                <div v-if="state.invoiceInfo?.carruer_type == 3">
                  {{ $t("invoice.tellCarruerNum") }}:{{ state.invoiceInfo?.carruer_num }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex just-between">
            <el-button type="primary" link @click="showAllInvoice" v-if="state.invoiceList.length > 0">
              {{ $t("invoice.allInvoice") }}
            </el-button>
            <!-- 使用新发票 -->
            <el-button type="primary" link @click="addInvoice" v-if="state.addressList.length > 0">
              {{ $t("invoice.useNewInvoice") }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- 配送时段 -->
      <div v-if="state.deliveryType == 2" class="flex mtop5 align-items-center">
        <span class="pc-font-right pc-font14">{{ $t("order.deliveryTime") }}:</span>
        <el-radio-group @change="choiceDeliveryTime" v-model="deliveryTime" checked-color="#00ACC8" icon-size="18px"
          class="flex">
          <el-radio :value="13">
            {{ $t("order.thirteen") }}
          </el-radio>
          <el-radio :value="14"> 14～18 </el-radio>
          <el-radio :value="0">
            {{ $t("order.noLimitTime") }}
          </el-radio>
        </el-radio-group>
      </div>
      <!-- 收货人/手机号 -->
      <div v-if="state.deliveryType == 3 || state.deliveryType == 1">
        <!-- pos支付才有 -->
        <div class="flex mtop5 align-items-center" v-if="props.type == 'posPay'">
          <span class="pc-font-right pc-font14"></span>
          <!-- 同订购人 -->
          <el-checkbox value="Online activities" @click="choiceSamePurchasePeople">
            {{ $t("address.samePurchasePeople") }}
          </el-checkbox>
        </div>
        <div class="flex mtop5 align-items-center">
          <span class="pc-font-right pc-font14">{{ $t("address.receiveName") }}:</span>
          <el-input v-model="state.user.name" @change="userInfoChange" style="width: 230px" />
        </div>
        <div class="flex mtop5 align-items-center">
          <span class="pc-font-right pc-font14">{{ $t("address.mobile") }}:</span>
          <el-input v-model="state.user.mobile" @change="userInfoChange" style="width: 230px" />
        </div>
      </div>
      <!-- 提示 -->
      <div class="flex mtop5 align-items-center">
        <span class="pc-font-right pc-font14"></span>
        <div class="price pc-font12">{{ $t("address.receiverTip") }}</div>
      </div>
    </div>

    <!-- 选择发票 start -->
    <el-dialog :title="$t('invoice.chooseInvoice')" :close-on-click-modal="false" :visible.sync="allInvoiceVisible"
      width="900px" v-model="allInvoiceVisible">
      <div class="address-list">
        <div class="addr-item-wrapper" @click="" v-for="invoice in state.invoiceList" :key="invoice.id">
          <div class="inner-infos address-info" :class="state.temporaryUsedInvoice && state.temporaryUsedInvoice?.id == invoice.id
              ? 'inner-activ'
              : 'inner-infos-default'
            " @click="chooseNewInvoice(invoice)">
            <el-tag v-if="invoice.invoice_type == 0">{{
              $t("invoice.personType")
              }}</el-tag>
            <el-tag v-if="invoice.invoice_type == 1">{{
              $t("invoice.companyType")
              }}</el-tag>
            <el-tag v-if="invoice.carruer_type == 1">{{
              $t("invoice.emailCarruerNum")
              }}</el-tag>
            <div class="pc-font14 addr-hd" style="margin-top: 5px">
              {{ invoice.rcv_name }}
              <span v-if="invoice.rcv_phone">({{ invoice.rcv_phone }})</span>
            </div>
            <div class="pc-font12">
              <span>{{ invoice.rcv_email }}</span>
              <div v-if="invoice.carruer_type == 2">
                {{ $t("invoice.peopleCarruerNum") }}:{{ invoice.carruer_num }}
              </div>
              <div v-if="invoice.carruer_type == 3">
                {{ $t("invoice.tellCarruerNum") }}:{{ invoice.carruer_num }}
              </div>
            </div>
          </div>
          <!--默认发票-->
          <div class="default-tip pc-font12" v-if="invoice.is_default == 1">
            {{ $t("invoice.defaultVal") }}
          </div>
        </div>
      </div>

      <span slot="footer" class="flex flex-center">
        <el-button @click="closeInvoiceAddUse">{{ $t("button.cancel") }}</el-button>
        <el-button type="primary" @click="confirmUsedNewInvoice">{{
          $t("button.confirm")
          }}</el-button>
      </span>
    </el-dialog>
    <!-- 选择发票 end -->
    <!-- 选择地址 start -->
    <el-dialog :title="$t('address.deliveryAddress')" :close-on-click-modal="false" :visible.sync="allAddressVisible"
      width="900px" v-model="allAddressVisible">
      <div class="address-list">
        <div class="addr-item-wrapper" v-for="address in state.addressList" :key="address.id">
          <div @click="chooseNewAddress(address)" class="inner-infos address-info" :class="state.temporaryUsedAddress && state.temporaryUsedAddress?.id == address.id
              ? 'inner-activ'
              : 'inner-infos-default'
            ">
            <div class="pc-font14 addr-hd">
              {{ address.trueName }} ({{ address.mobile }})
            </div>
            <div class="pc-font12">
              <span>{{ address.area }}</span> <span>{{ address.area_info }}</span>
            </div>
            <div class="pc-font12" style="margin-top: 5px">{{ address.telephone }}</div>
          </div>
          <div class="default-tip pc-font12" v-if="address.default_val == 1">
            {{ $t("address.defaultVal") }}
          </div>
        </div>
      </div>
      <span slot="footer" class="flex flex-center">
        <el-button @click="closeAddressAddUse">{{ $t("button.cancel") }}</el-button>
        <el-button type="primary" @click="confirmUsedNewAddress">{{
          $t("button.confirm")
          }}</el-button>
      </span>
    </el-dialog>
    <!-- 选择地址 end -->

    <!-- 新增地址 -->
    <el-dialog align-center v-model="state.isAddressShow" :title="$t('address.add')" width="500px"
      :close-on-click-modal="false" :show-close="false">
      <div class="flex flex-center">
        <el-form label-width="100px" style="width: 440px" :model="state.addressInfo" ref="rulesAddressForm"
          :rules="rules">
          <!--同订购人  -->
          <el-form-item>
            <el-checkbox @change="choiceCheck" :checked="state.purchaser">
              {{ $t("address.samePurchasePeople") }}
            </el-checkbox>
          </el-form-item>
          <!-- 收件人-->
          <el-form-item :label="$t('address.receiveName') + ':'" prop="trueName">
            <el-input v-model.trim="state.addressInfo.trueName" />
          </el-form-item>
          <!-- 手機號碼 -->
          <el-form-item :label="$t('address.mobile') + ':'" prop="mobile">
            <el-input v-model.trim="state.addressInfo.mobile" />
          </el-form-item>
          <!-- 地址 -->
          <el-form-item :label="$t('address.areaChoice') + ':'">
            <el-input v-model="state.addressInfo.areaId" style="display: none"></el-input>
            <el-select :placeholder="$t('verify.pleaseChoiceValue')" v-if="state.provinceId" v-model="state.provinceId"
              style="max-width: 110px">
              <el-option v-for="item in state.province" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select :placeholder="$t('verify.pleaseChoiceValue')" v-model="state.cityId" @change="changeCity"
              style="max-width: 110px">
              <el-option v-for="item in state.city" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select :placeholder="$t('verify.pleaseChoiceValue')" v-model="state.areaId" @change="changeArea"
              style="max-width: 110px">
              <el-option v-for="item in state.area" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 详细地址 -->
          <el-form-item :label="$t('address.detail') + ':'" prop="areaInfo">
            <el-input type="textarea" show-word-limit maxlength="60" :rows="2" v-model="state.addressInfo.areaInfo"
              :placeholder="$t('address.placeAddress')">
            </el-input>
          </el-form-item>
          <!--邮政编码  -->
          <el-form-item :label="$t('address.zip') + ':'">
            <el-input v-model.trim="state.addressInfo.zip" disabled :placeholder="$t('address.zipCode')" />
          </el-form-item>
          <!-- 默认 -->
          <el-form-item>
            <el-switch :active-value="1" :inactive-value="0" v-model="state.addressInfo.defaultVal"
              :active-text="$t('address.setDef')">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="flex flex-center">
        <el-button @click="cancelAddress()">{{ $t("button.cancel") }}</el-button>
        <el-button type="primary" @click="saveAddressUpdate()">{{
          $t("button.save")
          }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增发票 -->
    <el-dialog align-center v-model="state.isInvoiceShow" :title="$t('invoice.addSubmit')" width="600px"
      :close-on-click-modal="false" :show-close="false">
      <div>
        <div class="flex flex-center">
          <el-radio-group v-model="state.formatInvoice.invoiceType" @change="changeInvoiceType()">
            <!--个人发票  -->
            <el-radio :value="0">{{ $t("invoice.personType") }}</el-radio>
            <!-- 公司发票 -->
            <el-radio :value="1">{{ $t("invoice.companyType") }}</el-radio>
          </el-radio-group>
        </div>
        <div class="flex flex-center">
          <el-form label-width="130px" style="width: 440px" :model="state.formatInvoice" ref="rulesInvoiceForm"
            :rules="rulesInvoice">
            <!--  统一编号-->
            <el-form-item v-if="state.formatInvoice.invoiceType == '1'" :label="$t('invoice.number') + ':'"
              prop="taxpayerCode">
              <el-input :placeholder="$t('invoice.numberMessage')" v-model.trim="state.formatInvoice.taxpayerCode"
                maxlength="8" show-word-limit />
            </el-form-item>
            <!-- 单位抬头 -->
            <el-form-item v-if="state.formatInvoice.invoiceType == '1'" :label="$t('invoice.companyName') + ':'"
              prop="trueName">
              <el-input v-model.trim="state.formatInvoice.trueName" :placeholder="$t('invoice.companyNameMessage')" />
            </el-form-item>
            <!--  客户名称-->
            <el-form-item v-else :label="$t('invoice.userName') + ':'" prop="trueName">
              <el-input v-model.trim="state.formatInvoice.trueName" :placeholder="$t('invoice.userNameMessage')" />
            </el-form-item>
            <!-- 电话 -->
            <el-form-item :label="$t('invoice.tell') + ':'" prop="mobile">
              <el-input v-model.trim="state.formatInvoice.mobile" :placeholder="$t('invoice.tellMessage')" />
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="emai:" prop="email">
              <el-input v-model.trim="state.formatInvoice.email" :placeholder="$t('invoice.emailMessage')" />
            </el-form-item>
            <!-- 城市 -->
            <el-form-item v-if="state.formatInvoice.invoiceType == '1'" :label="$t('invoice.city') + ':'"
              prop="area_info">
              <el-select :placeholder="$t('verify.pleaseChoiceValue')" v-model="state.cityId" @change="changeCity"
                style="max-width: 110px">
                <el-option v-for="item in state.city" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select :placeholder="$t('verify.pleaseChoiceValue')" v-model="state.areaId" style="max-width: 110px">
                <el-option v-for="item in state.area" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item v-if="state.formatInvoice.invoiceType == '1'" :label="$t('address.detail') + ':'"
              prop="rcv_area_info">
              <el-input type="textarea" show-word-limit maxlength="60" :rows="2"
                v-model="state.formatInvoice.rcvAreaInfo" :placeholder="$t('address.placeAddress')">
              </el-input>
            </el-form-item>
            <!--  电子发票/手机载具/自然人凭证-->
            <el-form-item v-if="state.formatInvoice.invoiceType == '0'">
              <el-radio-group v-model="state.formatInvoice.carruerType" @change="invoiceTypeChange"
                v-for="(item, index) in state.receiptList">
                <el-radio :value="item.id">{{ item.val }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="
              state.formatInvoice.carruerType == 2 &&
              state.formatInvoice.invoiceType == '0'
            " :label="$t('invoice.peopleCarruerNum') + ':'" prop="peopleCarruerNum">
              <el-input :placeholder="$t('invoice.carruerNum2')" v-model.trim="state.formatInvoice.peopleCarruerNum" />
              <el-image class="evidence-img" src="/img/invoice/invoice2.png"></el-image>
            </el-form-item>
            <el-form-item v-if="
              state.formatInvoice.carruerType == 3 &&
              state.formatInvoice.invoiceType == '0'
            " :label="$t('invoice.tellCarruerNum') + ':'">
              <el-input :placeholder="$t('invoice.carruerNum1')" v-model.trim="state.formatInvoice.tellCarruerNum" />
              <el-image class="evidence-img" src="/img/invoice/invoice1.png"></el-image>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="flex flex-center">
        <el-button @click="cancelInvoice()">{{ $t("button.cancel") }}</el-button>
        <el-button type="primary" @click="saveInvoiceUpdate()">{{
          $t("button.update")
          }}</el-button>
      </div>
    </el-dialog>
  </client-only>
</template>
<script setup>
import { onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
let { t } = useI18n();
let { locale } = useI18n();
import { ElMessage, ElLoading, ElMessageBox } from "element-plus";
import { queryAddressList } from "@/composables/api/user/address";
import { vatinvoiceList } from "@/composables/api/user/invoice";
const trueName = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t("address.placeReceiveName")));
  }
  let nameLength = validUserName(value, 2);
  if (nameLength < 4 || nameLength > 10) {
    callback(new Error(t("address.userNameInvalid")));
  } else {
    callback();
  }
};
const mobile = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t("address.placeMobile")));
  } else if (!isValidPhone(value, locale.value)) {
    callback(new Error(t("address.mobileRule")));
  } else {
    callback();
  }
};
const areaInfo = (rule, value, callback) => {
  let chinese = new RegExp("[\\u4e00-\\u9fa5]+", "g");
  if (!value) {
    callback(new Error(t("address.placeAddress")));
  } else if (value.length < 5) {
    callback(new Error(t("address.areaInfoLengthVerify")));
  } else if (!chinese.test(value)) {
    callback(new Error(t("address.areaInfoVerify")));
  } else {
    callback();
  }
};
const taxpayerCode = (rule, value, callback) => {
  let verify = /\d{8}$/;
  if (!value) {
    callback(new Error(t("invoice.numberMessage")));
  } else if (!verify.test(value)) {
    callback(new Error(t("invoice.number") + t("invoice.tipsLessThan")));
  } else {
    callback();
  }
};
const peopleCarruerNum = (rule, value, callback) => {
  let reg = /^[a-zA-Z]{2}[0-9]{14}$/;
  if (!value) {
    callback(new Error(t("invoice.peopleCarruerNumEmpty")));
  } else if (!reg.test(value)) {
    callback(new Error(t("invoice.peopleCarruerNumError")));
  } else {
    callback();
  }
};

const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!value) {
    callback(new Error(t("verify.pleaseEnterValue") +'email'));
  } else if (!mailReg.test(value)) {
    callback(new Error(t("placeholder.checkEmail")));
  } else {
    callback();
  }
};
const props = defineProps({
  deliveryType: {
    type: Number,
    default: 2,
    required: false,
  },
  logisticsList: {
    type: String,
    required: false,
    default: null,
  },
  defaultAddressInfo: {
    type: Object,
    required: false,
    default: {},
  },
  pickUp: {
    type: Object,
    required: false,
    default: {},
  },
  cvsStore: {
    type: Object,
    required: false,
    default: {},
  },
  invoiceInfo: {
    type: Object,
    required: false,
    default: {},
  },
  deliveryTime: {
    type: Number,
    required: false,
    default: 13,
  },
  user: {
    type: Object,
    required: false,
    default: {},
  },
  type: {
    type: String,
    required: false,
    default: null,
  },
  // 订购人信息
  userInfo: {
    type: Object,
    required: false,
    default: {},
  },
});

//props数据不能修改，会报错，重新声明
const deliveryTime = ref(13);
// 公共数据
let state = reactive({
  isChecked: false,
  temporaryUsedInvoice: null, //全部发票
  temporaryUsedAddress: null, //全部地址
  deliveryTypeList: [
    {
      id: 2,
      val: t("order.arriveHome"),
    },
    {
      id: 3,
      val: t("order.supermarket"),
    },
    {
      id: 1,
      val: t("order.selfDelivery.name"),
    },
  ],
  deliveryType: "",
  logisticsList: "",
  defaultAddressInfo: {},
  addressList: [],
  pickUp: {
    selfPickupActive: false, // 自提下拉地址显示
    pickUpAddressId: null,
    pickList: [],
    pickUpAddress: {},
  },
  cvsStore: {},
  invoiceList: [],
  invoiceInfo: {},
  deliveryTime: "",
  user: "",
  type: "",
  userInfo: "", //订购人信息

  isAddressShow: false,
  addressInfo: {
    id: "",
    trueName: "",
    mobile: "",
    areaId: "",
    areaInfo: "",
    zip: "",
    defaultVal: 0,
  },
  purchaser: false, //同订购人
  province: [], //省
  city: [], //市
  area: [], // 区
  provinceId: null, //省
  cityId: null, //市
  areaId: null,

  isInvoiceShow: false,
  formatInvoice: {
    id: "",
    invoiceType: 0, //发票类型
    carruerType: 1, //载具
    peopleCarruerNum: "",
    tellCarruerNum: "",
    mobile: "",
    trueName: "",
    email: "",
    taxpayerCode: "",
    rcvAreaId: "",
    rcvAreaInfo: "",
  },
});
const rules = reactive({
  trueName: [
    {
      required: true,
      trigger: "blur",
      validator: trueName,
    },
  ],
  mobile: [
    {
      required: true,
      trigger: "blur",
      validator: mobile,
    },
  ],

  areaInfo: [
    {
      required: true,
      trigger: "blur",
      validator: areaInfo,
    },
  ],
});
const rulesInvoice = reactive({
  trueName: [
    {
      required: true,
      trigger: "blur",
      message: t("invoice.userOrCompanyMessage"),
    },
  ],
  mobile: [
    {
      required: true,
      trigger: "blur",
      validator: mobile,
    },
  ],
  taxpayerCode: [
    {
      required: true,
      trigger: "blur",
      validator: taxpayerCode,
    },
  ],
  rcvAreaInfo: [
    {
      required: true,
      trigger: "blur",
      validator: areaInfo,
    },
  ],
  email: [
    {
      required: true,
      trigger: "blur",
      validator: checkEmail,
    },
  ],
  peopleCarruerNum: [
    {
      required: true,
      trigger: "blur",
      validator: peopleCarruerNum,
    },
  ],
});

let rulesAddressForm = ref(null);
let rulesInvoiceForm = ref(null);
const emit = defineEmits([
  "changeDelivery",
  "cvsStoreChange",
  "choiceStore",
  "confirmUsedNewAddress",
  "pickChange",
  "confirmUsedNewInvoice",
  "choiceDeliveryTime",
  "userInfoChange",
  "choiceSamePurchasePeople",
]);

// 是否选中同订购人
const choiceSamePurchasePeople = () => {
  state.isChecked = !state.isChecked;
  // 有值的时候填写
  if (state.isChecked == true && state.userInfo.realName) {
    state.user.name = state.userInfo.realName;
    state.user.mobile = state.userInfo.mobile;
  } else if (state.isChecked == true && !state.userInfo.realName) {
    state.isChecked = false;
    ElMessage.warning(t("message.orderUserNullMsg"));
  }
  emit("choiceSamePurchasePeople", state.isChecked);
};
// 宅配地址
const getAddressList = (id) => {
  queryAddressList().then((response) => {
    if (response.code == 200) {
      state.addressList = response.data;
      //这里是使用新地址，保存成功之后获取的新地址的数据
      if (id) {
        let target = response.data.find((item) => item.id == Number(id));
        if (target) {
          state.temporaryUsedAddress = target;
          confirmUsedNewAddress();
        }
      }
    }
  });
};

//超商/全家选择
const cvsStoreChange = () => {
  emit("cvsStoreChange");
};
//发票列表
const getVatinvoiceList = (id) => {
  vatinvoiceList().then((response) => {
    if (response.code == 200) {
      state.invoiceList = response.data;
      //这里是使用新地址，保存成功之后获取的新地址的数据
      if (id) {
        let target = response.data.find((item) => item.id == Number(id));
        if (target) {
          state.temporaryUsedInvoice = target;
          confirmUsedNewInvoice();
        }
      }
    }
  });
};

// 收件人信息变化
const userInfoChange = () => {
  emit("userInfoChange", state.user);
};

// 选择门市
const choiceStore = () => {
  emit("choiceStore");
};

//配送时间选择
const choiceDeliveryTime = () => {
  emit("choiceDeliveryTime", deliveryTime.value);
};
//自提点选择
const pickChange = () => {
  emit("pickChange");
};

//发票选中
// 确认使用新发票
let confirmUsedNewInvoice = () => {
  // temporaryUsedInvoice选中发票
  emit("confirmUsedNewInvoice", state.temporaryUsedInvoice);
  closeInvoiceAddUse();
};
// 关闭发票添加
let closeInvoiceAddUse = () => {
  state.temporaryUsedInvoice = null;
  allInvoiceVisible.value = false;
};

//地址选中
// 确认使用新地址
let confirmUsedNewAddress = () => {
  // temporaryUsedAddress被选中的地址
  emit("confirmUsedNewAddress", state.temporaryUsedAddress);
  closeAddressAddUse();
};
// 关闭地址添加
let closeAddressAddUse = () => {
  state.temporaryUsedAddress = null;
  allAddressVisible.value = false;
};
//收件人
//收件手机
// 全部发票
let allInvoiceVisible = ref(false);
// 选择地址  全部地址
let allAddressVisible = ref(false);
// 所有发票
// 全部发票显示
let showAllInvoice = () => {
  if (state.invoiceInfo?.id) {
    state.temporaryUsedInvoice = state.invoiceInfo;
  }
  allInvoiceVisible.value = true;
};

// 发票选中
let chooseNewInvoice = (row) => {
  state.temporaryUsedInvoice = row;
};
// 全部地址显示
let showAllAddress = () => {
  allAddressVisible.value = true;
  if (state.defaultAddressInfo.id) {
    // 默认选中，页面展示的地址
    state.temporaryUsedAddress = state.defaultAddressInfo;
  }
};
// 地址选中
let chooseNewAddress = (row) => {
  state.temporaryUsedAddress = row;
};

// 改变配送方式
const changeDelivery = (item) => {
  emit("changeDelivery", item.id);
};

// 使用新地址
const addAddress = () => {
  state.isAddressShow = true;
  getAreaInfo();
};
// 获取台湾地址的省市区
const getAreaInfo = () => {
  getArea().then((response) => {
    if (response.code == 200) {
      state.province = response.data;
      state.provinceId = response.data[0].value;
      state.city = response.data[0].children;
    }
  });
};
// 改变市区的时候
const changeCity = () => {
  state.areaId = null;
  state.addressInfo.areaId = null; //地址的区
  let areaTarget = state.city.find((item) => item.value == state.cityId);
  if (areaTarget) {
    state.area = areaTarget.children;
  }
};
// 修改区的时候获取区号
const changeArea = () => {
  let target = state.area.find((item) => item.value == state.areaId);
  state.addressInfo.areaId = state.areaId;
  if (target) {
    state.addressInfo.zip = target.zipcode;
  }
};
//同订购人
const choiceCheck = () => {
  state.purchaser = !state.purchaser;
  if (state.purchaser == true) {
    let userInfo = getUserInfoStorage();
    let mobile = null;
    if (userInfo.mobile.indexOf("+86") > -1) {
      mobile = userInfo.mobile.replace("+86", "");
    } else if (userInfo.mobile.indexOf("+886") > -1) {
      mobile = userInfo.mobile.replace("+886", "");
    }
    state.addressInfo.trueName = userInfo.realName;
    if (mobile.startsWith("9")) {
      state.addressInfo.mobile = "0" + mobile;
    } else {
      state.addressInfo.mobile = mobile;
    }
  } else {
    state.addressInfo.mobile = "";
    state.addressInfo.trueName = "";
  }
};
// 取消
const cancelAddress = () => {
  state.isAddressShow = false;
  rulesAddressForm.value.resetFields();
  state.cityId = null;
  state.area = null;
  state.areaId = null;
  state.purchaser = false;
  let addressInfo = {
    id: "",
    trueName: "",
    mobile: "",
    areaId: "",
    areaInfo: "",
    zip: "",
    defaultVal: 0,
  };
  state.addressInfo = addressInfo;
};
// 地址保存
const saveAddressUpdate = () => {
  rulesAddressForm.value.validate((valid, fields) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: t("message.saveLoading"),
        background: "rgba(0, 0, 0, 0.7)",
      });
      let data = {
        id: state.addressInfo.id || "",
        trueName: state.addressInfo.trueName,
        mobile: state.addressInfo.mobile,
        area_id: state.addressInfo.areaId,
        area_info: state.addressInfo.areaInfo,
        zip: state.addressInfo.zip,
        default_val: state.addressInfo.defaultVal,
      };
      saveAddress(data).then((response) => {
        loading.close();
        if (response.code == 200) {
          cancelAddress();
          getAddressList(response.data);
          ElMessage.success(t("message.saveSuccessMsg"));
        } else {
          ElMessage.error(response.data);
        }
      });
    }
  });
};

// 使用新发票
const addInvoice = () => {
  state.isInvoiceShow = true;
  getAreaInfo();
};
// 取消发票
const cancelInvoice = () => {
  rulesInvoiceForm.value.resetFields();
  state.cityId = null;
  state.area = null;
  state.areaId = null;
  state.isInvoiceShow = false;
  let formatInvoice = {
    id: "",
    invoiceType: 0, //发票类型
    carruerType: 1, //载具
    peopleCarruerNum: "",
    tellCarruerNum: "",
    mobile: "",
    trueName: "",
    email: "",
    taxpayerCode: "",
    rcvAreaId: "",
    rcvAreaInfo: "",
  };
  state.formatInvoice = formatInvoice;
};
// type变化时
const changeInvoiceType = () => {
  rulesInvoiceForm.value.resetFields();
};
// 载具变化时
const invoiceTypeChange = () => {
  state.formatInvoice.peopleCarruerNum = "";
  state.formatInvoice.tellCarruerNum = "";
};
//
// 保存 发票
const saveInvoiceUpdate = () => {
  rulesInvoiceForm.value.validate((valid, fields) => {
    if (valid) {
      // /AB201C9
      if (state.formatInvoice.invoiceType == 0 && state.formatInvoice.carruerType == 3) {
        let reg = /^\/[a-zA-Z0-9+-.]{7}$/;
        if (!state.formatInvoice.tellCarruerNum) {
          ElMessage.error(t("invoice.tellCarruerNumEmpty"));
          return false;
        } else if (!reg.test(state.formatInvoice.tellCarruerNum)) {
          ElMessage.error(t("invoice.tellCarruerNumError"));
          return false;
        } else {
          //手机条形码验证
          let data = {
            store_id: getStoreId(),
            currier_num: state.formatInvoice.tellCarruerNum,
          };
          checkMobileCarrier(data).then(function (res) {
            if (res.code != 200) {
              ElMessage.error(res.data);
              return false;
            } else {
              saveInvoice();
            }
          });
        }
      } else {
        saveInvoice();
      }
    }
  });
};
const saveInvoice = () => {
  const loading = ElLoading.service({
    lock: true,
    text: t("message.saveLoading"),
    background: "rgba(0, 0, 0, 0.7)",
  });
  let carruer_num =
    state.formatInvoice.carruerType == 2
      ? state.formatInvoice.peopleCarruerNum
      : state.formatInvoice.carruerType == 3
        ? state.formatInvoice.tellCarruerNum
        : "";
  let data = {
    id: state.formatInvoice.id || "",
    order_id: "",
    taxpayerCode: state.formatInvoice.taxpayerCode, //(公司)纳税人代码
    invoice_type: state.formatInvoice.invoiceType, //发票类型 0个人 1公司
    rcv_name: state.formatInvoice.trueName, //
    rcv_phone: state.formatInvoice.mobile,
    rcv_area_id: state.formatInvoice.checkValue,
    rcv_area_info: state.formatInvoice.rcvAreaInfo,
    rcv_email: state.formatInvoice.email,
    carruer_type: state.formatInvoice.carruerType,
    carruer_num: carruer_num,
  };
  invoiceSave(data).then((response) => {
    loading.close();
    if (response.code == 200) {
      cancelInvoice();
      getVatinvoiceList(response.data);
      ElMessage.success(t("message.saveSuccessMsg"));
    } else {
      ElMessage.error(response.data);
    }
  });
};
onMounted(() => {
  let {
    deliveryType,
    logisticsList,
    defaultAddressInfo,
    pickUp,
    cvsStore,
    invoiceInfo,
    deliveryTime,
    user,
    type,
    userInfo,
  } = toRefs(props);

  state.deliveryType = deliveryType;
  state.logisticsList = logisticsList;
  state.defaultAddressInfo = defaultAddressInfo;
  state.pickUp = pickUp?.pickUpAddressId ? pickUp : state.pickUp;
  state.cvsStore = cvsStore;
  state.invoiceInfo = invoiceInfo;
  state.deliveryTime = deliveryTime;
  state.user = user;
  state.type = type;
  state.userInfo = userInfo; //订购人信息
  getVatinvoiceList();
  getAddressList();
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/pc-style.scss";
@import "@/assets/css/address/index";
</style>
