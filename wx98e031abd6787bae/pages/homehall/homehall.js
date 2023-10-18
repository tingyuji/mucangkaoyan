var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../@babel/runtime/helpers/toConsumableArray"), a = require("../../api/api").Api;

Page({
    data: {
        flage: !0,
        list: "",
        listindex: 1,
        page: 1,
        page_size: 100,
        items: "",
        type: 1,
        xuannum: [],
        check: !1,
        kong: !1,
        vip: !1,
        domain: a.domain
    },
    onLoad: function(t) {
        this.setData({
            listindex: t.index
        }), this.tilist();
    },
    binddian: function() {
        this.data.kong ? wx.showToast({
            title: "暂无题库可操作",
            icon: "none"
        }) : this.setData({
            flage: !this.data.flage
        });
    },
    tilist: function() {
        var t = this;
        wx.$http.get(wx.$get.library_class, {}).then(function(a) {
            t.setData({
                list: [].concat([ {
                    id: "",
                    library_class_name: "我的题库"
                } ], e(a))
            }), console.log(t.data.list, "题库分类"), 0 == t.data.listindex ? t.myti() : t.tidetail();
        });
    },
    tidetail: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            class_id: this.data.list[this.data.listindex].id,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.library_list, e).then(function(e) {
            console.log(e, "题库列表"), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), t.setData({
                items: e
            });
        });
    },
    qie: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            listindex: e,
            flage: !0,
            items: [],
            xuannum: []
        }), 0 == this.data.listindex ? (this.setData({
            type: 1
        }), this.myti()) : (this.setData({
            type: 2
        }), this.tidetail());
    },
    myti: function() {
        var t = this, e = {
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.my_library, e).then(function(e) {
            console.log(e, "我的题库"), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), t.setData({
                items: e
            });
        });
    },
    bindxuan: function(e) {
        var a = e.currentTarget.dataset.index;
        this.setData(t({}, "items[".concat(a, "].flage"), !this.data.items[a].flage));
        var i = this.data.items.every(function(t) {
            return 1 == t.flage;
        });
        this.setData({
            check: i
        });
        for (var n = [], s = 0; s < this.data.items.length; s++) this.data.items[s].flage && (n = n.concat(this.data.items[s].id));
        this.setData({
            xuannum: n
        });
    },
    bindquan: function() {
        var t = this.data.items;
        if (this.data.check) for (var e = 0; e < t.length; e++) t[e].flage = !1; else for (var a = 0; a < t.length; a++) t[a].flage = !0;
        for (var i = [], n = 0; n < t.length; n++) t[n].flage && (i = i.concat(t[n].id));
        this.setData({
            check: !this.data.check,
            items: t,
            xuannum: i
        });
    },
    addti: function() {
        var t = this;
        if (0 != this.data.xuannum.length) {
            new Date(wx.$cache.get("userinfo").vip_time.replace(/\-/g, "/")).getTime() > new Date().getTime() && !0, 
            wx.showModal({
                title: "提示",
                content: "你确定要添加吗？",
                success: function(e) {
                    if (e.confirm) {
                        var a = {
                            library_ids: t.data.xuannum.toString()
                        };
                        wx.$http.get(wx.$get.add_all_library, a).then(function(e) {
                            wx.showToast({
                                title: "添加成功"
                            }), t.itemsqing();
                        });
                    } else e.cancel && console.log("用户点击取消");
                }
            });
        } else wx.showToast({
            title: "请先勾选题库！",
            icon: "none"
        });
    },
    itemsqing: function() {
        for (var t = this.data.items, e = 0; e < t.length; e++) t[e].flage = !1;
        this.setData({
            items: t,
            check: !1,
            xuannum: [],
            flage: !0
        });
    },
    delti: function() {
        var t = this;
        0 != this.data.xuannum.length ? wx.showModal({
            title: "提示",
            content: "你确定要移除吗？",
            success: function(e) {
                if (e.confirm) {
                    var a = {
                        library_ids: t.data.xuannum.toString()
                    };
                    wx.$http.get(wx.$get.del_all_library, a).then(function(e) {
                        wx.showToast({
                            title: "移除成功"
                        }), t.setData({
                            check: !1,
                            xuannum: [],
                            flage: !0
                        }), t.myti();
                    });
                } else e.cancel && console.log("用户点击取消");
            }
        }) : wx.showToast({
            title: "请先勾选题库！",
            icon: "none"
        });
    },
    godetail: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.vip ? this.addoneti(e) : 1 == this.data.items[e].is_vip ? wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        }) : this.addoneti(e);
    },
    addoneti: function(t) {
        var e = this, a = t, i = {
            library_id: this.data.items[a].id
        };
        wx.$http.get(wx.$get.add_my_library, i).then(function(t) {
            console.log(t, "添加一个题库");
            var i = getCurrentPages();
            i[i.length - 2].setData({
                blackid: e.data.items[a].id
            }), wx.navigateBack({
                delta: 1
            });
        }).catch(function(t) {
            var i = getCurrentPages();
            i[i.length - 2].setData({
                blackid: e.data.items[a].id
            }), wx.navigateBack({
                delta: 1
            });
        });
    },
    judgeTime: function(t) {
        if (!t) return !1;
        var e = t.replace(/-/g, "/");
        return !(Date.parse(new Date(e)) < Date.parse(new Date()));
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            vip: this.judgeTime(wx.$cache.get("userinfo").vip_time)
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