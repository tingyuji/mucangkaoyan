var i = require("../../@babel/runtime/helpers/defineProperty"), e = getApp(), t = require("../../api/api").Api, a = require("../../api/network.js"), o = require("../../api/wxParse/wxParse.js");

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1,
            observer: "showwatch1"
        },
        jinqun: {
            type: Object,
            value: {}
        }
    },
    data: {
        price: "",
        info: "",
        can: "",
        show2: !1,
        show3: !1,
        domain: t.domain,
        ios: e.globalData.ios
    },
    attached: function() {
        this.setData({
            price: a.get("can").big_price,
            info: a.get("can").big_info,
            can: wx.$cache.get("can"),
            ios: e.globalData.ios
        }), console.log(e.globalData.ios), this.wxParse();
    },
    methods: {
        showwatch1: function(i, t) {
            console.log("show11121121214444"), this.setData({
                price: a.get("can").big_price,
                info: a.get("can").big_info,
                can: wx.$cache.get("can"),
                ios: e.globalData.ios
            });
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        bay: function() {
            this.triggerEvent("bay");
        },
        gomian: function() {
            this.setData({
                show2: !0,
                show: !1
            });
        },
        zhi: function(i) {
            var e = this;
            i.detail;
            wx.$http.get(wx.$get.big_qualifications, {
                type: 2,
                code: i.detail
            }).then(function(i) {
                var t = getCurrentPages();
                t[t.length - 1].init2(), wx.showToast({
                    title: "兑换成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    show2: !1,
                    show3: !0
                }), e.triggerEvent("init", {});
            });
        },
        wxParse: function() {
            var e;
            o.emojisInit("[]", "/wxParse/emojis/", (i(e = {
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
            }, "09", "09.gif"), i(e, "10", "10.gif"), i(e, "11", "11.gif"), i(e, "12", "12.gif"), 
            i(e, "13", "13.gif"), i(e, "14", "14.gif"), i(e, "15", "15.gif"), i(e, "16", "16.gif"), 
            i(e, "17", "17.gif"), i(e, "18", "18.gif"), i(e, "19", "19.gif"), e));
            var t = a.get("can").big_info;
            o.wxParse("article", "html", t, this, 5);
        }
    }
});