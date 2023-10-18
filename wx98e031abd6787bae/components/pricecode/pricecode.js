getApp();

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
        show2: ""
    },
    methods: {
        close: function() {
            this.setData({
                show: !1
            }), this.triggerEvent("close");
        },
        btn: function() {
            network.put("yin", this.data.yin), network.put("she", this.data.she), this.close();
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
            this.setData({
                show: !1,
                show2: !0
            });
        }
    }
});