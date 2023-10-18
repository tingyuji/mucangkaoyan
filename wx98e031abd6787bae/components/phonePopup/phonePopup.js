var e = getApp(), t = require("../../api/api").Api;

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        domain: t.domain
    },
    lifetimes: {
        show: function() {
            wx.login({
                success: function(t) {
                    e.code = t.code;
                }
            });
        },
        attached: function() {
            console.log("09090909090909"), this.bangsss();
        }
    },
    methods: {
        bangsss: function() {},
        getPhoneNumber: function(t) {
            var n = this, o = {
                code: e.code,
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv,
                session_key: wx.$cache.get("key")
            };
            wx.$http.post(wx.$get.decryption, o).then(function(e) {
                console.log("获取手机号", e), n.bang(e);
            }).catch(function() {
                wx.login({
                    success: function(t) {
                        e.code = t.code;
                    }
                });
            });
        },
        closethis1: function() {
            this.setData({
                show: !1
            }), wx.switchTab({
                url: "/pages/index/index"
            });
        },
        bang: function(e) {}
    }
});