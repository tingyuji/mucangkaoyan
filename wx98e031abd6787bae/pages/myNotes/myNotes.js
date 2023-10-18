var t = require("../../@babel/runtime/helpers/toConsumableArray"), e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), a = require("../../@babel/runtime/helpers/defineProperty"), i = getApp(), s = require("../../api/api").Api;

Page({
    data: {
        selectd: !1,
        maskorder: !1,
        shulists: [ {
            id: 1,
            library_name: "时间",
            flage: !1
        }, {
            id: 2,
            library_name: "书籍->章节",
            flage: !0
        } ],
        shuidsindex: 0,
        mask: !1,
        array: [ "全部笔记", "什么笔记", "毛特笔记" ],
        rangindex: 0,
        wordStr: "",
        page: 1,
        page_size: 20,
        items: [],
        register: !1,
        member_id: null,
        shulist: [],
        shuid: [],
        kong: !1,
        domain: s.domain,
        typenote: 1,
        subject_id: 0
    },
    onLoad: function(t) {
        console.log(t), t.id ? this.setData({
            subject_id: t.id
        }) : this.setData({
            typenote: 2
        }), this.tilist(), this.setData({
            member_id: wx.$cache.get("member_id")
        }), console.log(this.data.subject_id);
    },
    tapChangpen: function(t) {
        this.setData({
            typenote: t.currentTarget.dataset.type
        }), this.tilist();
    },
    sed_kuang: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData(a({}, "items[".concat(e, "].flage"), !this.data.items[e].flage));
        var i = 0;
        this.data.items.forEach(function(t) {
            t.flage && i++;
        }), i > 0 ? this.setData({
            selectd: !0
        }) : this.setData({
            selectd: !1
        });
    },
    print_pdf: function() {
        var t, a = [], i = e(this.data.items);
        try {
            for (i.s(); !(t = i.n()).done; ) {
                var s = t.value;
                1 == s.flage && a.push(s.id);
            }
        } catch (t) {
            i.e(t);
        } finally {
            i.f();
        }
        console.log(a);
        var n = {
            id: a + ""
        };
        wx.showLoading({
            title: "下载中"
        });
        var o = new Date().getTime() + ".pdf", d = "".concat(wx.env.USER_DATA_PATH, "/").concat(o);
        wx.$http.get(wx.$get.note_my_list_down, n).then(function(t) {
            console.log(t), wx.downloadFile({
                url: t,
                filePath: d,
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
    tilist: function() {
        var t = this, e = {
            typenote: this.data.typenote,
            subject_id: this.data.subject_id,
            page: 1,
            page_size: 100,
            member_id: wx.$cache.get("member_id")
        };
        wx.$http.get(wx.$get.library_all_list, e).then(function(e) {
            console.log(e, "全部题库");
            for (var a = [], i = 0; i < e.length; i++) a = a.concat(e[i].id);
            t.setData({
                shulist: e,
                shuid: a
            }), console.log(t.data.shuid, "获取输入的id"), t.mybi(), t.mybiid();
        });
    },
    mybi: function() {
        var t = this;
        this.setData({
            page: 1
        });
        var e = {
            typenote: this.data.typenote,
            subject_id: this.data.subject_id,
            page: this.data.page,
            page_size: this.data.page_size,
            content: this.data.wordStr,
            library_ids: this.data.shuid.toString(),
            ordertype: this.data.shulists[this.data.shuidsindex].id
        };
        wx.$http.get(wx.$get.note_my_list, e).then(function(e) {
            console.log(e, "我的笔记");
            i.ids = [], e.forEach(function(t) {
                i.ids = i.ids.concat(t.id);
            }), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), t.setData({
                items: e
            });
        });
    },
    mybiid: function() {
        var t = {
            typenote: this.data.typenote,
            subject_id: this.data.subject_id,
            page: this.data.page,
            page_size: 200,
            content: this.data.wordStr,
            library_ids: this.data.shuid.toString(),
            ordertype: this.data.shulists[this.data.shuidsindex].id
        };
        wx.$http.get(wx.$get.note_my_id, t).then(function(t) {
            console.log(t, "我的笔记id");
        });
    },
    mask: function() {
        this.setData({
            mask: !0
        });
    },
    noMask: function() {
        this.setData({
            mask: !1
        });
    },
    maskorder: function() {
        this.setData({
            maskorder: !0
        });
    },
    noMaskorder: function() {
        this.setData({
            maskorder: !1
        });
    },
    godetail: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "/pages/noteDetails/noteDetails?id=" + e
        });
    },
    wordStr: function(t) {
        this.setData({
            wordStr: t.detail.value
        });
    },
    serch: function() {
        this.mybi(), this.mybiid();
    },
    check: function(t) {
        var e = t.currentTarget.dataset.index, i = t.currentTarget.dataset.flage, s = t.currentTarget.dataset.id, n = this.data.shuid;
        if (this.setData(a({}, "shulist[".concat(e, "].flage"), !this.data.shulist[e].flage)), 
        i) n = n.concat(s), this.setData({
            shuid: n
        }), console.log(this.data.shuid, "11111111111111111111"); else {
            var o = n.filter(function(t) {
                return t !== s;
            });
            this.setData({
                shuid: o
            }), console.log(this.data.shuid, "222222222222222222222222222");
        }
    },
    checkorder: function(t) {
        var e = t.currentTarget.dataset.index;
        if (this.setData({
            shuidsindex: e
        }), this.data.shulists[e].flage) {
            this.setData(a({}, "shulists[".concat(e, "].flage"), !1));
            for (var i = 0; i < this.data.shulists.length; i++) e != i && this.setData(a({}, "shulists[".concat(i, "].flage"), !0));
        }
    },
    sure: function() {
        this.noMask(), this.mybi(), this.mybiid();
    },
    sureorder: function() {
        this.noMaskorder(), this.mybi(), this.mybiid();
    },
    del: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "你确定要删除吗",
            success: function(t) {
                if (t.confirm) {
                    var i = {
                        note_id: a
                    };
                    wx.$http.get(wx.$get.note_del, i).then(function(t) {
                        console.log(t, "删除笔记"), e.mybi(), e.mybiid();
                    });
                } else t.cancel && console.log("用户点击取消");
            }
        });
    },
    goedit: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/newnote/newnote?bjid=" + e + "&type=" + a
        });
    },
    downpull: function() {
        var e = this;
        console.log("3434erer34er3434er34er3434"), this.setData({
            page: this.data.page += 1
        });
        var a = {
            typenote: this.data.typenote,
            subject_id: this.data.subject_id,
            page: this.data.page,
            page_size: this.data.page_size,
            content: this.data.wordStr,
            library_ids: this.data.shuid.toString()
        };
        wx.$http.get(wx.$get.note_my_list, a).then(function(a) {
            a.forEach(function(t) {
                i.ids = i.ids.concat(t.id);
            }), 0 != a.length && e.setData({
                items: [].concat(t(e.data.items), t(a))
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.downpull();
    },
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    }
});