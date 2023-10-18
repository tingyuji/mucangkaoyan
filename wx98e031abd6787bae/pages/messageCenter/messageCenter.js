var t = require("../../@babel/runtime/helpers/toConsumableArray"), e = require("../../@babel/runtime/helpers/defineProperty"), a = getApp(), i = require("../../api/api").Api;

Page({
    data: {
        domain: i.domain,
        tabid: 1,
        page: 1,
        page_size: 20,
        kong1: !1,
        kong2: !1,
        items: ""
    },
    onLoad: function(t) {
        this.init();
    },
    init: function() {
        var t = this;
        this.setData({
            page: 1
        });
        var e = {
            type: 2 == this.data.tabid ? 1 : 2,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.member_news, e).then(function(e) {
            console.log(e, "反馈的东西"), 2 == t.data.tabid ? 0 == e.length ? t.setData({
                kong1: !0
            }) : t.setData({
                kong1: !1
            }) : 0 == e.length ? t.setData({
                kong2: !0
            }) : t.setData({
                kong2: !1
            }), t.setData({
                items: e
            });
        });
    },
    bindzhan: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData(e({}, "items[".concat(a, "].flage"), !this.data.items[a].flage));
    },
    godetail: function(t) {
        var e = t.currentTarget.dataset.index;
        a.globalData.content = this.data.items[e], wx.navigateTo({
            url: "/pages/feedback/feedback"
        });
    },
    pulldown: function() {
        var e = this;
        this.setData({
            page: this.data.page += 1
        });
        var a = {
            type: 2 == this.data.tabid ? 1 : 2,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.member_news, a).then(function(a) {
            console.log(a, "反馈的东西"), 0 != a.length && e.setData({
                items: [].concat(t(e.data.items), t(a))
            });
        });
    },
    qie: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            tabid: e,
            items: ""
        }), this.init();
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