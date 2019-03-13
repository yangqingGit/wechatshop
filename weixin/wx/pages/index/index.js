//index.js
//获取应用实例
const app = getApp()
const WXAPI = require('../../utils/api.js')
 var goodsdata=require("../../mock/goods.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noAuthor:false,
    imgUrls: [
      "/pages/images/banner01.jpg",
      "/pages/images/banner02.jpg",
      "/pages/images/banner03.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    types:["全部","狗粮","玩具","衣服","磨牙棒","洗护"],
    currentTypeId:0,
    goodsList:[],
    filtergoods:[],
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  
  onLoad: function () {

    //查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log("判断授权")
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function () {
              //登陆
              //  wx.login({
              //    success: res => {
              //      console.log(res.code)
              //      //发送 res.code 到后台换取 openId, sessionKey, unionId
              //      if (res.code) {
              //        WXAPI.login(res.code).then(function (res) {
              //          console.log(res)
              //        })
              //      }
              //      else {
              //        //获取code失败
              //      }
              //    }
              //  })
            }
          })
        }
        else {
          wx.redirectTo({
            url: '../authorize/index',//授权页面
          })
        }
      }
    })

    var that = this;
    this.setData({
      goodsList:goodsdata.goods,
      filtergoods:goodsdata.goods
    });
    
   

     
    


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
     
    
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
   
  },
  tabClick: function (e) {
    this.setData({
      currentTypeId: e.currentTarget.id,
    });
   
    this.filterGoods(e.currentTarget.id);
  },
  filterGoods:function(type){
    console.log(type);
    if(type==0){
      this.setData({
        filtergoods: this.data.goodsList
      })
    }
    else{
      var result = this.data.goodsList.filter(good => good.type == type);
      console.log(result);
      this.setData({
        filtergoods: result
      })
    }
    
  },
  navtoDetail:function(e){
    var id=e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/goodsDetail/index?id='+id
    })
  }

  
  })
