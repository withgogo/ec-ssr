
import  {useHttpRequest}  from '@/composables/utils/request';

// 红包
export function getRedPacketInfo(data: any){
  return  useHttpRequest({
     url:'/api/h5/red-packet/get-info',
       data,
      method :'GET',
  })
}

export function getRedPacket(data: any){
    return  useHttpRequest({
       url:'/api/h5/red-packet/get-red-packet',
         data,
        method :'GET',
    })
  }
