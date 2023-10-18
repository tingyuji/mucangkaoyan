var t = getApp(), e = require("../../api/api").Api;

Page({
    data: {
        id: "",
        items: "",
        num: "",
        ids: "",
        index: 0,
        member_id: null,
        domain: e.domain
    },
    onLoad: function(e) {
        this.setData({
            id: e.id,
            member_id: wx.$cache.get("member_id"),
            num: wx.$cache.get("userinfo").give_num,
            ids: t.ids
        }), console.log(t, "App参数");
        var i = this.data.ids.indexOf(Number(e.id));
        console.log(this.data.ids, e.id, i), this.setData({
            index: i
        }), this.init();
    },
    init: function() {
        var t = this, e = {
            note_id: this.data.ids[this.data.index],
            member_id: wx.$cache.get("member_id")
        };
        wx.$http.get(wx.$get.note_info, e).then(function(e) {
            console.log(e, "笔记详情", t.data.id), t.setData({
                items: e
            });
        });
    },
    downloadNote: function(t) {
        console.log(t.currentTarget.dataset.id);
        t.currentTarget.dataset.id;
        var e = {
            id: t.currentTarget.dataset.id
        };
        wx.showLoading({
            title: "下载中"
        });
        var i = new Date().getTime() + ".pdf", n = "".concat(wx.env.USER_DATA_PATH, "/").concat(i);
        wx.$http.get(wx.$get.note_my_list_down, e).then(function(t) {
            console.log(t), wx.downloadFile({
                url: t,
                filePath: n,
                success: function(t) {
                    if (200 === t.statusCode) {
                        wx.hideLoading(), wx.showToast({
                            title: "下载成功",
                            icon: "success",
                            duration: 2e3
                        });
                        var e = t.filePath;
                        wx.openDocument({
                            filePath: e,
                            showMenu: !0,
                            fileType: "pdf",
                            success: function(t) {
                                console.log("打开文档成功", t);
                            }
                        });
                    }
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        });
    },
    del: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "你确定要删除吗",
            success: function(t) {
                if (t.confirm) {
                    var i = {
                        note_id: e
                    };
                    wx.$http.get(wx.$get.note_del, i).then(function(t) {
                        console.log(t, "删除笔记");
                        var e = getCurrentPages(), i = e[e.length - 2];
                        "pages/myNotes/myNotes" == i.route && (i.mybi(), i.mybiid()), wx.navigateBack({
                            delta: 1
                        });
                    });
                } else t.cancel && console.log("用户点击取消");
            }
        });
    },
    goedit: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/newnote/newnote?bjid=" + e + "&type=" + i
        });
    },
    goxiang: function() {
        wx.navigateTo({
            url: "/pages/brushTopic/brushTopic?type=4&id=".concat(this.data.items.subject_id)
        });
    },
    kanimg: function(t) {
        var e = t.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.items.imgs[e],
            urls: this.data.items.imgs
        });
    },
    shang: function() {
        console.log(this.data.index, this.data.ids.length), this.data.index <= 0 ? wx.showToast({
            title: "没有上一个",
            icon: "none",
            duration: 2e3
        }) : (this.setData({
            index: this.data.index -= 1
        }), this.init());
    },
    next: function() {
        console.log(this.data.index, this.data.ids.length), this.data.index >= this.data.ids.length - 1 ? wx.showToast({
            title: "没有下一个",
            icon: "none",
            duration: 2e3
        }) : (this.setData({
            index: this.data.index += 1
        }), this.init());
    },
    onReady: function() {},
    onShow: function() {
        this.init();
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