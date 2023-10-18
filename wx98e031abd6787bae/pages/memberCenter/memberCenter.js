var t = require("../../@babel/runtime/helpers/defineProperty"), e = getApp();

Page({
    data: {
        show2: !1,
        can: "",
        ios: e.globalData.ios,
        show: !1,
        type: 3,
        jinqun: "",
        content: "",
        userinfo: "",
        domian: e.globalData.domian
    },
    onLoad: function(t) {
        this.setData({
            can: wx.$cache.get("can"),
            ios: e.globalData.ios,
            domian: e.globalData.domian
        }), this.my();
    },
    show: function() {
        this.setData({
            show: !0
        });
    },
    show2: function() {
        console.log("执行"), this.setData({
            show: !0,
            type: 3
        });
    },
    wxParse: function() {
        var e;
        WxParse.emojisInit("[]", "/wxParse/emojis/", (t(e = {
            "00": "00.gif",
            "01": "01.gif",
            "02": "02.gif",
            "03": "03.gif",
            "04": "04.gif",
            "05": "05.gif",
            "06": "06.gif",
            "07": "07.gif",
            "08": "08.gif",
            "09": "09.gif"
        }, "09", "09.gif"), t(e, "10", "10.gif"), t(e, "11", "11.gif"), t(e, "12", "12.gif"), 
        t(e, "13", "13.gif"), t(e, "14", "14.gif"), t(e, "15", "15.gif"), t(e, "16", "16.gif"), 
        t(e, "17", "17.gif"), t(e, "18", "18.gif"), t(e, "19", "19.gif"), e));
        var i = this.data.content;
        WxParse.wxParse("article", "html", i, this, 5);
    },
    xu: function() {
        var t = this;
        wx.$http.get(wx.$get.pay_library, {
            type: 1
        }, "支付...").then(function(e) {
            console.log("续费", e), wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(e) {
                    t.my2();
                },
                fail: function(t) {}
            });
        });
    },
    my: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(e) {
            e.vip_time || (e.vip_time = 0), t.setData({
                userinfo: e
            }), console.log("我的", e), wx.$cache.set("userinfo", e);
        });
    },
    my2: function() {
        var t = this;
        this.setData({
            show2: !0,
            type: 2
        }), wx.$http.get(wx.$get.get_member_info, {}).then(function(e) {
            e.vip_time || (e.vip_time = "1970-01-01"), t.setData({
                userinfo: e
            }), console.log("我的", e), wx.$cache.set("userinfo", e);
        });
    },
    onShareAppMessage: function() {
        return {
            title: network.get("fx").title,
            imageUrl: network.get("fx").img,
            path: "/pages/index/index?pid=".concat(network.get("member_id"))
        };
    }
});