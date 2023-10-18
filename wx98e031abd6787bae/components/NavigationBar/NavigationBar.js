getApp();

Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#1B1B1B"
        },
        showBack: {
            type: Boolean,
            value: !1
        },
        background: {
            type: String,
            value: "white"
        },
        bgSrc: {
            type: String,
            value: ""
        },
        flage: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "scaleToFill"
        },
        height: {
            type: Number,
            value: 0
        },
        navigateTo: {
            type: String,
            value: ""
        },
        navigateBack: {
            type: Number,
            value: 1
        }
    },
    attached: function() {
        var t = wx.getSystemInfoSync(), e = wx.getMenuButtonBoundingClientRect(), a = e.top - t.statusBarHeight, i = t.statusBarHeight, n = e.height + 2 * a, g = i + n;
        this.setData({
            navigationBarHeight: g,
            titleBarHeight: n,
            statusBarHeight: i
        });
    },
    data: {
        statusBarHeight: "",
        titleBarHeight: "",
        navigationBarHeight: ""
    },
    methods: {
        back: function() {
            if (!(this.properties.navigateBack > 0)) throw "请检查是否有为返回图标设置跳转规则";
            this.data.flage ? wx.reLaunch({
                url: "/pages/index/index"
            }) : wx.navigateBack({
                delta: this.navigateBack,
                fail: function(t) {
                    wx.redirectTo({
                        url: "/pages/index/index"
                    });
                }
            });
        }
    }
});