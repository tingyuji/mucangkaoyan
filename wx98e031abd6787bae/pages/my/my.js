var t = getApp(), i = require("../../api/api").Api;

Page({
    data: {
        windowW: "",
        windowH: "",
        items: "",
        register: !1,
        show: !1,
        jinqun: "",
        num: "",
        phone: !1,
        vip: "",
        domain: i.domain,
        domian: t.globalData.domian,
        shua: {
            statistics: ""
        }
    },
    onLoad: function(t) {
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    windowW: t.windowWidth,
                    windowH: t.windowHeight
                });
            }
        }), this.shuati();
    },
    hong: function() {
        var t = this, e = {
            member_id: network.get("member_id")
        };
        network.requestLoading(i.GET.index_feedback, e, 3, "", "GET", "", function(i) {
            console.log("红点数", i), t.setData({
                num: i
            });
        }, function() {});
    },
    shuati: function() {
        var t = this;
        wx.$http.get(wx.$get.subject_statistics_log, {}).then(function(i) {
            console.log(i, "ben刷题量"), t.setData({
                "shua.statistics": i
            });
            for (var e = function(i) {
                setTimeout(function() {
                    t.drawCanvas(.01 * i);
                }, 200 - 100 / i);
            }, n = 0; n <= 100; n++) e(n);
        });
    },
    init: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(i) {
            i.vip_time || (i.vip_time = "1970-01-01"), console.log(i, "用户信息"), wx.$cache.set("userinfo", i), 
            wx.$cache.set("member_id", i.id), t.setData({
                items: i,
                vip: t.judgeTime(i.vip_time)
            });
        });
    },
    drawCanvas: function(t) {
        var i = wx.createCanvasContext("mycanvas"), e = this.data.windowW / 750;
        i.clearRect(0, 0, 600 * e, 430 * e);
        this.data.windowH;
        var n = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ], s = [], a = this.data.shua, o = [ a.statistics[0].num * t, a.statistics[1].num * t, a.statistics[2].num * t, a.statistics[3].num * t, a.statistics[4].num, a.statistics[5].num * t, a.statistics[6].num * t ], h = [ a.statistics[0].num, a.statistics[1].num, a.statistics[2].num, a.statistics[3].num, a.statistics[4].num, a.statistics[5].num, a.statistics[6].num ], u = Math.max.apply(Math, h);
        if (u >= 3) {
            var c = Math.ceil(u / 3);
            s[3] = 0, s[2] = c, s[1] = 2 * c, s[0] = 3 * c;
        } else s = [ "3", "2", "1", "0" ];
        i.setFillStyle("#918E82"), i.setFontSize(26 * e), i.fillText(s[0], 0 * e, 42 * e), 
        i.fillText(s[1], 0 * e, 142 * e), i.fillText(s[2], 0 * e, 237 * e), i.fillText(s[3], 0 * e, 335 * e), 
        this.xu(i, 38 * e, 30 * e, 583 * e, 30 * e), this.xu(i, 38 * e, 132 * e, 583 * e, 132 * e), 
        this.xu(i, 38 * e, 230 * e, 583 * e, 230 * e), this.xu(i, 38 * e, 330 * e, 583 * e, 330 * e), 
        i.setFontSize(24 * e), i.fillText(n[0], 50 * e, 377 * e), i.fillText(n[1], 140 * e, 377 * e), 
        i.fillText(n[2], 220 * e, 377 * e), i.fillText(n[3], 307 * e, 377 * e), i.fillText(n[4], 394 * e, 377 * e), 
        i.fillText(n[5], 471 * e, 377 * e), i.fillText(n[6], 551 * e, 377 * e), this.xian(i, s, o, e), 
        this.yuan(i, 65 * e, this.height(s[0], o, 0) * e, 7 * e), this.yuan(i, 155 * e, this.height(s[0], o, 1) * e, 7 * e), 
        this.yuan(i, 236 * e, this.height(s[0], o, 2) * e, 7 * e), this.yuan(i, 320 * e, this.height(s[0], o, 3) * e, 7 * e), 
        this.yuan(i, 410 * e, this.height(s[0], o, 4) * e, 7 * e), this.yuan(i, 488 * e, this.height(s[0], o, 5) * e, 7 * e), 
        this.yuan(i, 565 * e, this.height(s[0], o, 6) * e, 7 * e), i.draw();
    },
    xu: function(t, i, e, n, s) {
        t.setLineDash([ 5, 3 ], 1), t.beginPath(), t.setStrokeStyle("#F1F1F1"), t.moveTo(i, e), 
        t.lineTo(n, s), t.stroke();
    },
    height: function(t, i, e) {
        return 300 - 300 / t * i[e] + 30;
    },
    xian: function(t, i, e, n) {
        t.beginPath();
        var s = t.createLinearGradient(0 * n, 0 * n, 0 * n, 432 * n);
        t.setLineDash([ 0, 0 ], 0), s.addColorStop(0, "#FDD655"), s.addColorStop(1, "#FFFAE8"), 
        t.setStrokeStyle("#FDD655"), t.setFillStyle(s), t.moveTo(65 * n, 329 * n), t.lineTo(65 * n, this.height(i[0], e, 0) * n), 
        t.lineTo(155 * n, this.height(i[0], e, 1) * n), t.lineTo(236 * n, this.height(i[0], e, 2) * n), 
        t.lineTo(320 * n, this.height(i[0], e, 3) * n), t.lineTo(410 * n, this.height(i[0], e, 4) * n), 
        t.lineTo(488 * n, this.height(i[0], e, 5) * n), t.lineTo(565 * n, this.height(i[0], e, 6) * n), 
        t.lineTo(565 * n, 329 * n), t.closePath(), t.stroke(), t.fill(), t.beginPath(), 
        t.setStrokeStyle("#fff"), t.moveTo(565 * n, this.height(i[0], e, 6) * n), t.lineTo(565 * n, 329 * n), 
        t.lineTo(65 * n, 329 * n), t.lineTo(65 * n, this.height(i[0], e, 0) * n), t.stroke(), 
        t.closePath();
    },
    yuan: function(t, i, e, n, s) {
        t.beginPath(), t.arc(i, e, n, 0, 2 * Math.PI), t.setFillStyle("#FDD655"), t.fill();
    },
    jinqun: function() {
        var t = this;
        network.requestLoading(i.GET.reply_qun, {}, 3, "", "GET", "", function(i) {
            console.log("进群参数", i), t.setData({
                jinqun: i
            });
        }, function() {});
    },
    gohui2: function() {
        wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        });
    },
    gohui: function() {
        this.data.vip ? this.setData({
            show: !0
        }) : wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        });
    },
    close: function() {
        this.setData({
            show: !1
        });
    },
    gofeek: function() {
        wx.navigateTo({
            url: "/pages/feedbackList/feedbackList"
        });
    },
    judgeTime: function(t) {
        if (!t) return !1;
        var i = t.replace(/-/g, "/");
        return !(Date.parse(new Date(i)) < Date.parse(new Date()));
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            ios: t.globalData.ios
        }), this.init();
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