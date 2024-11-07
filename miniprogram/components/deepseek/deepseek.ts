// components/deepseek/deepseek.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    isStyleColor: false
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
  getInputvalue(event:any){
    this.setData({
      inputValue: event.detail.value
    })
    if(this.data.inputValue === ''){
      this.setData({
        isStyleColor: false
      })
    }else{
      this.setData({
        isStyleColor: true
      })
    }
  },
  chooseFile(){
    const fileSystemManager = wx.getFileSystemManager();

    // 选择文件
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // 获取文件路径
        const tempFilePath = res.tempFiles[0].path;
        console.log(tempFilePath);
        // 读取文件
        fileSystemManager.readFile({
          filePath: tempFilePath,
          success(readRes) {
            // 成功获取文件内容
            console.log('文件内容：', readRes.data);//文件arrayBuffer
          },
          fail(err) {
            // 读取文件失败处理
            console.error('读取文件失败：', err);
          }
        });
      },
      fail(err) {
        // 选择文件失败处理
        console.error('选择文件失败：', err);
      }
    });
  }
})