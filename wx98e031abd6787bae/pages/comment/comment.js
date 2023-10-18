var t = require("../../@babel/runtime/helpers/toConsumableArray"), e = require("../../@babel/runtime/helpers/defineProperty"), i = (getApp(), 
require("../../api/api").Api), a = require("../../api/network.js");

Page({
    data: {
        mask: !1,
        id: "",
        page: 1,
        page_size: 20,
        items: [],
        content: "",
        length: 0,
        p_id: "",
        kong: !1,
        domain: i.domain
    },
    onLoad: function(t) {
        console.log("xxxxx", "xxx"), this.setData({
            id: t.id
        }), this.init();
    },
    mask: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            mask: !0,
            p_id: e
        });
    },
    noMask: function() {
        this.setData({
            mask: !1
        });
    },
    init: function() {
        var t = this, e = {
            subject_id: this.data.id,
            member_id: wx.$cache.get("member_id"),
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.comment_list, e).then(function(e) {
            console.log(e, "评论列表"), 0 == e.length ? t.setData({
                kong: !0
            }) : t.setData({
                kong: !1
            }), t.setData({
                items: e
            });
        });
    },
    bindcontent: function(t) {
        this.setData({
            content: t.detail.value
        }), this.setData({
            length: this.data.content.length
        });
    },
    btn: function() {
        var t = this, e = {
            subject_id: this.data.id,
            p_id: this.data.p_id ? this.data.p_id : "0",
            content: this.data.content,
            one_id: this.data.p_id ? this.data.p_id : "0"
        };
        wx.$http.get(wx.$get.comment_add, e).then(function(e) {
            console.log(e, "提交评论"), t.init(), t.noMask(), t.setData({
                content: ""
            });
            var i = getCurrentPages(), a = i[i.length - 2];
            "pages/brushTopic/brushTopic" == a.route && a.tidetail2();
        });
    },
    zhan: function(t) {
        var i = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index, n = t.currentTarget.dataset.give, s = this, o = {
            log_id: i,
            type: 2
        };
        wx.$http.get(wx.$get.give_log, o).then(function(t) {
            var i, o;
            (console.log(t, "点赞"), 1 == n) ? s.setData((e(i = {}, "items[".concat(a, "].give_num"), s.data.items[a].give_num -= 1), 
            e(i, "items[".concat(a, "].is_give"), 2), i)) : s.setData((e(o = {}, "items[".concat(a, "].give_num"), s.data.items[a].give_num += 1), 
            e(o, "items[".concat(a, "].is_give"), 1), o));
            var d = getCurrentPages(), g = d[d.length - 2];
            "pages/brushTopic/brushTopic" == g.route && g.tidetail2();
        });
    },
    pulldown: function() {
        var e = this, i = this;
        this.setData({
            page: this.data.page += 1
        });
        var n = {
            subject_id: this.data.id,
            member_id: a.get("userinfo").id,
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.comment_list, n).then(function(a) {
            console.log(a, "评论列表"), 0 != a.length && i.setData({
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
        this.pulldown();
    },
    onShareAppMessage: function() {
        return {
            title: a.get("fx").title,
            imageUrl: a.get("fx").img,
            path: "/pages/index/index?pid=".concat(a.get("member_id"))
        };
    }
});