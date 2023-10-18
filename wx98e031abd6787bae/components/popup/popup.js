var t = getApp(), e = require("../../api/api").Api;

Component({
    properties: {
        clicidata666: {
            type: Object,
            value: {}
        },
        show: {
            type: Boolean,
            value: !1,
            observer: "showwatch1"
        },
        type: {
            type: Number,
            value: "",
            observer: "bindtyp1"
        },
        gonggongqun: {
            type: Boolean,
            value: !1
        },
        vipqun: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        yin: !1,
        she: !1,
        answer: !1,
        code: "",
        can: "",
        domain: e.domain
    },
    attached: function() {
        var t;
        console.log("12312"), this.setData({
            can: wx.$cache.get("can")
        }), new Date(null === (t = wx.$cache.get("userinfo")) || void 0 === t ? void 0 : t.vip_time.replace(/\-/g, "/")).getTime() > new Date().getTime() && this.setData({
            vipqun: !0
        });
    },
    methods: {
        showwatch1: function(t, e) {
            console.log("show11121121214444"), this.setData({
                can: wx.$cache.get("can")
            });
        },
        clog: function() {
            this.close(), this.triggerEvent("clog", this.properties.clicidata666);
        },
        goen: function() {
            wx.navigateTo({
                url: "/pages/entergroup/entergroup"
            });
        },
        close: function() {
            this.setData({
                show: !1
            }), 2 == this.data.type && (console.log(666), wx.navigateBack({
                delta: 1
            })), 1 == this.data.type && (wx.$cache.get("she") ? this.setData({
                she: !0
            }) : this.setData({
                she: !1
            }), wx.$cache.get("yin") ? this.setData({
                yin: !0
            }) : this.setData({
                yin: !1
            }), wx.$cache.get("answer") ? this.setData({
                answer: !0
            }) : this.setData({
                answer: !1
            })), this.triggerEvent("close");
        },
        bindtyp1: function(t, e) {
            console.log(t, e), 1 == t && (wx.$cache.get("she") ? this.setData({
                she: !0
            }) : this.setData({
                she: !1
            }), wx.$cache.get("yin") ? this.setData({
                yin: !0
            }) : this.setData({
                yin: !1
            }), wx.$cache.get("answer") ? this.setData({
                answer: !0
            }) : this.setData({
                answer: !1
            }));
        },
        qie: function() {
            this.setData({
                yin: !this.data.yin
            });
        },
        qie2: function() {
            this.setData({
                she: !this.data.she
            });
        },
        qie3: function() {
            this.setData({
                answer: !this.data.answer
            });
        },
        btn: function() {
            wx.$cache.set("yin", this.data.yin), wx.$cache.set("she", this.data.she), wx.$cache.set("answer", this.data.answer), 
            this.close();
        },
        bindcode: function(t) {
            this.setData({
                code: t.detail.value
            });
        },
        btn3: function() {
            var t = this, e = {
                code: this.data.code
            };
            wx.$http.get(wx.$get.activation_code, e).then(function(e) {
                console.log("使用激活码", e), t.triggerEvent("init"), wx.showToast({
                    title: "使用成功",
                    icon: "none",
                    duration: 1500
                }), wx.navigateTo({
                    url: "/pages/entergroup/entergroup"
                });
            });
        },
        huoqu: function() {
            t.globalData.content = wx.$cache.get("can").get_activation_code, wx.navigateTo({
                url: "/pages/waparse/waparse?title=如何获取激活码&is_url=2"
            });
        }
    }
});