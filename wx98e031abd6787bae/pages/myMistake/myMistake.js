var t = getApp();

Page({
    data: {
        register: !1,
        items: "",
        page_size: 20,
        domian: t.globalData.domian
    },
    onLoad: function(t) {
        this.init();
    },
    gomao: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/mao/mao?id=" + e + "&name=" + a
        });
    },
    init: function() {
        var t = this, e = {
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.post(wx.$get.wrong_log_course_1, e).then(function(e) {
            console.log(e, "我的错题"), t.setData({
                items: e
            });
        });
    },
    onPageScroll: function(t) {
        t.scrollTop > 80 ? this.setData({
            background: "white"
        }) : this.setData({
            background: ""
        });
    },
    onReady: function() {},
    onShow: function() {},
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
    }
});