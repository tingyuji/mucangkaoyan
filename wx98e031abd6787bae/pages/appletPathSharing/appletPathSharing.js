var n = getApp();

Page({
    data: {
        can: "",
        domian: n.globalData.domian
    },
    onLoad: function(n) {
        this.setData({
            can: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        });
    },
    copy: function() {
        wx.setClipboardData({
            data: this.data.can.app_url,
            success: function(n) {
                wx.getClipboardData({
                    success: function(n) {
                        console.log(n.data);
                    }
                });
            }
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