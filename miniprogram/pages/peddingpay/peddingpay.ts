// pages/peddingpay/peddingpay.ts
interface filterItem{
  timestamp: string;
  items: FilterItem[];
}
interface FilterItem {
  pic: string;
  title: string;
  picel: string;
  num: string;
  totalPrice: string;
  timestamp: string;
}

interface countItem{
  sumnum: number | string;
  sumtotel: number | string;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen:true,
    paypalList:[],
    filter:[] as filterItem[],
    count:{} as countItem
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app = getApp();
    this.setData({
      paypalList: app.globalData.paypalList,
      count: app.globalData.count
    })
    // console.log(app.globalData.paypalList)
    if(this.data.paypalList.length === 0){
      this.setData({
        isOpen: false
      })
    }else{
      this.setData({
        isOpen: true
      })
      this.groupByTimestamp(); // 调用自动归类方法
    }
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
  groupByTimestamp() {
    const groupedData: { [key: string]: Array<{ pic: string; title: string; picel: string; num: string; totalPrice: string; timestamp: string }> } = {};

    // 按 timestamp 进行分组
    this.data.paypalList.forEach(item => {
      const { timestamp } = item;
      if (!groupedData[timestamp]) {
        groupedData[timestamp] = [];
      }
      groupedData[timestamp].push(item);
    });

    // 转换成目标数组结构
    const filter = Object.keys(groupedData).map(timestamp => ({
      timestamp,
      items: groupedData[timestamp]
    }));

    this.setData({
      filter
    });
    console.log(this.data.filter)
  }
})