var t = getApp(), e = require("../../api/api").Api;

Page({
    data: {
        tabid: 0,
        customBar: t.globalData.customBar,
        tabbar: [ "刷题量排名", "点赞排名", "打卡排名" ],
        tabid2: 1,
        items: "",
        my: "",
        domain: e.domain,
        register: !1
    },
    onLoad: function(t) {
        this.setData({
            register: Boolean(!wx.$cache.get("key"))
        }), this.init();
    },
    qie: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            tabid: e,
            tabid2: 1
        }), this.init();
    },
    qie2: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            tabid2: e
        }), this.init();
    },
    init: function() {
        var t = this, e = wx.getSystemInfoSync(), i = wx.getMenuButtonBoundingClientRect(), n = i.bottom + i.top - e.statusBarHeight;
        this.setData({
            customBar: n
        });
        var a = this, o = {
            member_id: wx.$cache.get("member_id"),
            type: this.data.tabid + 1,
            is_friends: 1 == this.data.tabid2 ? 2 : 1
        };
        wx.$http.get(wx.$get.ranking_list, o).then(function(e) {
            console.log("排行榜", e), 0 == e.length && (wx.showToast({
                title: "暂无好友",
                icon: "none"
            }), setTimeout(function() {
                t.qie2({
                    currentTarget: {
                        dataset: {
                            index: 1
                        }
                    }
                });
            }, 1e3)), a.setData({
                items: e
            });
        });
    },
    goshua: function() {
        wx.redirectTo({
            url: "/pages/homePage/homePage"
        });
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
            title: network.get("fx").title,
            imageUrl: network.get("fx").img,
            path: "/pages/index/index?pid=".concat(network.get("member_id"))
        };
    }
});