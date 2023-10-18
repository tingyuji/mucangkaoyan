var e = getApp();

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        type: {
            type: Number,
            value: 1
        },
        qun: {
            type: Number,
            value: 1
        },
        gou: {
            type: Number,
            value: 1
        }
    },
    attached: function() {
        console.log(wx.$cache.get("jinqun"), "da", wx.$cache.get("key")), this.setData({
            jinqun: wx.$cache.get("jinqun"),
            jinqun2: wx.$cache.get("can").activation_str,
            jinqun3: wx.$cache.get("can").activation_group_str,
            jinqun4: wx.$cache.get("can").ky_vip_str
        });
    },
    data: {
        jinqun: "",
        domain: e.domain,
        code: "",
        jinqun2: "",
        jinqun4: ""
    },
    methods: {
        close: function() {
            this.setData({
                show: !1
            });
        },
        forme: function() {
            this.setData({
                jinqun: wx.$cache.get("jinqun"),
                jinqun2: wx.$cache.get("can").activation_str,
                jinqun3: wx.$cache.get("can").activation_group_str,
                jinqun4: wx.$cache.get("can").ky_vip_str
            });
        },
        bindcode: function(e) {
            this.setData({
                code: e.detail.value
            });
        },
        huoqu: function() {
            e.globalData.content = "http://mp.weixin.qq.com/s?__biz=Mzg2OTE3ODY3NQ==&mid=100016700&idx=1&sn=4c7908ca807fae317831c56054db5aa4&chksm=4ea38e6079d40776891329893322fabee6fb79b70591e42efc7185101224e6ed100ea28c1906#rd", 
            wx.navigateTo({
                url: "/pages/waparse/waparse?title=如何获取激活码&is_url=2"
            });
        },
        suree2: function() {
            if ("" !== this.data.code) {
                var e = getCurrentPages();
                e[e.length - 1].jinqu();
            } else wx.showToast({
                title: "请输入激活码",
                icon: "none",
                duration: 2e3
            });
        },
        suree: function() {
            if (21 == this.data.code.length) if ("vip" == this.data.code.substring(0, 3)) {
                if (wx.$cache.set("fen", !0), this.setData({
                    show: !1
                }), wx.$cache.get("fen")) {
                    var e = getCurrentPages();
                    e[e.length - 1].jinqu();
                }
            } else wx.showToast({
                title: "激活码错误",
                icon: "none",
                duration: 2e3
            }); else wx.showToast({
                title: "激活码错误",
                icon: "none",
                duration: 2e3
            });
        }
    }
});