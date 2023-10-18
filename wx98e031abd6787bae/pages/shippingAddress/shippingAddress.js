var t = require("../../@babel/runtime/helpers/toConsumableArray"), e = getApp();

Page({
    data: {
        page: 1,
        page_size: 20,
        items: "",
        kong: !1
    },
    onLoad: function(t) {},
    goadd: function() {
        wx.navigateTo({
            url: "/pages/newAddress/newAddress"
        });
    },
    edit: function(t) {
        var n = t.currentTarget.dataset.index;
        e.address = this.data.items[n], wx.navigateTo({
            url: "/pages/editAddress/editAddress"
        });
    },
    goxuan: function(t) {
        var e = t.currentTarget.dataset.index;
        wx.$cache.set("dz", this.data.items[e]), wx.navigateBack({
            delta: 1
        });
    },
    init: function() {
        var t = this, e = this, n = {
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.list_goods_address, n).then(function(n) {
            console.log("收货地址列表", n), 0 == n.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), e.setData({
                items: n
            });
        });
    },
    shemo: function(t) {
        var e = t.currentTarget.dataset.id, n = this, a = {
            goods_address_id: e
        };
        wx.$http.get(wx.$get.goods_address_default, a).then(function(t) {
            console.log("把地址设为默认", t), n.init();
        });
    },
    pulldown: function() {
        var e = this, n = {
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.list_goods_address, n).then(function(n) {
            console.log("收货地址列表", n), 0 != n.length && e.setData({
                items: [].concat(t(e.data.items), t(n))
            });
        });
    },
    del: function(t) {
        var e = t.currentTarget.dataset.id, n = this;
        wx.showModal({
            title: "提示",
            content: "你确定要删除吗",
            success: function(t) {
                if (t.confirm) {
                    var a = {
                        goods_address_id: e
                    };
                    wx.$http.get(wx.$get.del_goods_address, a).then(function(t) {
                        console.log("删除", t), n.init();
                    });
                } else t.cancel && console.log("用户点击取消");
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.init();
    },
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