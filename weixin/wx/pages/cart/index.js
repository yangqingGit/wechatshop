// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    selectall:false,
    list:[
    
    ],
    totalPrice:''
    
  },

//选择
select:function(e){
  var id = e.target.dataset.id;
  var flag=1;
  console.log()
  this.data.list[id].isselect = !this.data.list[id].isselect;
  
  this.priceTotal();

  for(var i=0;i<this.data.list.length;i++){
    if(this.data.list[i].isselect==0){
      this.data.selectall=false;
      flag=0;
    }
  }

  if(flag==1){
    this.data.selectall=true;
  }
  this.setData({
    list: this.data.list,
    selectall:this.data.selectall
  })

},
//数量增加
  add:function(e){
   console.log(e.target.dataset.id);
    var id = e.target.dataset.id;
    this.data.list[id].nums++;
    this.data.list[id].isselect=true;
    this.setData({
      list:this.data.list
    })
    this.priceTotal();
  },
   //数量减少
  plus:function(e){
    console.log(e.target.dataset.id);
    var id = e.target.dataset.id;
    if (this.data.list[id].nums>1){
      this.data.list[id].nums--;
      this.data.list[id].isselect = true;
      this.setData({
        list: this.data.list
      })
    }
    this.priceTotal();
   
  },

  //总计计算
  priceTotal:function(){
    this.data.totalPrice = 0;
      for (var i = 0; i < this.data.list.length; i++) {
        if (this.data.list[i].isselect ==1){
          this.data.totalPrice += this.data.list[i].price * this.data.list[i].nums;
        } 
      }
    this.setData({
      totalPrice: this.data.totalPrice  
      
    })
    
  },
  //全选
  allselect:function(){
     this.data.selectall=!this.data.selectall;
     this.data.totalPrice=0;
      if(this.data.selectall==true){
        for (var i = 0; i < this.data.list.length; i++) {
          this.data.list[i].isselect=1;
            this.data.totalPrice += this.data.list[i].price * this.data.list[i].nums;         
        }
      }
      else{
        for (var i = 0; i < this.data.list.length; i++) {
          this.data.list[i].isselect = 0;
        }
      }
    this.setData({
      totalPrice: this.data.totalPrice,
      selectall: this.data.selectall,
      list:this.data.list
    })
     
  },
  delectItem:function(e){
   var that=this;
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        if (res.confirm) {
          var id = e.target.dataset.id;    
          that.data.list.splice(id, 1);
          that.setData({
            list: that.data.list
          })
          wx.setStorageSync('cart', that.data.list)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var arr = wx.getStorageSync('cart') || [];
    if (arr.length > 0) {
      that.setData({
        list: arr
      })
    }
    this.priceTotal();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(222)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(111111111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})