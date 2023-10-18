var t = getApp();

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
        code: ""
    },
    methods: {
        close: function() {
            this.setData({
                show: !1
            }), this.triggerEvent("close");
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
        bindcode: function(t) {
            this.setData({
                code: t.detail.value
            });
        },
        btn3: function() {
            this.triggerEvent("zhi", this.data.code);
        },
        huoqu: function() {
            t.globalData.content = network.get("can").goods_activation_code, wx.navigateTo({
                url: "/pages/waparse/waparse?title=如何获取激活码&is_url=2"
            });
        }
    }
});