var e = require("@babel/runtime/helpers/interopRequireDefault").default, t = e(require("./api/event")), n = e(require("./api/init")), i = require("./api/api"), o = e(require("./api/http"));

App({
    onLaunch: function() {
        var e = this;
        (0, n.default)();
        var t = wx.getSystemInfoSync();
        wx.$api = i.$get, wx.$request = o.default.post, wx.$getBase = this.getBaseShow, 
        wx.$http.get(wx.$get.get_show, {}).then(function(n) {
            wx.$cache.set("can", n), console.log("平台", t.platform), 1 == n.edition && -1 != t.system.indexOf("iOS") && (e.globalData.ios = !0), 
            console.log(t, "显示参数");
        }), wx.$http.get(wx.$get.get_share, {}).then(function(e) {
            wx.$cache.set("fx", e), console.log(e, "分享图");
        }), wx.$http.get(wx.$get.share_list, {}).then(function(e) {
            console.log(e, "海报"), wx.$cache.set("hai", e);
        });
    },
    getBaseShow: function() {
        return new Promise(function(e, t) {
            wx.$http.get(wx.$get.get_show, {}).then(function(t) {
                wx.$cache.set("can", t), console.log("ssss"), e(t);
            });
        });
    },
    onShow: function(e) {
        e.query.pid && wx.$cache.set("pid", e.query.pid), e.query.question_id && wx.setStorageSync("question_id", e.query.question_id);
    },
    globalEvent: new t.default(),
    globalData: {
        thisPage: !0,
        userInfo: null,
        domian: "https://qyxm-1304170060.cos.ap-beijing.myqcloud.com/img/"
    }
});