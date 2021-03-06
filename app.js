//app.js
const uploadEventUrl = require('config').uploadEventUrl
const util = require('utils/util.js')
import eventInfo from 'utils/event'


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              this.globalData.myEvent.name = this.globalData.userInfo.nickName;
              this.globalData.myEvent.avatar = this.globalData.userInfo.avatarUrl;
              this.globalData.myEvent.location = this.globalData.userInfo.province + " " + this.globalData.userInfo.city;
              this.globalData.myEvent.timestamp = util.formatTime(new Date());

              this.uploadEvent();

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    myEvent: new eventInfo()
  },
  uploadEvent: function(){
    var that = this

    wx.request({
      url: uploadEventUrl+'?user_id=789',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      data: that.globalData.myEvent,
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})