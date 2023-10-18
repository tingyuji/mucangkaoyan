var t = require("../../@babel/runtime/helpers/toConsumableArray"), i = getApp(), e = require("../../api/api").Api, a = require("../../api/network.js");

Page({
    data: {
        domain: e.domain,
        show: !1,
        page: 1,
        page_size: 20,
        isBig: 2,
        items: "",
        ios: i.globalData.ios,
        show3: !1,
        show666: !1,
        jinqun: "",
        register: !1,
        phone: !1,
        clicidata666: {}
    },
    onLoad: function(t) {
        this.init(), this.jinqun(), this.init2(), this.setData({
            isBig: wx.$cache.get("userinfo").is_big_subject
        });
    },
    xia666: function(t) {
        t.currentTarget.dataset.id;
        1 == a.get("can").is_examine && i.globalData.ios && wx.showToast({
            title: "请用安卓手机，苹果手机不支持",
            icon: "none"
        });
        t.currentTarget.dataset.url, t.currentTarget.dataset.name;
        1 == this.data.isBig ? this.setData({
            clicidata666: t,
            show666: !0
        }) : this.setData({
            show: !0
        });
    },
    clog: function(t) {
        var i = t.detail;
        this.xia(i);
    },
    xia: function(t) {
        var e = t.currentTarget.dataset.id;
        1 == a.get("can").is_examine && i.globalData.ios && wx.showToast({
            title: "请用安卓手机，苹果手机不支持",
            icon: "none"
        });
        var n = t.currentTarget.dataset.url, o = t.currentTarget.dataset.name;
        1 == this.data.isBig ? (this.downxia(n, o), wx.$http.get(wx.$get.big_chapter, {
            book_id: e
        }).then(function(t) {
            console.log("big_chapter", t);
        })) : this.setData({
            show: !0
        });
    },
    downxia: function(t, i) {
        wx.showLoading({
            title: "下载中"
        });
        var e = t.substring(t.lastIndexOf(".") + 1);
        console.log(e, "dmdm"), wx.downloadFile({
            url: t,
            filePath: wx.env.USER_DATA_PATH + "/" + i + "." + e,
            success: function(i) {
                console.log(i), wx.hideLoading(), console.log(e, t, "ddddddd"), 200 === i.statusCode && (console.log(e), 
                "png" == e || "jpg" == e || "jpeg" == e ? wx.previewImage({
                    current: t,
                    urls: [ t ]
                }) : (console.log(i.filePath), wx.openDocument({
                    filePath: i.filePath,
                    fileType: e,
                    showMenu: !0,
                    success: function(t) {
                        console.log("打开文档成功", t);
                    },
                    fail: function(t) {
                        console.log(t, "失败"), wx.showToast({
                            title: "打开失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                })));
            }
        });
    },
    init: function() {
        var t = this, i = {
            page: 1,
            page_size: this.data.page_size
        };
        a.requestLoading(e.GET.big_book, i, 3, "", "GET", "", function(i) {
            console.log("书籍列表", i), t.setData({
                items: i
            });
        }, function() {});
    },
    godetail: function(t) {
        if (1 == a.get("can").is_examine && i.globalData.ios) wx.showToast({
            title: "请用安卓手机，苹果手机不支持",
            icon: "none"
        }); else {
            var e = t.currentTarget.dataset.id;
            1 == this.data.isBig ? wx.navigateTo({
                url: "/pages/chapterList/chapterList?id=".concat(e)
            }) : this.setData({
                show: !0
            });
        }
    },
    jinqun: function() {
        var t = this;
        a.requestLoading(e.GET.big_setting, {}, 3, "", "GET", "", function(i) {
            console.log("大群进群参数", i), t.setData({
                jinqun: i
            });
        }, function() {});
    },
    pulldown: function() {
        this.setData({
            page: this.data.page += 1
        });
        var i = this, n = {
            page: this.data.page,
            page_size: this.data.page_size
        };
        a.requestLoading(e.GET.big_book, n, 3, "", "GET", "", function(e) {
            console.log("书籍列表", e), 0 != e.list.length && i.setData({
                items: [].concat(t(i.data.items), t(e.list))
            });
        }, function() {});
    },
    init2: function() {
        var t = this;
        wx.$http.get(wx.$get.member_info, {}).then(function(i) {
            console.log("我的", i), t.setData({
                isBig: i.is_big_subject
            }), a.put("userinfo", i);
        });
    },
    bay: function() {
        var t = this;
        console.log(i.globalData.ios, 0x27797f6876867c), 1 == a.get("can").is_examine && i.globalData.ios ? wx.showToast({
            title: "请用安卓手机，苹果手机不支持",
            icon: "none"
        }) : a.requestLoading(e.GET.big_qualifications, {
            type: 1
        }, 1, "", "GET", "", function(i) {
            console.log("购买大题", i), wx.requestPayment({
                timeStamp: i.timeStamp,
                nonceStr: i.nonceStr,
                package: i.package,
                signType: "MD5",
                paySign: i.paySign,
                success: function(i) {
                    wx.showToast({
                        title: "购买成功",
                        icon: "success",
                        duration: 2e3
                    }), t.init2(), t.setData({
                        show: !1,
                        show3: !0
                    });
                },
                fail: function(t) {}
            });
        }, function() {});
    },
    onReady: function() {},
    onShow: function() {
        a.get("key") && (this.setData({
            register: !1
        }), a.get("phone") ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.pulldown();
    },
    onShareAppMessage: function() {}
});