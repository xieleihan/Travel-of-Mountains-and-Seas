// components/deepseek/deepseek.ts
import {url} from "../../api/index"
import {get} from "../../api/request"

interface smslistItem{
  permissions: string,
  avater: string,
  messages: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    isStyleColor: false,
    smsList:[
      {
        "permissions": "left",
        "avater":"/assets/icon/deepseek.svg",
        "messages":"我是 DeepSeek，很高兴见到你！我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~"
      }
    ] as smslistItem[]
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
  },

  async fetchData(urlStr:string,data:object) {
    try {
      const url = urlStr;

      const response = await get(url,data);
      console.log('Response:', response.answer.choices[0].message.content);
      const newMessage: smslistItem = {
        permissions: "left",
        avater: "/assets/icon/deepseek.svg",
        messages: response.answer.choices[0].message.content
      };

      this.setData({
        smsList: this.data.smsList.concat(newMessage)
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  },

  sendMessages(){
    const urlStr = url + "/ask";
    const data = {"text": this.data.inputValue}
    this.fetchData(urlStr,data)

    const newMessage: smslistItem = {
      permissions: "right",
      avater: "/assets/images/avater.png",
      messages: this.data.inputValue
    };

    this.setData({
      isStyleColor: false,
      smsList: this.data.smsList.concat(newMessage),
      inputValue: "" // 清空输入框
    });
  }
})