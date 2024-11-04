// components/home-list/home-list.ts
import {url} from "../../api/index"
import {get} from "../../api/request"

interface homelistItem{
  "id" : number;
  "typename": string;
  "pic": string;
  "title": string;
  "info": string;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "homelist": [] as homelistItem[]
  },

  attached(){
    const urlStr = url + "/public/homeinfo";
    console.log(urlStr)

    // 调用 fetchData 方法
    this.fetchData(urlStr);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCardInfo(event:WechatMiniprogram.TouchEvent){
      const index = event.currentTarget.dataset.index;
      // console.log(index,this.data.homelist[index],this.data.homelist[index].title)
      const app = getApp()

      app.globalData.selectCity = this.data.homelist[index].title

      wx.navigateTo({
        url:'/pages/cityinfo/cityinfo'
      })
    },

    async fetchData(urlStr:string) {
      try {
        const url = urlStr;
  
        const response = await get(url);
        console.log('Response:', response.data);
  
        // 处理响应数据
        this.setData({
          homelist: response.data
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
})