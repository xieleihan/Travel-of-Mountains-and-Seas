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
    swiperList: [
      { 
        "pic": "https://picsum.photos/3840/2160?1",
        "title":"故宫：明清两代皇宫，世界五大宫之首，宏伟壮丽，见证中国古代皇家辉煌。"
      },
      { 
        "pic": "https://picsum.photos/3840/2160?2",
        "title":"长城：万里长城，世界奇迹，雄伟壮观，历经千年风雨，守护中华文明。"
      },
      { 
        "pic": "https://picsum.photos/3840/2160?3",
        "title":"西湖：杭州明珠，湖光山色，诗画江南，四季如画，人间天堂。"
      },
      { 
        "pic": "https://picsum.photos/3840/2160?4",
        "title":"兵马俑：秦始皇陵兵马俑，世界第八大奇迹，规模宏大，展现秦代军事风采。"
      },
      { 
        "pic": "https://picsum.photos/3840/2160?5",
        "title":"黄山：天下第一奇山，奇松、怪石、云海、温泉，自然奇观，令人叹为观止。"
      }
    ],
    "text":""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperChange(e:any) {
      const currentIndex = e.detail.current;
      this.setData({
        text: this.data.swiperList[currentIndex].title
      });
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {
      // 使用attached代替onLoad
      this.setData({
        text: this.data.swiperList[0].title
      });
    }
  },


})
