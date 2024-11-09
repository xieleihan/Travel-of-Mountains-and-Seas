// components/ticketing/ticketing.ts
import {url} from "../../api/index"
import {get,post} from "../../api/request"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isOpenTicketing:{
      type:Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isOpen:true,
    date:"",
    highspeedList: [],
    randomNumber:"",
    highspeedListIndex: 0,
    uuid :"",
    base64:"",
    radioList:[
      {
        "icon":"/assets/icon/eightpass.png",
        "text":"八达通",
        "value":0,
        "checked":false
      },
      {
        "icon":"/assets/icon/Paypal.png",
        "text":"PayPal",
        "value":1,
        "checked":false
      },
      {
        "icon":"/assets/icon/Apple-pay.png",
        "text":"Apple Pay",
        "value":2,
        "checked":false
      }
    ],
    value: 0,
    translateValue: '',
    cardimg:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      const data = { value: false };
      this.triggerEvent('customEvent', data); // 触发父组件监听的事件
      this.setData({
        isOpen: true
      })
      
    },

    getRandomNumber():string{
      return Math.floor(Math.random()*15).toString()
    },

    async fetchData(urlStr:string,data:object,type:string) {
      try {
        const url = urlStr;
        
        const response = await post(url,data,type);
        console.log('Response:', response);
        this.setData({
          uuid: response.uuid,
          base64: response.url
        })
        
      } catch (error) {
        console.error('Error:', error);
      }
    },

    radioChange(e: any) {
      console.log('支付方式改变:', e.detail.value);
  
      const items = this.data.radioList
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }

      const transformStr = - e.detail.value * 100 +'%'
      console.log(transformStr)

      this.setData({
        items,
        value: e.detail.value,
        translateValue: transformStr
      })
    },

    getCardnum(event:any){
      let inputvalue = event.detail.value
      inputvalue = inputvalue.substring(0,2)
      switch(inputvalue){
        case '62':
          this.setData({
            cardimg:"/assets/icon/union.png"
          });
          break;
        case '52':
          this.setData({
            cardimg:"/assets/icon/mastercard.png"
          });
          break;
        case '41':
          this.setData({
            cardimg:"/assets/icon/visa.png"
          });
          break;
        case '31':
          this.setData({
            cardimg:"/assets/icon/jcb.png"
          });
          break;
        case '37':
          this.setData({
            cardimg:"/assets/icon/ae.png"
          });
          break;
        case '35':
          this.setData({
            cardimg:"/assets/icon/Diners_Club.png"
          });
          break;
        default:
          this.setData({
            cardimg:"/assets/icon/close.png"
          });
          break;
      }
    }
  },

  ready(){
    this.setData({
      isOpen: this.data.isOpenTicketing
    })
  },

  async attached(){
    const date = new Date()
    // console.log(date.getTime().toString())
    this.setData({
      date: date.getTime().toString(),
      randomNumber: this.getRandomNumber()
    })
    setTimeout(()=>{
      const app = getApp()
      this.setData({
        highspeedList: app.globalData.highspeedList,
        highspeedListIndex: app.globalData.highspeedList.length - 1
      })
      const urlStr = url +'/qrcode';
      this.fetchData(urlStr,{text:this.data.date},"")
    },2000)
    
  }
})