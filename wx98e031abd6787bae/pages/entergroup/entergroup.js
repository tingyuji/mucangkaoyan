var e = require("../../api/api").Api;

Page({
    data: {
        request: !1,
        can: "",
        vip: "",
        domain: e.domain
    },
    onLoad: function(e) {
        this.setData({
            can: wx.$cache.get("can")
        });
    },
    init: function() {
        var e = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(t) {
            t.vip_time || (t.vip_time = "1970-01-01"), console.log(t, "用户信息"), wx.$cache.set("userinfo", t), 
            wx.$cache.set("member_id", t.id), e.setData({
                vip: e.judgeTime(t.vip_time),
                request: !0
            });
        });
    },
    judgeTime: function(e) {
        if (!e) return !1;
        var t = e.replace(/-/g, "/");
        return !(Date.parse(new Date(t)) < Date.parse(new Date()));
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
    }
});