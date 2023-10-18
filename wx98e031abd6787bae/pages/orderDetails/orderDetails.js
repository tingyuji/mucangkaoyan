getApp();

Page({
    data: {
        show: !1,
        id: ""
    },
    onLoad: function(o) {
        this.setData({
            id: o.id
        }), this.init();
    },
    init: function() {
        var o = this, t = {
            goods_order_id: this.data.id
        };
        wx.$http.get(wx.$get.info_goods_order, t).then(function(t) {
            console.log("订单详情", t), o.setData({
                items: t
            });
        });
    },
    copy: function() {
        wx.setClipboardData({
            data: this.data.items.id.toString(),
            success: function(o) {
                wx.showToast({
                    title: "客服微信已复制",
                    icon: "success",
                    duration: 2e3
                }), wx.getClipboardData({
                    success: function(o) {
                        console.log(o.data);
                    }
                });
            }
        });
    },
    godetail: function() {
        wx.navigateTo({
            url: "/pages/commodityDetails/commodityDetails?id=".concat(this.data.items.goods_id)
        });
    },
    downxia: function() {
        wx.showLoading({
            title: "下载中"
        });
        this.data.items.file_url.substring(this.data.items.file_url.lastIndexOf(".") + 1);
        var o = this.data.items.goods_name, t = this.data.items.file_url;
        this.downxia2(t, o);
    },
    downxia2: function(o, t) {
        console.log(o, t);
        wx.showLoading({
            title: "下载中"
        });
        var n = o.substring(o.lastIndexOf(".") + 1);
        console.log(n, "dmdm"), wx.downloadFile({
            url: o,
            filePath: wx.env.USER_DATA_PATH + "/" + t + "." + n,
            success: function(t) {
                console.log(t), wx.hideLoading(), console.log(n, o, "ddddddd"), 200 === t.statusCode && (console.log(n), 
                "png" == n || "jpg" == n || "jpeg" == n ? wx.previewImage({
                    current: o,
                    urls: [ o ]
                }) : (console.log(t.filePath), wx.openDocument({
                    filePath: t.filePath,
                    fileType: n,
                    showMenu: !0,
                    success: function(o) {
                        console.log("打开文档成功", o);
                    },
                    fail: function(o) {
                        console.log(o, "失败"), wx.showToast({
                            title: "打开失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                })));
            },
            fail: function(o) {
                console.log(o);
            }
        });
    },
    bao: function(o) {
        wx.saveImageToPhotosAlbum({
            filePath: o,
            success: function(o) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                t.errMsg && wx.showModal({
                    title: "提示",
                    content: "您好,请先授权，在保存此图片。",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                console.log(t), t.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                                    filePath: o,
                                    success: function(o) {
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
    },
    shouhuo: function() {
        var o = this, t = {
            goods_order_id: this.data.id
        };
        wx.$http.get(wx.$get.confirm_goods_order, t).then(function(t) {
            console.log("确认收货", t), o.init();
        });
    },
    jilu: function() {
        var o = this, t = {
            goods_order_id: this.data.id
        };
        wx.$http.get(wx.$get.download_goods_order, t).then(function(t) {
            console.log("记录下载", t), o.init();
        });
    },
    lian: function() {
        this.setData({
            show: !0
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