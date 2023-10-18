var e = getApp(), t = require("../../api/api").Api;

Page({
    data: {
        show: !1,
        items: "",
        html: "",
        er: "",
        domain: t.domain,
        domian: e.globalData.domian
    },
    onLoad: function(e) {
        this.setData({
            html: wx.$cache.get("can").share_content
        }), this.er(), wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    init: function() {
        var e = this;
        wx.$http.get(wx.$get.share_statistics, {}).then(function(t) {
            console.log(t, "统计"), e.setData({
                items: t
            });
        });
    },
    er: function() {
        var e = this, t = {
            qroscene: wx.$cache.get("member_id"),
            page: ""
        };
        wx.$http.get(wx.$get.qrcode, t).then(function(t) {
            console.log(t, "小程序码"), e.setData({
                er: t
            });
        });
    },
    go: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    bindshow: function() {
        this.setData({
            show: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        this.init();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    },
    onShareTimeline: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            query: "a=".concat(wx.$cache.get("member_id"))
        };
    }
});