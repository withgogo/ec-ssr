import { useI18n } from 'vue-i18n'
// useI18n() 只能在setup使用 所以只能写在方法的内部不能作为公共部分
export function formatOrderStatus(value) {
	let  { t } = useI18n()
	return t('login.title')
	// if (value === 0) {
	// 	return t('order.orderDetail.cancel')
	// } else if (value === -1) {
	// 	return t('order.orderDetail.payBnormal')
	// } else if (value === 10 || value === 15) {
	// 	return t('order.orderDetail.waitPay')
	// } else if (value === 17) {
	// 	return t('order.orderDetail.waitPayCode')
	// }  else if (value === 18) {
	// 	return t('order.orderDetail.empower')
	// }  else if (value === 19) {
	// 	return t('order.orderDetail.paying')
	// } else if (value === 20) {
	// 	return t('order.orderDetail.waitDel')
	// } else if (value === 21) {
	// 	return t('order.orderDetail.applyRefund')
	// } else if (value === 22) {
	// 	return t('order.orderDetail.refundIng')
	// } else if (value === 24) {
	// 	return t('order.orderDetail.preGenerate')
	// } else if (value === 25) {
	// 	return t('order.orderDetail.refund')
	// } else if (value === 26) {
	// 	return t('order.orderDetail.delivering')
	// } else if (value === 27) {
	// 	return t('order.orderDetail.skuDelivered')
	// } else if (value === 28) {
	// 	return t('order.orderDetail.periodDeliver')
	// } else if (value === 29) {
	// 	return t('order.orderDetail.periodPayFail')
	// } else if (value === 30) {
	// 	return t('order.orderDetail.alDel')
	// } else if (value === 31) {
	// 	return t('order.orderDetail.noPickReturn')
	// } else if (value === 40) {
	// 	return t('order.orderDetail.userRec')
	// } else if (value === 45) {
	// 	return t('order.orderDetail.orderTermination')
	// } else if (value === 46) {
 //    return t('order.orderList.periodPause')
	// } else if (value === 50) {
	// 	return t('order.orderDetail.alFinish')
	// } else if (value === 65) {
	// 	return t('order.orderDetail.alFinish')
	// } else {
	// 	return t('order.orderDetail.close')
	// }
}
// export function orderStatusService(value) {
// 	if (value === 0) {
// 		return t('order.orderDetail.cancel')
// 	} else if (value === -1) {
// 		return t('order.orderDetail.payBnormal')
// 	} else if (value === 10 || value === 15) {
// 		return t('order.orderDetail.waitPay')
// 	} else if (value === 17) {
// 		return t('order.orderDetail.waitPayCode')
// 	} else if (value === 18) {
// 		return t('order.orderDetail.empower')
// 	}  else if (value === 19) {
// 		return t('order.orderDetail.paying')
// 	} else if (value === 20) {
// 		return t('order.orderList.orderServiceStatus20')
// 	} else if (value === 21) {
// 		return t('order.orderDetail.applyRefund')
// 	} else if (value === 22) {
// 		return t('order.orderDetail.refundIng')
// 	} else if (value === 24) {
// 		return t('order.orderDetail.preGenerate')
// 	} else if (value === 25) {
// 		return t('order.orderDetail.refund')
// 	} else if (value === 26) {
// 		return t('order.orderDetail.delivering')
// 	} else if (value === 27) {
// 		return t('order.orderDetail.skuDelivered')
// 	} else if (value === 28) {
// 		return t('order.orderDetail.periodDeliver')
// 	} else if (value === 29) {
// 		return t('order.orderDetail.periodPayFail')
// 	} else if (value === 30) {
// 		return t('order.orderList.orderServiceStatus30')
// 	} else if (value === 31) {
// 		return t('order.orderDetail.noPickReturn')
// 	} else if (value === 40) {
// 		return t('order.orderList.orderServiceStatus40')
// 	} else if (value === 45) {
// 		return t('order.orderDetail.orderTermination')
// 	} else if (value === 46) {
// 		return t('order.orderList.periodPause')
// 	} else if (value === 50) {
// 		return t('order.orderDetail.alFinish')
// 	} else if (value === 60) {
// 		return t('order.orderList.orderServiceStatus60')
// 	} else if (value === 65) {
// 		return t('order.orderDetail.alFinish')
// 	} else {
// 		return t('order.orderDetail.close')
// 	}
// }

//  // 10 申请 20 审核通过  25 审核拒绝  
//  // 30 手续费待支付 40 手续费已支付  0 取消申请/手续费未支付 41 信用卡无法退款  45 退款失败 46 已退款  60 已中断
// export function orderStatusServiceStop(value, te) {
// 	if (value === 10) {
// 		return t('periodOrderStatusStop.pendingReview')
// 	} else if (value === 25) {
// 		return t('periodOrderStatusStop.auditReject')
// 	} else if (value === 20) {
// 		return t('periodOrderStatusStop.approvedRefund')
// 	} else if (value === 30) {
// 		return t('orderStatusPeriodSuspend.orderWaitPayFee')
// 	} else if (value === 40) {
// 	  return t('orderStatusPeriodSuspend.feesPaid')
// 	}else if (value === 46) {
// 		return t('periodOrderStatusStop.refunded')
// 	} else if (value === 45) {
// 		return t('periodOrderStatusStop.refundFailed')
// 	} else if (value === 41) {
// 		return t('periodOrderStatusStop.creditCardInstallmentRefund')
// 	} else if (value === 60) {
// 		return t('periodOrderStatusStop.terminated')
// 	} else if (value === 0) {
// 		return t('orderStatusPeriodSuspend.cancellationApplication')
// 	} 
// 	else {
// 		return t('periodOrderStatusStop.close')
// 	}
// }

// export function type(val) {
// 	if (val == 0) {
// 		return t('order.orderDetail.person')
// 	} else {
// 		return t('order.orderDetail.compony')
// 	}
// }
// export function delivery(val) {
// 	if (val === 0) {
// 		return t('order.orderDetail.expressSend')
// 	} else if (val === 1) {
// 		return t('order.orderDetail.personal')
// 	} else if (val === 2) {
// 		return t('order.orderDetail.home')
// 	} else {
// 		return t('order.orderDetail.cvs')
// 	}
// }
// export function payState(value) {
// 	if (value === 10) {
// 		return t('order.orderDetail.waitPay')
// 	} else if (value === 20) {
// 		return t('order.orderDetail.paySuccess')
// 	}
// }
// export function stopApplyStopType(value) {
// 	if (value == 0) {
// 		return t('periodStop.selfInterrupt')
// 	} else if (value == 1) {
// 		return t('periodStop.changeMember')
// 	} else if (value == 2) {
// 		return t('periodStop.changeCard')
// 	} else {
// 		return '-'
// 	}
// }

// // 暂停  // 10 审核中   20 审核通过 25 审核拒绝 30 手续费待支付  40 手续费已支付 0 取消申请/手续费未支付  50 暂停中  60 暂停结束
// export function periodSuspend(value) {
// 	if (value === 0) {
// 	  return t('orderStatusPeriodSuspend.cancellationApplication')
// 	} else if (value === 10) {
// 	  return t('orderStatusPeriodSuspend.pendingReview')
// 	} else if (value === 20) {
// 	  return t('orderStatusPeriodSuspend.approvedRefund')
// 	} else if (value === 25) {
// 	  return t('orderStatusPeriodSuspend.auditReject')
// 	} else if (value === 30) {
// 	  return t('orderStatusPeriodSuspend.orderWaitPayFee')
// 	} else if (value === 40) {
// 	  return t('orderStatusPeriodSuspend.feesPaid')
// 	} else if (value === 50) {
// 	  return t('orderStatusPeriodSuspend.pausesIn')
// 	} else if (value === 60) {
// 	  return t('orderStatusPeriodSuspend.pausesEnd')
// 	} else {
// 	  return t('periodOrderStatusStop.close')
// 	}
// }

// export function formatStepStatus(value) {
// 	if (value === 10 || value === 15 || value === 17 || value === 18 || value === 19 || value === -1) {
// 		// 待付款
// 		return 1
// 	} else if (value === 20 || value === 28) {
// 		// 待发货
// 		return 2
// 	} else if (value === 30 || value === 31 || value === 26 || value === 27) {
// 		// 已发货
// 		return 3
// 	} else if (value === 50 || value === 40) {
// 		// 已完成
// 		return 5
// 	} else {
// 		return 0
// 	}
// }
// // 提交订单-支付订单-周期出货-完成
// // 提交订单-支付订单-周期出货-提前终止
// // 完成50/40finishtime,终止45没时间

// export function formatStepStatusCycle(value) {
// 	if (value === 10 || value === 15 || value === 17 || value === 18 || value === 19 || value === -1) {
// 		// 待付款
// 		return 1
// 	} else if (value === 20 || value === 28) {
// 		// 待发货
// 		return 2
// 	} else if (value === 30 || value === 31 || value === 26 || value === 27) {
// 		// 已发货
// 		return 3
// 	} else if (value === 50 || value === 40 || value === 45) {
// 		// 已完成
// 		return 5
// 	} else {
// 		return 0
// 	}
// }