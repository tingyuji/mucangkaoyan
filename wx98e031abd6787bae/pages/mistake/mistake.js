var t = getApp(), e = require("../../api/api").Api;

Page({
    data: {
        flage: !1,
        textarea: "",
        id: "",
        images: [],
        title: "",
        domain: e.domain
    },
    onLoad: function(e) {
        this.setData({
            id: e.id,
            title: t.title
        }), console.log(e);
    },
    chooseimg: function() {
        var t = this;
        wx.chooseImage({
            count: 10,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                console.log(e), wx.showLoading({
                    title: "加载中"
                });
                for (var i = 0; i < a.length; i++) wx.uploadFile({
                    url: wx.$get.upload_img,
                    filePath: a[i],
                    name: "file",
                    formData: {
                        key: wx.$cache.get("key")
                    },
                    success: function(e) {
                        wx.hideLoading(), console.log(e);
                        var a = JSON.parse(e.data);
                        console.log(a), t.setData({
                            images: t.data.images.concat(a.datas.url)
                        });
                    }
                });
            }
        });
    },
    switch: function() {
        this.setData({
            flage: !this.data.flage
        });
    },
    bindinput: function(t) {
        this.setData({
            textarea: t.detail.value
        });
    },
    addNote: function() {
        var t = this.data.images.toString();
        console.log(t);
        var e = {
            subject_id: this.data.id,
            content: this.data.textarea,
            imgs: t
        };
        wx.$http.get(wx.$get.report_errors, e).then(function(t) {
            console.log(t, "报错"), wx.showToast({
                title: "提交成功",
                icon: "success",
                duration: 1500
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1500);
        });
    },
    closefu: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.images;
        a.splice(e, 1), this.setData({
            images: a
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