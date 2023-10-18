var e = require("../../@babel/runtime/helpers/regeneratorRuntime"), t = require("../../@babel/runtime/helpers/asyncToGenerator"), n = require("../../api/api").Api, a = require("../../api/network.js"), i = getApp();

Component({
    data: {
        num: 60,
        yzmname: "获取验证码",
        yzmActive: !0,
        val: "",
        opening: 1,
        domain: n.domain,
        phoneCode: ""
    },
    properties: {
        logoImg: {
            type: String,
            value: n.domain + "logo.png"
        },
        midImg: {
            type: String,
            value: n.domain + "bander1.png"
        },
        active: {
            type: Boolean,
            value: !1
        },
        phoActive: {
            type: Boolean,
            value: !1
        },
        redPacketshow: {
            type: Boolean,
            value: !1
        },
        shareTxt: {
            type: String,
            value: "＞分享喜悦＜"
        },
        redType: {
            type: String,
            value: "幸运红包"
        },
        Rewardtitle: {
            type: String,
            value: "通用优惠券"
        },
        Awardsshow: {
            type: String,
            value: "2019.06.30到期"
        },
        money: {
            type: Number,
            value: 0
        },
        activity_id: {
            type: Number,
            value: 0
        },
        coupon_id: {
            type: Number,
            value: 0
        }
    },
    attached: function() {},
    methods: {
        auth: function() {
            var i = this;
            return t(e().mark(function t() {
                var o, r;
                return e().wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return o = i, e.next = 3, wx.getUserProfile({
                            desc: "用于完善会员资料"
                        });

                      case 3:
                        r = e.sent, i.setData({
                            userInfo: r.userInfo
                        }), wx.login({
                            success: function(e) {
                                var t = {
                                    code: e.code,
                                    p_id: a.get("pid") || 0
                                };
                                a.requestLoading(n.GET.getopenid, t, 2, "登录中...", "GET", "", function(e) {
                                    console.log(e, "res"), a.put("key", e.token), a.put("member_id", e.info.id), o.login();
                                }, function() {
                                    wx.showToast({
                                        title: r.message
                                    });
                                });
                            }
                        });

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, t);
            }))();
        },
        login: function() {
            var e = this.data.userInfo, t = {
                nickname: e.nickName,
                img: e.avatarUrl
            };
            console.log(t), a.requestLoading(n.GET.update_weixin_member, t, 1, "", "GET", "", function(e) {
                wx.login({
                    success: function(e) {
                        i.code = e.code;
                    }
                });
                var t = getCurrentPages(), o = t[t.length - 1];
                o.onShow(), o.setData({
                    register: !1
                }), a.requestLoading(n.GET.member_info, {
                    member_id: a.get("member_id")
                }, 1, "登录中....", "GET", "", function(e) {
                    a.put("userinfo", e);
                }, function() {});
            }, function() {});
        },
        bindInfo: function(e) {
            wx.getSetting({
                lang: "zh_CN",
                success: function(e) {
                    e.authSetting["scope.userInfo"] && wx.login({
                        success: function(t) {
                            var i = {
                                code: t.code,
                                p_id: a.get("pid") || 0
                            };
                            a.requestLoading(n.GET.getopenid, i, 2, "登录中...", "GET", "", function(e) {
                                a.put("token", e.token), wx.getUserInfo({
                                    success: function(e) {
                                        n.userInfo = JSON.parse(e.rawData);
                                        var t = {
                                            token: a.get("token"),
                                            signature: e.signature,
                                            rawData: e.rawData,
                                            iv: e.iv,
                                            encryptedData: e.encryptedData
                                        };
                                        a.requestLoading(n.GET.login, t, 3, "登录中....", "GET", "", function(e) {
                                            a.put("key", e.key), a.put("member_id", e.member_id);
                                            var t = getCurrentPages(), i = t[t.length - 1];
                                            "pages/classification/classification" == i.route ? i.setData({
                                                register: !1
                                            }) : i.onShow(), a.requestLoading(n.GET.member_info, {
                                                member_id: e.member_id
                                            }, 1, "登录中....", "GET", "", function(e) {
                                                a.put("userinfo", e);
                                            }, function() {});
                                        }, function(t) {
                                            console.error(t), wx.showToast({
                                                title: e.error,
                                                duration: 3e3,
                                                icon: "none"
                                            });
                                        });
                                    }
                                });
                            }, function() {
                                wx.showToast({
                                    title: e.message
                                });
                            });
                        }
                    });
                }
            });
        },
        bindinput: function(e) {
            this.setData({
                val: e.detail.value
            });
        },
        bindhqyzm: function() {
            var e = this, t = e.data.val;
            if (e.data.yzmActive) if (e.setData({
                yzmActive: !1
            }), /^1(3|4|5|7|8)\d{9}$/.test(t)) {
                var i = {
                    mobile: t
                };
                a.requestLoading(n.GET.get_code, i, 1, "已发送", "GET", "", function(t) {
                    e.setData({
                        yzmActive: !0
                    });
                }, function() {
                    clearInterval(e.yzmTimer), e.setData({
                        yzmname: "重新发送",
                        num: 60,
                        yzmActive: !0
                    });
                }), e.yzmTimer = setInterval(function() {
                    var t = e.data.num;
                    0 == --t ? (clearInterval(e.yzmTimer), e.setData({
                        yzmname: "重新发送",
                        num: 60,
                        yzmActive: !0
                    })) : e.setData({
                        yzmname: t + "s",
                        num: t
                    });
                }, 1e3);
            } else wx.showModal({
                title: "填写错误！",
                content: "手机号码格式有误"
            }); else wx.showToast({
                title: "已发送，请注意查收",
                icon: "none",
                duration: 2e3
            });
        },
        openPacket: function() {
            var e = this;
            a.get("key") && e.setData({
                opening: 2
            });
            var t = getCurrentPages();
            if ("pages/refuel/refuel" == t[t.length - 1].route) {
                var i = {
                    id: e.data.activity_id
                };
                a.requestLoading(n.GET.acadd_coupon, i, 1, "", "GET", "", function(t) {
                    e.setData({
                        opening: 3
                    }), setTimeout(function() {
                        var e = getCurrentPages();
                        e[e.length - 1].setData({
                            redPacketshow: !1
                        }), wx.showToast({
                            title: t
                        });
                    }, 2e3);
                }, function(t) {
                    e.setData({
                        opening: 1
                    });
                });
            } else {
                i = {
                    activity_id: e.data.activity_id,
                    coupon_id: e.data.coupon_id
                };
                a.requestLoading(n.GET.add_coupon, i, 1, "", "GET", "", function(t) {
                    e.setData({
                        opening: 3
                    });
                }, function(t) {
                    e.setData({
                        opening: 1
                    });
                });
            }
        },
        tocoupon: function() {
            wx.navigateTo({
                url: "/pages/discount/discount"
            });
        },
        closethis: function() {
            this.setData({
                redPacketshow: !1
            });
        },
        verification_code: function() {
            var e = this.data.val, t = this.data.phoneCode, i = {
                mobile: e,
                code: t
            };
            a.requestLoading(n.GET.verification_code, i, 1, "验证中...", "GET", "", function(t) {
                var i = {
                    mobile: e
                };
                a.requestLoading(n.GET.update_mobile, i, 1, "", "GET", "", function(e) {}, function(e) {});
                var o = a.get("userInfo");
                o.member_mobile = e, a.put("userInfo", o);
                var r = getCurrentPages(), u = r[r.length - 1];
                "pages/my/my" == u.route && u.onShow(), u.setData({
                    verification: !1
                });
            }, function(e) {
                console.log(e);
            });
        },
        bindinputcode: function(e) {
            this.setData({
                phoneCode: e.detail.value
            });
        },
        closeyanzheng: function() {
            var e = getCurrentPages();
            e[e.length - 1].setData({
                verification: !1,
                register: !1
            });
        },
        closethis1: function() {
            var e = getCurrentPages();
            e[e.length - 1];
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});