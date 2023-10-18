var e = getApp(), o = require("../../api/api").Api;

Component({
    data: {
        userInfo: {},
        domain: o.domain
    },
    properties: {
        active: {
            type: Boolean,
            value: !1
        }
    },
    lifetimes: {
        attached: function() {
            console.log("2222222222222"), this.jinglogo();
        },
        detached: function() {
            console.log("33333333332");
        }
    },
    pageLifetimes: {
        show: function() {
            console.log("444444444444");
        },
        hide: function() {
            console.log("55555555555555");
        },
        resize: function(e) {
            console.log("6666666666666");
        }
    },
    methods: {
        jinglogo: function() {
            var e = this;
            try {
                if (console.log(wx.getUserProfile, "xxx"), !wx.getUserProfile) return console.log("电脑登录"), 
                void this.diannao();
                wx.login({
                    success: function(o) {
                        console.log(o, "第一1111111111111111111111111次");
                        var t = {
                            code: o.code,
                            question_id: wx.getStorageSync("question_id") || 0,
                            p_id: wx.$cache.get("pid") || 0
                        };
                        wx.$http.post(wx.$get.getopenid, t).then(function(o) {
                            console.log(o, "第一次"), wx.$cache.set("key", o.token), e.dengtlu();
                        });
                    }
                });
            } catch (e) {
                wx.showToast({
                    title: "请更新微信版本",
                    icon: "none"
                });
            }
        },
        bindInfo: function() {
            var e = this;
            try {
                if (console.log(wx.getUserProfile, "xxx"), !wx.getUserProfile) return console.log("电脑登录"), 
                void this.diannao();
                wx.getUserProfile({
                    desc: "用于完善会员资料",
                    success: function(o) {
                        console.log(o), e.setData({
                            userInfo: o.userInfo
                        }), wx.login({
                            success: function(o) {
                                var t = {
                                    code: o.code,
                                    question_id: wx.getStorageSync("question_id") || 0,
                                    p_id: wx.$cache.get("pid") || 0
                                };
                                wx.$http.post(wx.$get.getopenid, t).then(function(o) {
                                    console.log(o, "第一次"), wx.$cache.set("key", o.token), e.dengtlu();
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        console.log(e, "失败");
                    }
                });
            } catch (e) {
                wx.showToast({
                    title: "请更新微信版本",
                    icon: "none"
                });
            }
        },
        diannao: function() {
            var e = this;
            wx.login({
                success: function(o) {
                    var t = {
                        code: o.code,
                        p_id: wx.$cache.get("pid") || 0,
                        question_id: wx.getStorageSync("question_id") || 0
                    };
                    wx.$http.post(wx.$get.getopenid, t).then(function(o) {
                        console.log(o, "第一次"), wx.$cache.set("key", o.token), e.user();
                    });
                }
            });
        },
        dengtlu: function() {
            var e = this.data.userInfo;
            e.nickName, e.avatarUrl, e.gender;
        },
        user: function() {
            wx.$http.get(wx.$get.get_member_info, {}).then(function(o) {
                o.vip_time || (o.vip_time = "1970-01-01"), console.log(o, "用户信息"), wx.$cache.set("userinfo", o), 
                wx.$cache.set("member_id", o.id);
                var t = getCurrentPages(), n = t[t.length - 1];
                n.setData({
                    register: !1
                }), n.onShow(), wx.login({
                    success: function(o) {
                        e.code = o.code;
                    }
                });
            });
        },
        closethis1: function() {
            this.setData({
                active: !1
            }), wx.reLaunch({
                url: "/pages/index/index"
            });
        },
        closeyanzheng: function() {
            this.closethis1();
        }
    }
});