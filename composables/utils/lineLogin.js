
import qs from 'qs'
export function  lineAuthorize(data){
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    const line_auth = 'https://access.line.me/oauth2/v2.1/authorize';
    const auth_params = {
        response_type: 'code',
        client_id: data.appId,
        redirect_uri: window.location.origin + window.location.pathname, // 在LINE Developers Console上注册的回调 URL 的 URL 编码字符串。您可以添加任何查询参数。
        state: arr[Math.floor(Math.random() * 26)] + '_' + Math.floor(Math.random() *10), // 用于防止跨站点请求伪造的唯一字母数字字符串. 您的网络应用应为每个登录会话生成一个随机值。这不能是 URL 编码的字符串。
        scope: data.oauthScope ,// 向用户请求的权限,查询范围可以看官网(https://developers.line.biz/en/docs/line-login/integrate-line-login/#scopes)
        bot_prompt:'aggressive'
    };
    // 这里使用了第三方库qs来处理参数
    const paramsString = qs.stringify(auth_params);
    window.location.href = `${line_auth}?${paramsString}`;
}