import { useI18n } from 'vue-i18n'

// 会员中心  我的订单 我的服务  我的优惠券 等
export function useOtherTabList() {

	let { t } = useI18n()
	let otherTabList : any = [
		{
			text: t('user.myOrder'),
			icon: 'order',
			url: "/user/user/order/order-list"
		},
		{
			text: t('user.myService'),
			icon: 'service',
			url: "/user/user/order/service-order-list"
		},
		{
			text: t('coupon.myCoupon'),
			icon: 'coupon',
			url: "/user/user/coupon"
		},
		{
			text: t('favorite.myFavorite'),
			icon: 'collect',
			url: "/user/user/favorite"
		},
		{
			text: t('bindCard.cardManageBtn'),
			icon: 'card',
			url: "/user/user/card/list"
		},
		{
			text: t('user.personalInformationManagement'),
			icon: 'user',
			url: "/user/user/setting/user-item"
		},
		{
			text: t('user.memberZone'),
			icon: 'member',
			url: "/user/user/member-zone"
		},
		// {
		// 	text: t('user.notifications'),
		// 	icon: 'message',
		// 	url: "/pages/msg/msg"
		// },
		{
			text: t('user.unBindProviderText'),
			icon: 'link',
		}
	]
	return otherTabList
}

// 会员中心 订单  待付款  待出货  待收货
export function useOrderTabList() {
	let { t } = useI18n()
	let otherTabList : any = [
		{
			text: t('user.noPay'),
			url: "/user/user/order/order-list",
			status:10,
		},
		{
			text: t('user.noGoods'),
			url: "/user/user/order/order-list",
			status:20,
		},
		{
			text: t('user.getGoods'),
			url: "/user/user/order/order-list",
			status:30,
		},
		{
			text: t('user.completed'),
			url: "/user/user/order/order-list",
			status:40,
		},
	]
	return otherTabList
}

// 会员中心 隐私政策  关于我们
export function useOrderTabPrivacy() {
	let { t } = useI18n()
	let otherTabList : any = [
		{
			text: t('header.problem'),
			label: "contact_us",
			icon:'question'
		},
		{
			text: t('header.privacy'),
			label: "privacy",
			icon:'file'
		},
		{
			text: t('header.aboutUs'),
			label: "about_us",
			icon:'cofit'
		},
	]
	return otherTabList
}

//修改会员性别
export function useUserSex() {
	let { t } = useI18n()
	let actionsSex : any = [
		{ name: t('otherWords.man') ,value: 1,},
		{ name: t('otherWords.woman') ,value: 0,},
	]
	return actionsSex
}


//订单列表 tab 
export function useOrderNavTab() {
	let { t } = useI18n()
	let otherTabList : any = [
		{
			text: t('order.allOrder'),
			val:0
		},
		{
			text: t('user.noPay'),
			val:10
		},
		{
			text: t('user.noGoods'),
			val:20
		},
		{
			text: t('order.perioding'),
			val:28
		},
		{
			text: t('user.getGoods'),
			val:30
		},
		{
			text: t('user.completed'),
			val:40
		},
		{
			text: t('user.refund'),
			val:-1
		},
	]
	return otherTabList
}

