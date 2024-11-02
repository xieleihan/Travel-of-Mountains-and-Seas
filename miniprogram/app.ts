// app.ts
App({
  globalData: {
    shopcarList:[
      {
        "pic":"https://picsum.photos/300/300?1",
        "title":"这是标题1",
        "picel":"259.99",
        "num":"1",
        "totalPrice":"259.99",
        "isSelected":false
      },
      {
        "pic":"https://picsum.photos/300/300?2",
        "title":"这是标题2",
        "picel":"256.99",
        "num":"1",
        "totalPrice":"256.99",
        "isSelected":false
      },
      {
        "pic":"https://picsum.photos/300/300?3",
        "title":"这是标题3",
        "picel":"239.33",
        "num":"1",
        "totalPrice":"239.33",
        "isSelected":false
      }
    ],
    count:{
      sumnum:0,
      sumtotel:0
    }
  },
  onLaunch() {
    
  },
})