
// 请求头数据
export interface Header {
  'token' ?: string;
  'belong-store': string | number;
  'terminal': string;
  'is-app': string | number
  'content-type':string
}

// 请求体
export interface RequestData {
  url: string;
  data: object;
  method: string;
  headers?:Object
}

enum ResponseCode {
  Success = 200,
  Error = 500,
  NotFound = 404,
}
// 指定后端返回的基本数据类型
export type RequestResponse<T = unknown> = {
	code: ResponseCode
	msg?: string
	data: T
	message?: string
}

export interface UserInfo {
  email?: string|number;
  availableBalance?:string|number;
  birthday?:string|number;
  discountAmount?:string|number;
  expireDate?:string|number;
  id?:string|number;
  imgpath?:string|number;
  integral?:string|number;
  integralAvailable?:string|number;
  integralPending?:string|number;
  mobile?:string|number;
  nickName?:string|number;
  realName?:string|number;
  sex?:string|number;
  userLevel?:string|number;
  userLevelIcon?:string|number;
  userName?:string|number;
  userLevelName?:string|number;
}