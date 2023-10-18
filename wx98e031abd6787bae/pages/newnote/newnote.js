getApp();

var t = require("../../api/api").Api;

Page({
    data: {
        flage: !1,
        textarea: "",
        id: "",
        images: [],
        images2: [],
        bjid: "",
        domain: t.domain
    },
    onLoad: function(t) {
        t.bjid && (this.setData({
            bjid: t.bjid
        }), this.init()), this.setData({
            id: t.id
        });
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
                        key: wx.$cache.get("key"),
                        file_type: 3
                    },
                    success: function(e) {
                        wx.hideLoading(), console.log(e);
                        var a = JSON.parse(e.data);
                        console.log(a), t.setData({
                            images: t.data.images.concat(a.datas.url),
                            images2: t.data.images2.concat(a.datas.file_url)
                        });
                    }
                });
            }
        });
    },
    init: function() {
        var t = this, e = {
            note_id: this.data.bjid,
            member_id: wx.$cache.get("member_id")
        };
        wx.$http.get(wx.$get.note_info, e).then(function(e) {
            console.log(e, "笔记详情"), t.setData({
                images: e.imgs ? e.imgs : [],
                textarea: e.content
            });
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
        var t = this.data.images2.toString(), e = this.data.images.toString();
        if (this.data.bjid) {
            var a = {
                note_id: this.data.bjid,
                content: this.data.textarea,
                is_public: this.data.flage ? 2 : 1,
                imgs: e
            };
            wx.$http.get(wx.$get.note_edit, a).then(function(t) {
                console.log(t, "修改笔记");
                var e = getCurrentPages(), a = e[e.length - 2];
                "pages/myNotes/myNotes" == a.route && (a.mybi(), a.mybiid()), wx.navigateBack({
                    delta: 1
                });
            });
        } else {
            a = {
                subject_id: this.data.id,
                content: this.data.textarea,
                is_public: this.data.flage ? 2 : 1,
                imgs: t
            };
            wx.$http.get(wx.$get.note_add, a).then(function(t) {
                console.log("创建笔记", t);
                var e = getCurrentPages(), a = e[e.length - 2], i = e[e.length - 3];
                console.log("router", a.route), "pages/brushTopic/brushTopic" != a.route && "pages/brushTopic/brushTopic" != i.route || a.tidetail2(), 
                wx.navigateBack({
                    delta: 1
                });
            });
        }
    },
    closefu: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.images, i = this.data.images2;
        a.splice(e, 1), i.splice(e, 1), this.setData({
            images: a,
            images2: i
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