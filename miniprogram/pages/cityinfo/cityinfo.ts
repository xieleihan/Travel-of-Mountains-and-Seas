// pages/cityinfo/cityinfo.ts
import {url} from "../../api/index"
import {get} from "../../api/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityname:"",
    cityinfo:{},
    isOpen: false,
    pic:"",
    num:"1",
    isSelected:false,
    totalPrice:"",
    picel:""
  },

  addInfo(){
    const app = getApp();
    const that = this
    wx.showModal({
      title: '提示',
      content: '你打算把该旅游景点添加到购物车吗?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.globalData.shopcarList.push({
            "pic": that.data.pic,
            "title": that.data.cityname,
            "num": that.data.num,
            "isSelected": that.data.isSelected,
            "picel": that.data.picel,
            "totalPrice": Number(that.data.num) * Number(that.data.picel)
          })
          console.log(app.globalData.shopcarList)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  addCollectlist(){
    const app = getApp();
    const that = this
    wx.showModal({
      title: '提示',
      content: '你打算把该旅游景点添加到收藏夹吗?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.globalData.collectList.push({
            "pic": that.data.pic,
            "title": that.data.cityname,
            "num": that.data.num,
            "isSelected": that.data.isSelected,
            "picel": that.data.picel,
            "totalPrice": Number(that.data.num) * Number(that.data.picel)
          })
          console.log(app.globalData.collectList)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  async fetchData(urlStr:string,data:object){
    try{
      const url = urlStr;
      console.log(url)
      const response = await get(url,data);
      console.log(response.cityinfo)
      if(response.cityinfo === undefined){
        console.log("找不到数据")
        this.setData({
          isOpen: false
        })
        return;
      }else{
        this.setData({
          isOpen: true
        })
      }
      this.setData({
        cityinfo: response.cityinfo,
        pic: response.cityinfo.pic,
        picel: response.cityinfo.picel
      })
    }catch{
      console.log("error")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app =  getApp();
    this.setData({
      cityname : app.globalData.selectCity
    })
    const urlStr = url +"/public/getCityInfo"
    const data = {"cityname": this.data.cityname}
    this.fetchData(urlStr,data)
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