var t, e = require("../../@babel/runtime/helpers/defineProperty"), a = getApp(), o = require("../../utils/util.js");

Component((e(t = {
    properties: {
        show: {
            type: Boolean,
            value: !0
        },
        type: {
            type: Number,
            value: 1
        },
        gou: {
            type: Number,
            value: 1
        }
    },
    data: {
        ios: !1
    },
    attached: function() {
        this.setData({
            ios: a.globalData.ios
        });
    }
}, "data", {
    domain: getApp().domain,
    can: "",
    code: "",
    show3: !1
}), e(t, "attached", function() {
    console.log("12312"), this.setData({
        can: wx.$cache.get("can")
    });
}), e(t, "methods", {
    prviewimg: function() {
        console.log(this.data.can.public_img_1), wx.previewImage({
            urls: [ this.data.can.public_img_1 ]
        });
    },
    huoqu: function() {
        a.globalData.content = wx.$cache.get("can").get_activation_code, wx.navigateTo({
            url: "/pages/waparse/waparse?title=如何获取激活码&is_url=2"
        });
    },
    close: function() {
        this.setData({
            show: !1
        });
    },
    bindchinge: function(t) {
        this.setData({
            code: t.detail.value
        });
    },
    sure: function() {
        var t = this;
        if (this.data.code) {
            var e = this, a = {
                code: this.data.code
            };
            wx.$http.get(wx.$get.activation_code, a).then(function(a) {
                console.log("使用激活码34334343434", a), console.log("使用激活码", a), e.triggerEvent("init"), 
                t.setData({
                    show: !1
                });
            });
        } else wx.showToast({
            title: "请输入激活码",
            icon: "none"
        });
    },
    show: function() {
        this.setData({
            type: 1
        });
    },
    bay3: function() {
        var t = this, e = {
            type: this.data.gou
        };
        wx.$http.post(wx.$get.pay_vip, e, "支付...").then(function(e) {
            console.log(e, "mai"), wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(e) {
                    t.setData({
                        show: !1,
                        show3: !0
                    });
                    var a = getCurrentPages(), o = a[a.length - 1];
                    2 == t.data.gou ? o.onLoad() : o.onShow();
                },
                fail: function(t) {}
            });
        });
    },
    bay: o.throttle(function(t) {
        this.bay3();
    }, 1e3)
}), t));