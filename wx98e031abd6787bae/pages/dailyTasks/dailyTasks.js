var t = getApp(), n = require("../../api/api").Api;

Page({
    data: {
        items: "",
        register: !1,
        ios: t.globalData.ios,
        phone: !1,
        userinfo: "",
        domian: t.globalData.domian,
        _domian: n.domain
    },
    onLoad: function(t) {
        this.init();
    },
    gotopicAnalysis: function(t) {
        2 == t.currentTarget.dataset.type && wx.navigateTo({
            url: "/pages/bank/bank"
        });
    },
    userinfo: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(n) {
            n.vip_time || (n.vip_time = "1970-01-01"), console.log(n, "用户信息"), wx.$cache.set("userinfo", n), 
            t.setData({
                userinfo: n
            });
        });
    },
    init: function() {
        var t = this;
        wx.$http.get(wx.$get.get_sign_list, {}).then(function(n) {
            console.log(n, "签到记录"), t.setData({
                items: n
            });
        });
    },
    gocong: function() {
        wx.navigateTo({
            url: "/pages/integralRecharge/integralRecharge"
        });
    },
    qian: function() {
        var t = this, n = this;
        wx.$http.get(wx.$get.add_sign, {}).then(function(e) {
            wx.showToast({
                title: "签到成功",
                icon: "success",
                duration: 2e3
            }), n.init(), t.userinfo();
        });
    },
    onReady: function() {},
    onShow: function() {
        this.userinfo();
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
    }
});