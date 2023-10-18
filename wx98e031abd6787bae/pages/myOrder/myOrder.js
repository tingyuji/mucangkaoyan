var t = require("../../@babel/runtime/helpers/toConsumableArray");

getApp();

Page({
    data: {
        tabid: 0,
        tabbar: [ "待处理", "已发货", "已收货", "已下载" ],
        page: 1,
        page_size: 20,
        kong: !1
    },
    onLoad: function(t) {
        t.type && 1 != t.type && this.setData({
            tabid: 1
        }), this.init();
    },
    init: function() {
        var t = this, a = this;
        this.setData({
            page: 1
        });
        var e = {
            type: this.data.tabid + 1,
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.my_goods_order, e).then(function(e) {
            console.log("我的订单", e), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), a.setData({
                items: e
            });
        });
    },
    qie: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            tabid: a
        }), this.init();
    },
    godetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/orderDetails/orderDetails?id=".concat(a)
        });
    },
    copy: function(t) {
        var a = t.currentTarget.dataset.data;
        wx.setClipboardData({
            data: a.toString(),
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            },
            fail: function(t) {
                console.log(t, "错误");
            }
        });
    },
    pulldown: function() {
        var a = this;
        this.setData({
            page: this.data.page += 1
        });
        var e = {
            type: this.data.tabid + 1,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.my_goods_order, e).then(function(e) {
            console.log("我的订单", e), 0 != e.length && a.setData({
                items: [].concat(t(a.data.items), t(e))
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.pulldown();
    },
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    }
});