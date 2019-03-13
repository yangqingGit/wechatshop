// pages/goodsDetail/index.js

var good=require("../../mock/goods.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    goods:[],
    id:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    liketap:false
     
  },


  addCart:function(){

    var that = this;
    var goods = this.data.goods;

    goods.isselect = false;
    goods.nums=1;

    var count = this.data.goods.nums;

    var title = this.data.goods.title;

    if (title.length > 13) {

      goods.title = title.substring(0, 13) + '...';

    }    

    var arr = wx.getStorageSync('cart') || [];   
    console.log(arr) 
    if(arr.length>0){
      for (var i in arr) {

        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
         console.log(that.data.id)
        if (arr[i].id == that.data.id) {
          console.log(11111)

          // 相等的话，给count+1（即再次添加入购物车，数量+1）  

          arr[i].nums = arr[i].nums + 1;

          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  

          try {

            wx.setStorageSync('cart', arr)

          } catch (e) {

            console.log(e)

          }   

          //关闭窗口

          wx.showToast({

            title: '加入购物车成功！',

            icon: 'success',

            duration: 2000

          });  
          return; 
        
        }
         

       
      }

      arr.push(goods);
          
    }
      
    else{
      
      arr.push(goods);
    }
    try {

      wx.setStorageSync('cart', arr)

      // 返回（在if内使用return，跳出循环节约运算，节约性能） 

      //关闭窗口

      wx.showToast({

        title: '加入购物车成功！',

        icon: 'success',

        duration: 2000

      });


      return;

    } catch (e) {

      console.log(e)

    }
   
  },
   liketap:function(){
     var that=this;
     this.data.liketap=!this.data.liketap;
     this.setData({
       liketap:that.data.liketap
     })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id:options.id
    })
    console.log(this.data.id);
    this.data.goods = good.goods[options.id];
      this.setData({
        goods:this.data.goods
      })
      console.log(this.data.goods)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})