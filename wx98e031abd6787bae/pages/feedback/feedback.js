var t = getApp();

Page({
    data: {
        id: "",
        items: "",
        title: ""
    },
    onLoad: function(e) {
        this.setData({
            items: t.globalData.content
        }), this.tidetail();
    },
    tidetail: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items.report_errors.subject_id
        };
        wx.$http.get(wx.$get.subject_info, e).then(function(e) {
            console.log(e, "题目解析"), t.setData({
                title: e
            });
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