var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), i = (getApp(), 
require("../../api/api").Api);

Page({
    data: {
        mask: !1,
        flage: !1,
        items: [],
        id: "",
        page: 1,
        page_size: 20,
        shuid: [],
        shulist: [],
        kong: !1,
        selectd: !1,
        domain: i.domain
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), wx.setNavigationBarTitle({
            title: t.name + "错题"
        }), this.init2();
    },
    maskkss: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "您确定清除该错题库么？",
            success: function(e) {
                if (e.confirm) {
                    var i = {
                        course_ids: t.data.id
                    };
                    console.log(i), console.log(wx.$get.wrong_log_del_1), wx.$http.post(wx.$get.wrong_log_del_1, i).then(function(t) {
                        wx.showToast({
                            title: "成功",
                            icon: "success",
                            duration: 2e3
                        }), wx.navigateTo({
                            url: "/pages/myMistake/myMistake"
                        });
                    }), console.log("用户点击确定");
                } else e.cancel && console.log("用户点击取消");
            }
        });
    },
    mask: function() {
        this.setData({
            mask: !0
        });
    },
    print_pdf: function() {
        var t, i = [], a = [], n = [], o = e(this.data.items);
        try {
            for (o.s(); !(t = o.n()).done; ) {
                var s = t.value;
                1 == s.flage && (a.push(s.id), i.push(s.course_id), n.push(s.library_id));
            }
        } catch (t) {
            o.e(t);
        } finally {
            o.f();
        }
        console.log(i, a, n);
        var c = new Date().getTime() + ".pdf", r = "".concat(wx.env.USER_DATA_PATH, "/").concat(c);
        wx.downloadFile({
            url: wx.$get.print_wrong + "?member_id=" + wx.$cache.get("member_id") + "&library_id=" + n + "&chapter_id=" + a + "&course_id=" + i + "&disid=" + wx.getStorageSync("disidkey"),
            filePath: r,
            success: function(t) {
                t.tempFilePath;
                wx.openDocument({
                    filePath: r,
                    showMenu: !0,
                    fileType: "pdf",
                    success: function(t) {}
                });
            },
            fail: function(t) {
                wx.hideLoading();
            }
        });
    },
    sed_kuang: function(e) {
        var i = e.currentTarget.dataset.index;
        this.setData(t({}, "items[".concat(i, "].flage"), !this.data.items[i].flage));
        var a = 0;
        this.data.items.forEach(function(t) {
            t.flage && a++;
        }), a > 0 ? this.setData({
            selectd: !0
        }) : this.setData({
            selectd: !1
        });
    },
    gotopicAnalysis: function() {
        var t = this.data.shuid.toString(), e = this.data.id;
        wx.navigateTo({
            url: "/pages/topicAnalysis/topicAnalysis?cuo=true&book_id=" + t + "&course_id=" + e
        });
    },
    init: function() {
        var t = this, e = this.data.shuid.toString(), i = {
            course_ids: this.data.id,
            library_ids: e,
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.post(wx.$get.wrong_log_chapter, i).then(function(e) {
            console.log("错题章节", e), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), t.setData({
                items: e
            });
        });
    },
    init2: function() {
        var t = this, e = {
            course_ids: this.data.id
        };
        wx.$http.post(wx.$get.wrong_log_library_1, e).then(function(e) {
            console.log(e, "题库列表");
            var i = [];
            e.forEach(function(t) {
                t.flage = !1;
            });
            for (var a = 0; a < e.length; a++) i = i.concat(e[a].id);
            console.log(i), t.setData({
                shulist: e,
                shuid: i
            }), t.init();
        });
    },
    pulldown: function() {
        var t = this;
        this.setData({
            page: this.data.page += 1
        });
        var e = {
            course_id: this.data.id,
            page: this.data.page,
            page_size: this.data.page_size
        };
        network.requestLoading(i.GET.question_chapter, e, 1, "", "GET", "", function(e) {
            console.log("错题章节", e.list);
            var i = t.data.items.concat(e.list);
            0 != e.list.length && t.setData({
                items: i
            });
        }, function() {});
    },
    golistde: function(t) {
        var e = t.currentTarget.dataset, i = e.tid, a = e.kid, n = e.zid, o = t.currentTarget.dataset.num;
        wx.navigateTo({
            url: "/pages/brushTopic/brushTopic?tid=".concat(i, "&kid=").concat(a, "&zid=").concat(n, "&num=").concat(o, "&type=3")
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.pulldown();
    },
    onShareAppMessage: function() {
        return {
            title: network.get("fx").title,
            imageUrl: network.get("fx").img,
            path: "/pages/index/index?pid=".concat(network.get("member_id"))
        };
    }
});