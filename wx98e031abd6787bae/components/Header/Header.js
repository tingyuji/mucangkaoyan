getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        ban: {
            type: Boolean,
            value: !1
        },
        showNull: {
            type: Boolean,
            value: !0
        },
        bgi: {
            type: String,
            value: ""
        },
        bgc: {
            type: String,
            value: "#ffffff"
        },
        title: {
            type: String,
            value: "标题"
        },
        titleColor: {
            type: String,
            value: "#333"
        },
        showBack: {
            type: Boolean,
            value: !0
        },
        isBack: {
            type: Boolean,
            value: !0
        },
        backColor: {
            type: String,
            value: "#000000"
        },
        boxPadding: {
            type: Number,
            value: 24
        }
    },
    lifetimes: {
        attached: function() {
            this.setHeader();
        }
    },
    data: {
        systemInfo: wx.getSystemInfoSync(),
        headerHeight: 0
    },
    methods: {
        backPage: function() {
            console.log(this.data.ban), this.data.isBack ? this.data.ban ? this.triggerEvent("back") : wx.navigateBack({
                delta: 1
            }) : wx.redirectTo({
                url: "/pages/index/index"
            });
        },
        setHeader: function() {
            var e = wx.getMenuButtonBoundingClientRect(), t = 2 * (e.top - this.data.systemInfo.statusBarHeight) + e.height;
            this.setData({
                headerHeight: t
            });
        }
    }
});