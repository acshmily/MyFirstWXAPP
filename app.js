//app.js

var jwt = require('/utils/jwtUntil.js')
App({
  
  onLaunch: function () {
    // var _date = new Date()
    // var expriseTime = jwt.getExprise()
    // console.info("本地缓存:" + expriseTime+"当前时间:"+_date.getTime())
    // if (expriseTime >= _date.getTime() && expriseTime != ''){
    //   return
    // }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.info(res)
        if(res.code){
          wx.request({
            url: getApp().globalData.SERVICE_URL+ '/wx/login',
            data:{
              code:res.code
            },
            success:re=>{
              console.info("请求返回:" + re.data)
              //保存token
              jwt.setToken(re.data)
              //设置全局token
              this.globalData.TOKEN = jwt.getToken()
              //console.info('全局变量:' + this.globalData.TOKEN)
              //jwt.refresh()
            }
          }
          )
        }
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.info(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
      userInfo: null,
      SERVICE_URL:'http://127.0.0.1:8080',//定义请求的Url
      TOKEN : null
  }
})