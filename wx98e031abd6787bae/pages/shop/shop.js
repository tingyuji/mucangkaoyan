var t = require("../../@babel/runtime/helpers/toConsumableArray"), a = getApp();

Page({
    data: {
        page: 1,
        page_size: 20,
        items: "",
        userinfo: "",
        register: !1,
        swiper: "",
        jz: "",
        ios: a.globalData.ios,
        domian: a.globalData.domian
    },
    onLoad: function(t) {
        this.init(), this.init2(), this.setData({
            jz: wx.$cache.get("can").integral_price_proportion,
            ios: a.globalData.ios,
            domian: a.globalData.domian
        });
    },
    init: function() {
        var t = this;
        if (console.log(1 == wx.$cache.get("can").is_examine), 1 == wx.$cache.get("can").edition && a.globalData.ios) wx.showToast({
            title: "由于相关规范，IOS功能暂不可用",
            icon: "none",
            duration: 5e3
        }); else {
            var e = {
                page: 1,
                page_size: this.data.page_size
            };
            wx.$http.get(wx.$get.goods_list, e).then(function(a) {
                console.log(a, "商店列表"), t.setData({
                    items: a
                });
            });
        }
    },
    tiao: function(t) {
        console.log(t);
        var e = this.data.swiper, i = t.currentTarget.dataset.index;
        console.log(e), "outside" == e[i].target ? (a.globalData.content = e[i].url, wx.navigateTo({
            url: "/pages/waparse/waparse?title=" + e[i].title + "&is_url=2"
        })) : 1 == e[i].is_tabbar ? (console.log(e[i].path), wx.switchTab({
            url: e[i].path
        })) : e[i].parameter ? wx.navigateTo({
            url: e[i].path + "?" + e[i].parameter
        }) : wx.navigateTo({
            url: e[i].path
        });
    },
    init2: function() {
        var t = this;
        wx.$http.post(wx.$get.get_banner, {
            type: 2
        }).then(function(a) {
            console.log(a, "轮播图"), t.setData({
                swiper: a
            });
        });
    },
    my: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(a) {
            a.vip_time || (a.vip_time = "1970-01-01"), console.log(a, "我的"), t.setData({
                userinfo: a
            });
        });
    },
    gomyorder: function() {
        wx.navigateTo({
            url: "/pages/myOrder/myOrder"
        });
    },
    godetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/commodityDetails/commodityDetails?id=".concat(a)
        });
    },
    gojfen: function() {
        this.data.ios ? wx.navigateTo({
            url: "/pages/dailyTasks/dailyTasks"
        }) : wx.navigateTo({
            url: "/pages/integralRecharge/integralRecharge"
        });
    },
    pulldown: function() {
        this.setData({
            page: this.data.page += 1
        });
        var a = this, e = {
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.goods_list, e).then(function(e) {
            console.log("商店列表上拉加载", e), 0 != e.length && a.setData({
                items: [].concat(t(a.data.items), t(e))
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.my();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.pulldown();
    }
});