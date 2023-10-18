getApp();

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
        black: {
            type: Boolean,
            value: !1
        },
        flexd: {
            type: Boolean,
            value: !1
        },
        flage: {
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
        customBar: ""
    },
    methods: {
        black: function() {
            this.data.flage ? wx.switchTab({
                url: "/pages/index/index"
            }) : wx.navigateBack({
                delta: 1,
                fail: function(t) {
                    wx.redirectTo({
                        url: "/pages/index/index"
                    });
                }
            });
        }
    }
});