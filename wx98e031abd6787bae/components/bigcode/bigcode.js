var t = getApp(), e = require("../../api/api").Api, a = require("../../api/network.js");

Component({
    properties: {
        type: {
            type: Number,
            value: 1
        },
        show: {
            type: Boolean,
            value: !1
        },
        jinqun: {
            type: Object,
            value: {}
        },
        items3: {
            type: Object,
            value: {}
        }
    },
    data: {
        yin: !1,
        she: !1,
        code: "",
        domain: e.domain,
        show2: !1
    },
    attached: function() {
        a.get("she") && this.setData({
            she: !0
        }), a.get("yin") && this.setData({
            yin: !0
        });
    },
    methods: {
        close: function() {
            this.setData({
                show: !1
            });
        },
        bindcode: function(t) {
            this.setData({
                code: t.detail.value
            });
        },
        btn3: function() {
            this.triggerEvent("zhi", this.data.code);
        },
        huoqu: function() {
            t.globalData.content = a.get("can").big_activation_code, wx.navigateTo({
                url: "/pages/waparse/waparse?title=如何获取激活码&is_url=1"
            });
        }
    }
});