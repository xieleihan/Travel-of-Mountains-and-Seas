// pages/shopcar/shopcar.ts
interface ShopcarItem {
  picel: number | string;
  num: number | string;
  totalPrice?: number | string;
  isSelected:boolean
}

interface countItem{
  sumnum: number | string;
  sumtotel: number | string;
}

interface paypayItem {
  picel: number | string;
  num: number | string;
  totalPrice?: number | string;
  isSelected:boolean
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcarList: [] as ShopcarItem[],
    isAllopen:false, // 全选开关
    isSumnum:0, // list总数
    all:false, // 全选复选框的开关
    count:{} as countItem
  },

  // 单选判断是否开启全选
  isOpenAll(event: WechatMiniprogram.TouchEvent){
    const index = event.currentTarget.dataset.index;
    // console.log(index,event)
    const shopcarList = this.data.shopcarList;

    // 切换选中状态
    shopcarList[index].isSelected = !shopcarList[index].isSelected;

    // 更新数量和总价
    let totalNum = 0;
    let totalPrice = 0;

    shopcarList.forEach(item => {
      if (item.isSelected) {
        totalNum += Number(item.num); // 确保将字符串转换为数字
        totalPrice += Number(item.totalPrice);
      }
    });

    // 更新全选的总数
    const selectedCount = shopcarList.filter(item => item.isSelected).length;
    this.setData({
        shopcarList: shopcarList,
        isSumnum: selectedCount,
        count: {
          sumnum: totalNum,
          sumtotel: totalPrice.toFixed(2) // 更新总价格
        },
        all: selectedCount === shopcarList.length // 判断是否全选
    });

    // 更新全选状态
    this.setData({
        isAllopen: this.data.all
    });
    this.updateCount();
  },

  // 全选的开关
  toggleAllopen(){
    const newIsAllOpen = !this.data.isAllopen;
    const shopcarList = this.data.shopcarList.map(item => ({
        ...item,
        isSelected: newIsAllOpen // 全选时设置所有项为选中或未选中
    }));

    // 计算全选后的总数和总价
    let totalNum = 0;
    let totalPrice = 0;

    if (newIsAllOpen) {
      shopcarList.forEach(item => {
        totalNum += Number(item.num);
        totalPrice += Number(item.totalPrice);
      });
    }

    this.setData({
        shopcarList: shopcarList,
        isAllopen: newIsAllOpen,
        all: newIsAllOpen,
        count: {
          sumnum: totalNum,
          sumtotel: totalPrice.toFixed(2) // 更新总价格
        },
        isSumnum: newIsAllOpen ? shopcarList.length : 0 // 更新总数
    });
    this.updateCount();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app = getApp();
    const count = app.globalData.count
    // console.log(count)
    const shopcarList = app.globalData.shopcarList.map((item:any) => {
      return {
        ...item,
        totalPrice: (Number(item.picel) * Number(item.num)).toFixed(2)
      };
    });
    // console.log(shopcarList)
    this.setData({
      shopcarList : shopcarList,
      isSumnum: shopcarList.length,
      count: count
    })
    console.log(this.data.count)
    // console.log(this.data.isSumnum)
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

  sub(event: WechatMiniprogram.TouchEvent) {
    const index = event.currentTarget.dataset.index;
    console.log(index)
    const shopcarList = this.data.shopcarList;
    if (shopcarList[index].num > 1) {
      shopcarList[index].num = Number(shopcarList[index].num) - 1; // 转换为数字
      shopcarList[index].totalPrice = (Number(shopcarList[index].picel) * Number(shopcarList[index].num)).toFixed(2);
      this.setData({
        shopcarList: shopcarList
      });
    }
    this.updateCount();
  },
  
  plus(event: WechatMiniprogram.TouchEvent) {
    const index = event.currentTarget.dataset.index;
    const shopcarList = this.data.shopcarList;
    shopcarList[index].num = Number(shopcarList[index].num) + 1; // 转换为数字
    shopcarList[index].totalPrice = (Number(shopcarList[index].picel) * Number(shopcarList[index].num)).toFixed(2);
    this.setData({
      shopcarList: shopcarList
    });
    this.updateCount();
  },

  updateCount() {
    const shopcarList = this.data.shopcarList;
    let totalNum = 0;
    let totalPrice = 0;
    const selectedItems :ShopcarItem[] = [];

    shopcarList.forEach(item => {
      if (item.isSelected) {
        totalNum += Number(item.num);
        totalPrice += Number(item.totalPrice);
        selectedItems.push(item);
      }
    });
    console.log(totalNum,totalPrice)
    // 更新全局的 paypalList
    const app = getApp();
    app.globalData.paypalList = selectedItems;
    app.globalData.count.sumnum = totalNum; // 将总数设置到 globalData
    app.globalData.count.sumtotel = totalPrice.toFixed(2); // 将总价格设置到 globalData

    this.setData({
      count: {
        sumnum: totalNum,
        sumtotel: totalPrice.toFixed(2) // 确保总价格保留两位小数
      }
    });
  },

  clearShopcar(){
    this.setData({
      shopcarList: []
    })
  },

  paypal(){
    const app =  getApp();
    console.log(app.globalData.paypalList)
    if(app.globalData.paypalList.length === 0){
      wx.showToast({
        title:'请勾选你所需要的商品',
        mask:true
      })
      return;
    }else{
      wx.navigateTo({
        url: '/pages/paypal/paypal'
      })
    }
  }
})