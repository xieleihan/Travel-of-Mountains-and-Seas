interface ListItem {
  pic: string;
  title: string;
}

Page({
  data: {
    collectList: [] as ListItem[],
    pic: "",
    title: "",
    isOpen: true,
    count: 0, 
  },

  onLoad() {
    this.updateCollectList();
  },

  onShow() {
    this.updateCollectList();
  },

  updateCollectList() {
    const app = getApp();
    if (app.globalData.collectList.length !== 0) {
      this.setData({
        isOpen: true,
        collectList: app.globalData.collectList
      }, () => {
        // 在 setData 完成后再设置 pic 和 title
        this.setData({
          pic: this.data.collectList[0].pic,
          title: this.data.collectList[0].title
        });
      });
    } else {
      this.setData({
        isOpen: false
      });
    }
  },

  next() {
    const bignum = this.data.collectList.length;
    console.log(bignum)
    let count = this.data.count;

    if (count < bignum - 1) {
      count++;
    } else {
      count = 0;  // 回到第一张
    }
    // console.log(count)

    // 更新当前的图片和标题以及 count 值
    this.setData({
      pic: this.data.collectList[count].pic,
      title: this.data.collectList[count].title,
      count: count  // 更新 count
    });
  }
});
