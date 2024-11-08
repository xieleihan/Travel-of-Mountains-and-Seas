// components/ticketing/ticketing.ts
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
    isOpen:true
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
    }
  },

  ready(){
    this.setData({
      isOpen: this.data.isOpenTicketing
    })
    
  }
})