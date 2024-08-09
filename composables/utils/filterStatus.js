import { useI18n } from "vue-i18n";

export function payFrequency(val) {
  let { t } = useI18n();
  // console.log('val====',val)
  if (val == "D") {
    return t("dietitian.dayPay");
  } else if (val == "M") {
    return t("dietitian.monthPay");
  } else if (val == "Y") {
    return t("dietitian.yearPay");
  } else if (val == "all") {
    return t("dietitian.oncePay");
  }
}
// 普通订单状态
export function orderStatus(val) {
  let { t } = useI18n();
  // console.log('val====',val)
  if (val == 0) {
    return t("order.orderStatus0");
  } else if (val == -1) {
    return t("order.orderStatus1");
  } else if (val == 10 || val == 17 || val == 15) {
    return t("order.orderStatus10");
  } else if (val == 19) {
    return t("order.orderStatus19");
  } else if (val == 20) {
    return t("order.orderStatus20");
  } else if (val == 21) {
    return t("order.orderStatus21");
  } else if (val == 22) {
    return t("order.orderStatus22");
  } else if (val == 24) {
    return t("order.orderStatus24");
  } else if (val == 25) {
    return t("order.orderStatus25");
  } else if (val == 26 || val == 27) {
    return t("order.orderStatus26");
  } else if (val == 28) {
    return t("order.orderStatus28");
  } else if (val == 29) {
    return t("order.orderStatus29");
  } else if (val == 30) {
    return t("order.orderStatus30");
  } else if (val == 40) {
    return t("order.orderStatus40");
  } else if (val == 50) {
    return t("order.orderStatus50");
  } else if (val == 60 || val == 65) {
    return t("order.orderStatus60");
  } else if (val == 46) {
    return t("order.orderStatus46");
  } else if (val == 45) {
    return t("order.orderStatus45");
  } else if (val == 47) {
    return t("order.orderStatus47");
  }
}
// 服务订单状态
export function orderStatusService(val) {
  let { t } = useI18n();
  // console.log('val====',val)
  if (val == 0) {
    return t("order.orderStatus0");
  } else if (val == -1) {
    return t("order.orderStatus1");
  } else if (val == 10 || val == 17 || val == 15) {
    return t("order.orderStatus10");
  } else if (val == 20) {
    return t("order.orderServiceStatus20");
  } else if (val == 21) {
    return t("order.orderStatus21");
  } else if (val == 22) {
    return t("order.orderStatus22");
  } else if (val == 24) {
    return t("order.orderStatus24");
  } else if (val == 25) {
    return t("order.orderStatus25");
  } else if (val == 26 || val == 27) {
    return t("order.orderStatus26");
  } else if (val == 28) {
    return t("order.orderStatus28");
  } else if (val === 29) {
    return t("order.orderStatus29");
  } else if (val == 30) {
    return t("order.orderServiceStatus30");
  } else if (val == 40) {
    return t("order.orderServiceStatus40");
  } else if (val == 50) {
    return t("order.orderStatus50");
  } else if (val == 60 || 65) {
    return t("order.orderServiceStatus60");
  } else if (val == 47) {
    return t("order.orderStatus47");
  }
}

// 周期暂停
// 10 申请
// 20 审核通过
// 25 审核拒绝
// 30 手续费待支付
// 40 手续费已支付
// 0 取消申请/手续费未支付
// 50 暂停中
// 60 暂停结束
export function orderPauseStatus(val) {
  let { t } = useI18n();
  if (val == 10) {
    return t("order.orderPauseStatus10");
  } else if (val == 20) {
    return t("order.orderPauseStatus20");
  } else if (val == 25) {
    return t("order.orderPauseStatus25");
  } else if (val == 30) {
    return t("order.orderPauseStatus30");
  } else if (val == 40) {
    return t("order.orderPauseStatus40");
  } else if (val == 0) {
    return t("order.orderPauseStatus0");
  } else if (val == 50) {
    return t("order.orderPauseStatus50");
  } else if (val == 60) {
    return t("order.orderPauseStatus60");
  } else if (val == 47) {
    return t("order.orderStatus47");
  }
}
// 服务商品列表的状态
export function statusService(val) {
  let { t } = useI18n();
  if (val == "goods_available") {
    return t("order.goodsAvailable");
  } else if (val == "goods_using") {
    return t("order.goodsUsing");
  } else if (val == "goods_done") {
    return t("order.goodsDone");
  } else if (val == "goods_overdue") {
    return t("order.goodsOverdue");
  } else if (val == "goods_refund_apply") {
    return t("order.goodsRefundApply");
  } else if (val == "goods_refund") {
    return t("order.goodsRefund");
  } else if (val == "goods_finished") {
    return t("order.goodsFinished");
  } else if (val == "goods_early_end") {
    return t("order.goodsEarlyEnd");
  }
}
export function formatStepStatus(value) {
	if (value === 10 || value === 15 || value === 17 || value === 18 || value === 19 || value === -1) {
		// 待付款
		return 1
	} else if (value === 20 || value === 28) {
		// 待发货
		return 2
	} else if (value === 30 || value === 31 || value === 26 || value === 27) {
		// 已发货
		return 3
	} else if (value === 50 || value === 40) {
		// 已完成
		return 5
	} else {
		return 0
	}
}
// 提交订单-支付订单-周期出货-完成
// 提交订单-支付订单-周期出货-提前终止
// 完成50/40finishtime,终止45没时间

export function formatStepStatusCycle(value) {
	if (value === 10 || value === 15 || value === 17 || value === 18 || value === 19 || value === -1) {
		// 待付款
		return 1
	} else if (value === 20 || value === 28) {
		// 待发货
		return 2
	} else if (value === 30 || value === 31 || value === 26 || value === 27) {
		// 已发货
		return 3
	} else if (value === 50 || value === 40 || value === 45) {
		// 已完成
		return 5
	} else {
		return 0
	}
}

// 退货退款
export function orderReturnStatus(val) {
  let { t } = useI18n();
  if (val == -1) {
    return t("order.returnOrder.reject");
  } else if (val == -2) {
    return t("order.returnOrder.refundListDetail");
  } else if (val == 1) {
    return t("order.returnOrder.refundOk");
  } else if (val == 5) {
    return t("order.returnOrder.salesReturn");
  } else if (val == 6) {
    return t("order.returnOrder.refundSuccee");
  } else if (val == 7) {
    return t("order.returnOrder.refunding");
  } else if (val == 10) {
    return t("order.returnOrder.refunded");
  }else if(val == 12){
    return t("order.returnOrder.refundOk");
  }
}
