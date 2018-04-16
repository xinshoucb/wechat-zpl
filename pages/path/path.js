// pages/path/path.js
import eventInfo from '../../utils/event'
const getInfosUrl = require('../../config').infosUrl
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: 'default'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGInfo();
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getGInfo: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      this.getInfo();
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getInfo();
      }
    } 
  },

  getInfo: function () {
    var that = this

    wx.request({
      url: getInfosUrl, 
      data: {
        name: getApp().globalData.myEvent.name
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(that.data.list);
        
        let jsonArray = JSON.parse(res.data.data);

        that.setData({
          list: jsonArray
        });
        console.log(jsonArray);
      }
    })
  },

  kindToggle: function (e) {
    console.log(e);
  }
})