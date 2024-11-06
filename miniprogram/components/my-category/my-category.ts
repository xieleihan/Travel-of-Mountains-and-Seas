// components/my-category/my-category.ts
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
    "categoryList":[
      {
        "bgColor":"#e63f31",
        "icon":"/assets/icon/recommend.png",
        "text":"推荐"
      },
      {
        "bgColor":"#fcc423",
        "icon":"/assets/icon/hot.png",
        "text":"热销"
      },
      {
        "bgColor":"#307dee",
        "icon":"/assets/icon/vip.png",
        "text":"特价"
      },
      {
        "bgColor":"#289a48",
        "icon":"/assets/icon/my.png",
        "text":"特色"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToOther(event: WechatMiniprogram.TouchEvent){
      const index = event.currentTarget.dataset.index;
      // console.log(index)
      switch(index){
        case 0:
          // console.log("这是第一个item");
          wx.navigateTo({
            url:"/pages/recommend/recommend"
          })
          break;
        case 1:
          // console.log("这是第二个item");
          wx.navigateTo({
            url:"/pages/sellwell/sellwell"
          })
          break;
        case 2:
          // console.log("这是第三个item");
          wx.navigateTo({
            url:"/pages/special/special"
          })
          break;
        case 3:
          // console.log("这是第四个item");
          wx.navigateTo({
            url:"/pages/feature/feature"
          })
          break;
        default:
          console.log("没有找到")
      }
    }
  }
})