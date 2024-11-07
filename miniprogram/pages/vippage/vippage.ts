// pages/vippage/vippage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTwo: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getIndex(event: WechatMiniprogram.TouchEvent){
    const index = event.currentTarget.dataset.index;
    // console.log(index)
    if(index == 1){
      // console.log("left")
      this.setData({
        isTwo: false
      })
    }else{
      // console.log("rigth")
      this.setData({
        isTwo: true
      })
    }
  },

  topPages(){
    const app = getApp()
    app.globalData.showModal = true;
  }
})