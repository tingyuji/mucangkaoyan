var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../api/api").Api;

Page({
    data: {
        itemsindex: -1,
        ti: [ [ "0", 20, 30, 40, 50, 60, 70, 80 ], [ "题" ] ],
        tiindex: [ 0, 0 ],
        items: [],
        current: 0,
        page: 1,
        page_size: 200,
        list: [],
        kong: !1,
        blackid: 0,
        tian: "",
        viptrue: !1,
        domain: e.domain,
        register: !1
    },
    onLoad: function(t) {
        this.setData({
            register: Boolean(!wx.$cache.get("key"))
        }), wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    bindchinge: function(t) {
        console.log(t), this.setData({
            current: t.detail.current,
            tian: ""
        }), this.mykelist(), this.titong();
    },
    bindPickerChange: function(t) {
        this.setData({
            tiindex: t.detail.value
        }), this.setting();
    },
    shoushi: function() {
        this.setData({
            shoushishow: !1
        }), wx.$cache.set("shoushishow", !0, 185e4);
    },
    goDa: function() {
        var t = 1;
        0 != this.data.items.length && (t = 0), wx.navigateTo({
            url: "/pages/homehall/homehall?index=".concat(t)
        });
    },
    myti: function() {
        var t = this;
        wx.$http.get(wx.$get.my_library, {
            page: 1,
            page_size: 100
        }).then(function(e) {
            if (console.log(e, "我的题库"), !wx.$cache.get("shoushishow") && e.length > 1 && t.setData({
                shoushishow: !0
            }), t.setData({
                items: e
            }), console.log("8888888888877777777777733333", t.data.items), 0 == e.length) t.setData({
                kong: !0
            }); else {
                if (t.setData({
                    kong: !1
                }), t.data.blackid) {
                    for (var i = [], a = 0; a < e.length; a++) i = i.concat(e[a].id);
                    var n = i.indexOf(t.data.blackid);
                    t.setData({
                        current: n
                    }), t.setData({
                        blackid: !1
                    });
                }
                t.mykelist(), t.titong();
            }
        });
    },
    mykelist: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            library_id: this.data.items[this.data.current].id,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.library_index_list, e).then(function(e) {
            console.log(e, "课程列表"), t.setData({
                list: e
            });
        });
    },
    bindflage: function(e) {
        var i = e.currentTarget.dataset.index;
        this.setData(t({}, "list[".concat(i, "].flage"), !this.data.list[i].flage));
    },
    bindcong: function() {
        var t = this;
        1 != this.data.items[this.data.current].is_vip || this.data.viptrue ? wx.showModal({
            title: "提示",
            content: "你确定要重新刷题吗？",
            success: function(e) {
                if (e.confirm) {
                    var i = {
                        library_id: t.data.items[t.data.current].id
                    };
                    wx.$http.get(wx.$get.again_subject, i).then(function(e) {
                        console.log(e, "重新刷题"), t.myti();
                    });
                } else e.cancel && console.log("用户点击取消");
            }
        }) : wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        });
    },
    goti: function(t) {
        var e = t.currentTarget.dataset, i = e.zid, a = e.kid, n = e.tid, s = e.num, r = (e.nzid, 
        e.nkid, e.ntid, e.nzids);
        if (0 != s && (s = Number(s) - 1), 1 != this.data.items[this.data.current].is_vip || this.data.viptrue) {
            void 0 === r && (r = {});
            var o = JSON.stringify(r);
            wx.navigateTo({
                url: "/pages/brushTopic/brushTopic?zid=".concat(i, "&kid=").concat(a, "&tid=").concat(n, "&type=1&num=").concat(s, "&nzids=").concat(o)
            });
        } else wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        });
    },
    bindshui: function() {
        1 != this.data.items[this.data.current].is_vip || this.data.viptrue ? wx.navigateTo({
            url: "/pages/brushTopic/brushTopic?tid=".concat(this.data.items[this.data.current].id, "&type=2")
        }) : wx.navigateTo({
            url: "/pages/memberCenter/memberCenter"
        });
    },
    go: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: e
        });
    },
    titong: function() {
        var e = this, i = {
            member_id: wx.$cache.get("member_id"),
            library_id: this.data.items[this.data.current].id
        };
        wx.$http.get(wx.$get.library_index, i).then(function(i) {
            console.log(i, "题库主页统计");
            for (var a = i.library_list.subject_num, n = [], s = 1; s < a; s++) s != a && s % 10 == 0 && (n = n.concat(s));
            if (n = n.concat(a), e.setData(t({}, "ti[0]", n)), i.library_target) {
                var r = n.indexOf(i.library_target.target_num);
                e.setData({
                    "tiindex[0]": r
                }), i.speed_log.total_num >= i.library_list.subject_num ? e.setData({
                    tian: -1
                }) : e.setData({
                    tian: Math.ceil((i.library_list.subject_num - i.speed_log.total_num) / i.library_target.target_num)
                });
            }
        });
    },
    setting: function() {
        var t = this, e = {
            target_num: this.data.ti[0][this.data.tiindex[0]],
            library_id: this.data.items[this.data.current].id
        };
        wx.$http.get(wx.$get.library_target, e).then(function(e) {
            console.log(e, "每日刷体谅"), t.titong();
        });
    },
    onReady: function() {},
    onShow: function() {
        if (console.log(Boolean(!wx.$cache.get("key"))), wx.$cache.get("userinfo")) {
            var t = new Date(wx.$cache.get("userinfo").vip_time.replace(/\-/g, "/")).getTime(), e = new Date().getTime();
            console.log(e);
            var i = !1;
            t > e && (i = !0, this.setData({
                viptrue: i
            })), this.myti();
        }
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
    },
    onShareTimeline: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            query: "a=".concat(wx.$cache.get("member_id"))
        };
    }
});