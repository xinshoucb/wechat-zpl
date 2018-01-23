// pages/path/path.js

const getInfosUrl = require('config').infosUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 'view',
        name: 'default',
        open: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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

  getInfo: function () {
    var that = this

    wx.request({
      url: getInfosUrl, 
      data: {
        user_id: '123'
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.infos
        })
      }
    })
  },

  kindToggle: function (e) {
    console.log(e);
  }
})