// components/mypopup/mypopup.ts
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
    showModal: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal() {
      this.setData({
        showModal: true
      });
    },
  
    hideModal() {
      this.setData({
        showModal: false
      });
    }
  },

  
})