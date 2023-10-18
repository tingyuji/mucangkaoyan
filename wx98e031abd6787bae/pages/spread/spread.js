var t = require("../../@babel/runtime/helpers/defineProperty"), e = getApp();

Page({
    data: {
        tab: [ !0, !1, !1 ],
        member_id: "",
        con: "",
        fx: "",
        src: "",
        domian: e.globalData.domian
    },
    onLoad: function(t) {
        if (this.setData({
            fx: wx.$cache.get("fx"),
            member_id: wx.$cache.get("member_id")
        }), this.data.fx.img) {
            var e = this;
            wx.downloadFile({
                url: this.data.fx.img,
                success: function(t) {
                    200 === t.statusCode && e.setData({
                        src: t.tempFilePath
                    });
                }
            });
        }
    },
    dian: function(e) {
        console.log("1");
        var a = e.currentTarget.dataset.index;
        this.setData(t({}, "tab[".concat(a, "]"), !this.data.tab[a]));
    },
    copy: function() {
        wx.setClipboardData({
            data: "pages/index/index?pid=" + this.data.member_id,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    copy2: function() {
        if (0 != this.data.con.length) {
            var t = '&#60;a data-miniprogram-appid="wx01bb1ef166cd3f4e" data-miniprogram-path="/pages/lucky/lottery/detail?id=87n8u7fGOsf" href=""&#62;' + this.data.con + "&#60;/a&#62;";
            wx.setClipboardData({
                data: t,
                success: function(t) {
                    wx.getClipboardData({
                        success: function(t) {
                            console.log(t.data);
                        }
                    });
                }
            });
        } else wx.showToast({
            title: "请输入内容",
            icon: "none"
        });
    },
    bao: function() {
        if (this.data.src) {
            var t = this;
            wx.saveImageToPhotosAlbum({
                filePath: this.data.src,
                success: function(t) {
                    wx.showToast({
                        title: "保存成功",
                        icon: "success",
                        duration: 2e3
                    });
                },
                fail: function(e) {
                    e.errMsg && wx.showModal({
                        title: "提示",
                        content: "您好,请先授权，在保存此图片。",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.openSetting({
                                success: function(e) {
                                    console.log(e), e.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                                        filePath: t.data.src,
                                        success: function(t) {
                                            wx.showToast({
                                                title: "保存成功",
                                                icon: "success",
                                                duration: 2e3
                                            });
                                        }
                                    }) : wx.showModal({
                                        title: "温馨提示",
                                        content: "授权失败，请稍后重新获取",
                                        showCancel: !1
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else wx.showToast({
            title: "保存失败,请稍后再试",
            icon: "none"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    }
});