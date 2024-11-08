// components/deepseek/deepseek.ts
import {url} from "../../api/index"
import {get,post} from "../../api/request"

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
        "messages":'我是 DeepSeek，很高兴见到你！我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~'
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
    const that = this
    

    // 选择文件
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // 获取文件路径
        const tempFilePath = res.tempFiles[0].path;
        // console.log(tempFilePath);
        const suffix = tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1);
        // console.log(suffix)
        const fileName = res.tempFiles[0].name;
        // 读取文件
        fileSystemManager.readFile({
          filePath: tempFilePath,
          success(readRes) {
            // 成功获取文件内容
            // console.log('文件内容：', readRes.data);//文件arrayBuffer
            switch(suffix){
              case 'xlsx':
                const newMessage: smslistItem = {
                  permissions: "right",
                  avater: "/assets/images/avater.png",
                  messages: `<img style="width:50rpx;height:50rpx;" src="/assets/icon/Excel.png" mode=""/><p>${fileName}</p>`
                };
            
                that.setData({
                  smsList: that.data.smsList.concat(newMessage)
                });
                const urlStr = url + "/excel";
                wx.uploadFile({
                  url: urlStr,
                  filePath: tempFilePath,
                  name: 'file', // 必须与后端字段名一致
                  formData: {
                    filename: fileName // 可以携带文件名信息
                  },
                  success(uploadRes) {
                    // 解析后端返回的 JSON 数据
                    const data = JSON.parse(uploadRes.data);
                    if (data.analysis) {
                      console.log('文件分析结果:', data.analysis.choices[0].message.content);
                      const newMessage: smslistItem = {
                        permissions: "left",
                        avater: "/assets/icon/deepseek.svg",
                        messages: data.analysis.choices[0].message.content
                      };
                
                      that.setData({
                        smsList: that.data.smsList.concat(newMessage)
                      });
                    } else {
                      console.error('文件分析失败:', data.error);
                      wx.showToast({
                        title: '文件分析失败',
                        icon: 'none'
                      });
                    }
                  },
                  fail(err) {
                    console.error('文件上传失败:', err);
                    wx.showToast({
                      title: '文件上传失败',
                      icon: 'none'
                    });
                  }
                });
                break;
              default:
                wx.showToast({
                  title: '不受支持的格式',
                  icon: 'none'
                });
                break;
            }
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

  async chatData(urlStr:string,data:object) {
    try {
      const url = urlStr;
      const type = 'multipart/form-data'
      const response = await post(url,data,type);
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