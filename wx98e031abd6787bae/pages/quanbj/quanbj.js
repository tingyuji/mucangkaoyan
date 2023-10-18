var t = require("../../@babel/runtime/helpers/defineProperty"), e = (getApp(), require("../../api/api").Api);

Page({
    data: {
        subject: "",
        page: 1,
        page_size: 20,
        id: "",
        domain: e.domain
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        });
    },
    init3: function() {
        var t = this, e = {
            subject_ids: this.data.id,
            member_id: wx.$cache.get("member_id"),
            page: 1,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.note_list, e).then(function(e) {
            console.log(e, "笔记列表"), t.setData({
                subject: e
            });
        });
    },
    maskjl: function() {
        wx.navigateTo({
            url: "/pages/newnote/newnote?id=" + this.data.id
        });
    },
    pulldown: function() {
        this.setData({
            page: this.data.page += 1
        });
        var t = this, e = {
            subject_ids: this.data.id,
            member_id: wx.$cache.get("member_id"),
            page: this.data.page,
            page_size: this.data.page_size
        };
        wx.$http.get(wx.$get.note_list, e).then(function(e) {
            if (console.log(e, "笔记列表"), 0 == e.length) ; else {
                var a = t.data.subject.concat(e);
                t.setData({
                    subject: a
                });
            }
        });
    },
    love: function(e) {
        var a = e.currentTarget.dataset.id, i = e.currentTarget.dataset.flage, n = e.currentTarget.dataset.index, s = this, o = {
            log_id: a,
            type: 1
        };
        wx.$http.get(wx.$get.give_log, o).then(function(e) {
            console.log(e, "收藏笔记"), 1 == i ? s.setData(t({}, "subject[".concat(n, "].is_give"), 2)) : s.setData(t({}, "subject[".concat(n, "].is_give"), 1));
            var a = getCurrentPages(), o = a[a.length - 2];
            "pages/brushTopic/brushTopic" == o.route && o.tidetail2();
        });
    },
    kanimg: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.index2;
        console.log(this.data.subject[e].imgs), wx.previewImage({
            current: this.data.subject[e].imgs[a],
            urls: this.data.subject[e].imgs
        });
    },
    onReady: function() {},
    onShow: function() {
        this.init3();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.pulldown();
    },
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    }
});