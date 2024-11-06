// pages/user/user.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList:[
      {
        "icon":"/assets/icon/nopay.png",
        "text":"待支付",
        "color":"#e63f32"
      },
      {
        "icon":"/assets/icon/tring.png",
        "text":"待出行",
        "color":"#fcc523"
      },
      {
        "icon":"/assets/icon/oktr.png",
        "text":"已完成",
        "color":"#307dee"
      },
      {
        "icon":"/assets/icon/okpay.png",
        "text":"待评价",
        "color":"#269745"
      }
    ]
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

  goToChangavater(){
    wx.navigateTo({
      url: '/pages/userinfo/userinfo'
    })
  },

  goToCollect(){
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },

  goTovippage(){
    wx.navigateTo({
      url:'/pages/vippage/vippage'
    })
  },

  goToSetting(){
    wx.navigateTo({
      url:'/pages/setting/setting'
    })
  },

  goToPeddingpay(){
    wx.navigateTo({
      url:'/pages/peddingpay/peddingpay'
    })
  },

  goToWaiting(){
    wx.navigateTo({
      url:'/pages/waiting/waiting'
    })
  },

  goToSuccess(){
    wx.navigateTo({
      url:'/pages/success/success'
    })
  },

  goToEvaluate(){
    wx.navigateTo({
      url:'/pages/evaluate/evaluate'
    })
  },

  goToPages(event: WechatMiniprogram.TouchEvent){
    const index = event.currentTarget.dataset.index;
    // console.log(index)
    switch(index){
      case 0:
        this.goToPeddingpay();
        break;
      case 1:
        this.goToWaiting();
        break;
      case 2:
        this.goToSuccess();
        break;
      case 3:
        this.goToEvaluate();
        break;
      default:
        break;
    }
  }
})