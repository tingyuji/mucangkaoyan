var n = require("../../api/api").Api;

Page({
    data: {
        domain: n.domain,
        list: []
    },
    onLoad: function(n) {},
    record: function() {
        var n = this;
        wx.$http.get(wx.$get.sys_chat_img, {}).then(function(o) {
            console.log(o, "答题卡信息"), n.setData({
                list: o
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.record();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});