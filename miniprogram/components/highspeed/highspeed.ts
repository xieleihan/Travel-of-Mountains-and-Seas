// components/highspeed/highspeed.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  // 组件进入节点树的时候,开始执行这部分
  attached(){
    const app = getApp()
    this.setData({
      cityname: app.globalData.selectCity
    })
    const date = new Date();
    const haomiao = date.getTime()
    const endhaomiao = haomiao + 1209600000; 
    // console.log(haomiao,endhaomiao)
    const endDateObj = new Date(endhaomiao);
    const endyear = endDateObj.getFullYear();
    let endmouth:string|number = endDateObj.getMonth() + 1
    endmouth = endmouth < 10 ? '0' + endmouth : endmouth
    let endday:string|number = endDateObj.getDate()
    endday = endday < 10 ? '0'+ endday : endday
    const enddate = endyear+ "-" + endmouth + "-" + endday
    
    const year = date.getFullYear()
    let mouth:string|number = date.getMonth() + 1
    mouth = mouth < 10 ? '0' + mouth : mouth
    let day:string|number = date.getDate()
    day = day < 10 ? '0'+ day : day
    const startday = year + "-" + mouth + "-" + day
    this.setData({
      date:startday,
      startdate: startday,
      enddate: enddate
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    date:"",
    array: ['商务座', '一等座', '二等座', '无座'],
    index: 0, // 默认选中的选项索引
    startdate:"",
    enddate:"",
    selectzuowei:"",
    highspeedzuowei:{
      no:"/assets/icon/zuowei.png",
      hightlight:"/assets/icon/zuowei_heightlight.png"
    },
    cityname:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange(e: WechatMiniprogram.PickerChange) {
      console.log("日期选择发生变化:", e.detail.value);
      this.setData({
        date: e.detail.value as string, // 更新选中的日期
      });
    },
    bindPickerChange(e: WechatMiniprogram.PickerChange) {
      console.log("选择发生变化，值为：", e.detail.value);
      this.setData({
        selectzuowei:""
      })
  
      // 判断类型并处理
      if (typeof e.detail.value === "string") {
        const newIndex = parseInt(e.detail.value, 10); // 将字符串转为数字
        this.setData({
          index: newIndex,
        });
      } else {
        console.error("Unexpected value type:", e.detail.value);
      }
    },

    select(event: WechatMiniprogram.TouchEvent){

      const index = event.currentTarget.dataset.index;
      // console.log(index)
      this.setData({
        selectzuowei: index
      })
    },

    paytrip(){
      if(this.data.date !== '' && this.data.selectzuowei !== '' ){
        const data = { value: true };
        this.triggerEvent('customEvent', data); // 触发父组件监听的事件
        const app = getApp()
        app.globalData.highspeedList.push({
          "cityname":this.data.cityname,
          "date":this.data.date,
          "selectzuowei": this.data.selectzuowei,
          "type":this.data.array[this.data.index]
        })
        
      }else{
        wx.showToast({
          title:'请检查日期和席次是否已经选择',
          icon:'none'
        })
      }

    }
  }
})