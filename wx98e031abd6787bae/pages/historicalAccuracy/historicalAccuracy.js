var e = require("../../@babel/runtime/helpers/toConsumableArray");

getApp();

Page({
    data: {
        page: 1,
        page_size: 20,
        items: ""
    },
    onLoad: function(e) {
        this.init();
    },
    init: function() {
        var e = this, t = {
            member_id: wx.$cache.get("member_id"),
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.library_all_list, t).then(function(t) {
            console.log("题库列表", t), e.setData({
                items: t
            });
        });
    },
    pulldown: function() {
        this.setData({
            page: this.data.page += 1
        });
        var t = this, a = {
            member_id: wx.$cache.get("member_id"),
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.library_all_list, a).then(function(a) {
            0 != a.length && t.setData({
                items: [].concat(e(t.data.items), e(a))
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