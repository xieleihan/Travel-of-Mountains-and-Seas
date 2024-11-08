// index.ts
// 获取应用实例
Page({
  data:{
    time:""
  },
  intervalId: 0 as number, // 添加 intervalId 类型声明
  onLoad(){
    // 定时器 ID 保存到组件的实例上
    this.intervalId = setInterval(() => {
      const time = new Date().getTime().toString(); // 获取当前时间戳（毫秒）
      const format = this.formatTime(time); // 格式化时间
      this.setData({
        time: format
      });
    }, 1000);

    // 10 秒后清除定时器
    setTimeout(() => {
      clearInterval(this.intervalId); // 清除定时器
      const date = new Date();
      const hour = date.getHours();
      switch(hour){
        case 0:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 1:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 2:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 3:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 4:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 5:
          this.setData({
            time:"夜深了,梦里我还能陪伴你哦"
          });
          break;
        case 6:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 7:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 8:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 9:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 10:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 11:
          this.setData({
            time:"早上好,快看下今天去哪?"
          });
          break;
        case 12:
          this.setData({
            time:"中午好,快看下今天去哪?"
          });
          break;
        case 13:
          this.setData({
            time:"中午好,快看下今天去哪?"
          });
          break;
        case 14:
          this.setData({
            time:"下午好,今天有计划旅行吗?"
          });
          break;
        case 15:
          this.setData({
            time:"下午好,今天有计划旅行吗?"
          });
          break;
        case 16:
          this.setData({
            time:"下午好,今天有计划旅行吗?"
          });
          break;
        case 17:
          this.setData({
            time:"下午好,今天有计划旅行吗?"
          });
          break;
        case 18:
          this.setData({
            time:"下午好,今天有计划旅行吗?"
          });
          break;
        case 19:
          this.setData({
            time:"晚上好,休息一下明天出发?"
          });
          break;
        case 20:
          this.setData({
            time:"晚上好,休息一下明天出发?"
          });
          break;
        case 21:
          this.setData({
            time:"晚上好,休息一下明天出发?"
          });
          break;
        case 22:
          this.setData({
            time:"晚上好,休息一下明天出发?"
          });
          break;
        case 23:
          this.setData({
            time:"晚上好,休息一下明天出发?"
          });
          break;
      }
    }, 10000);
  },

  goToSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  },

  formatTime(timestamp: string){
    if (!timestamp) return '';

    try {
      // 将毫秒数时间戳转换为 Date 对象
      let time = Number(timestamp)
      const date = new Date(time);

      // 获取日期和时间各部分
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      // 拼接为所需格式
      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    } catch (error) {
      console.error('时间格式化出错:', error);
      return '';
    }
  },

  onUnload() {
    // 页面卸载时，确保清除定时器
    clearInterval(this.intervalId);
  },
})
