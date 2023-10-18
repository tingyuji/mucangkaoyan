Page({
    data: {
        domain: getApp().domain,
        content: "",
        imgs: [],
        can: "",
        register: !1,
        type: "1"
    },
    onLoad: function(t) {
        var e = this;
        console.log(t, "进来的参数2"), t.scene && this.setData({
            type: t.scene
        }), wx.$http.post(wx.$get.get_show, {}).then(function(t) {
            console.log(t, "参数"), wx.$cache.set("can", t), e.setData({
                can: t
            });
        });
    },
    btn: function() {
        if (0 != this.data.imgs.length) {
            var t = {
                adjustment_id: this.data.id,
                content: this.data.content,
                imgs: this.data.imgs.toString(),
                type: this.data.type
            };
            wx.$http.post(wx.$get.add_screenshot, t).then(function(t) {
                console.log(t), wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 1500
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }, 1500);
            });
        } else wx.showToast({
            title: "请上传图片",
            icon: "none",
            duration: 2e3
        });
    },
    bindchinge: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    chooseimg: function() {
        var t = this;
        wx.chooseImage({
            count: 10,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var n = e.tempFilePaths;
                console.log(e), wx.showLoading({
                    title: "加载中"
                });
                for (var a = 0; a < n.length; a++) wx.uploadFile({
                    url: wx.$get.upload_img,
                    filePath: n[a],
                    name: "file",
                    formData: {
                        key: wx.$cache.get("key"),
                        file_type: 3
                    },
                    success: function(e) {
                        wx.hideLoading();
                        var n = JSON.parse(e.data);
                        console.log(n);
                        var a;
                        a = t.data.imgs.concat(n.datas.url), t.setData({
                            imgs: a
                        });
                    }
                });
            }
        });
    },
    close: function(t) {
        var e = t.currentTarget.dataset.index, n = this.data.imgs;
        n.splice(e, 1), this.setData({
            imgs: n
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.$cache.get("key") ? this.setData({
            register: !1
        }) : this.setData({
            register: !0
        });
    },
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