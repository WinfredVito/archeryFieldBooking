// pages/BookingDetails/BookingDetails.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"空",
    bookingdate:"空"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*//从上个“预约记录”页面获取数据
    this.setData({
      bookingdate:JSON.parse(decodeURI(options.data)) 
    }),
    console.log("bookingdate: "+bookingdate);*/
    //从数据库获得预约记录
    let tmp = []
    db.collection('booking').where({
      _openid: getApp().globalData.openid
    }).get().then(res => {
      for(var i=0;i<res.data.length;i++)
      {
        tmp.push({'id':res.data[i]._id})
      }
      this.setData({
        id:tmp
      })
    })
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

  }
})