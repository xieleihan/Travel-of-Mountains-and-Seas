// index.ts
// 获取应用实例
Page({
  data:{
    time:""
  },

  onLoad(){
    // 定时器每秒更新 time
    setInterval(() => {
      const time = new Date();
      this.setData({
        time: time.toLocaleString()
      });
    }, 1000);
  },

  goToSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  }
})
