// pages/category/category.ts
import {url} from "../../api/index"
import {get} from "../../api/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces:[],
    selectIndex: 0,
    selectCity:"北京市",
    cittyList:[]
  },

  goToItemPages(event: WechatMiniprogram.TouchEvent){
    const index = event.currentTarget.dataset.index;
    // console.log(index)
    const item = this.data.cittyList[index];
    console.log('点击的 item:', item);
    const app = getApp()
    app.globalData.selectCity = item
    wx.navigateTo({
      url:"/pages/cityinfo/cityinfo"
    })
  },

  onItemTap: function(event: { currentTarget: { dataset: { index: any; }; }; }) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      selectedIndex: index
    });
    console.log(this.data.provinces[index])
    this.setData({
      selectCity:this.data.provinces[index]
    })

    const urlcity = url +"/public/cities"
    const data ={"province":this.data.selectCity}
    this.cityData(urlcity,data)
  },

  async fetchData(urlStr:string){
    try{
      const url = urlStr;
      console.log(url)
      const response = await get(url);
      console.log(response.provinces)
      this.setData({
        provinces: response.provinces
      })
      
    }catch{
      console.log("error")
    }
  },

  async cityData(urlStr:string,data:object){
    try{
      const url = urlStr;
      console.log(url,data)
      const response = await get(url,data);
      console.log(response)
      this.setData({
        cittyList: response.cities
      })
    }catch{
      console.log("error")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const urlStr = url +"/public/provinces"
    this.fetchData(urlStr)
    this.setData({
      selectedIndex: 0
    });

    const urlcity = url +"/public/cities"
    const data ={"province":this.data.selectCity}
    this.cityData(urlcity,data)
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

  }
})