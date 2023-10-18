var t = require("../../@babel/runtime/helpers/toConsumableArray");

Page({
    data: {
        page: 1,
        page_size: 20
    },
    onLoad: function(t) {
        this.init();
    },
    init: function() {
        var t = this, e = {
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.amount_log_2, e).then(function(e) {
            console.log(e, "提现明细"), t.setData({
                items: e
            });
        });
    },
    pulldown: function() {
        var e = this;
        this.setData({
            page: this.data.page += 1
        });
        var a = {
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.amount_log_2, a).then(function(a) {
            0 != a.length && e.setData({
                items: [].concat(t(e.data.items), t(a))
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