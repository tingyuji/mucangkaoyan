var t = getApp(), e = require("../../api/api").Api;

Component({
    properties: {
        title: {
            type: String,
            value: "我的错题"
        },
        background: {
            type: String,
            value: ""
        },
        colorr: {
            type: String,
            value: "black"
        },
        leftimg: {
            type: Boolean,
            value: !1
        },
        leftimg2: {
            type: Boolean,
            value: !1
        },
        flexd: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        var t = wx.getSystemInfoSync(), e = wx.getMenuButtonBoundingClientRect(), a = e.bottom + e.top - t.statusBarHeight;
        this.setData({
            customBar: a
        });
    },
    data: {
        customBar: t.globalData.customBar,
        domain: e.domain
    },
    methods: {
        black: function() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});