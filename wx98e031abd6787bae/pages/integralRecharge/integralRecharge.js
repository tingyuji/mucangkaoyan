var t = getApp();

Page({
    data: {
        itemsid: 0,
        ios: t.globalData.ios,
        items: "",
        integral_pay: "",
        show: !1,
        zhu: "",
        userinfo: "",
        num: "",
        show2: !1,
        can: ""
    },
    onLoad: function(e) {
        this.init(), this.setData({
            can: wx.$cache.get("can"),
            num: wx.$cache.get("can").integral_price_proportion,
            ios: t.globalData.ios
        }), this.mywo();
    },
    qie: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            itemsid: e,
            integral_pay: ""
        });
    },
    btn2: function() {
        this.setData({
            show2: !0
        });
    },
    mywo: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(e) {
            e.vip_time || (e.vip_time = "1970-01-01"), console.log("我的积分", e), t.setData({
                userinfo: e
            }), wx.$cache.set("userinfo", e);
        });
    },
    init: function() {
        var t = this;
        wx.$http.get(wx.$get.integral_meal, {}).then(function(e) {
            console.log("获取套餐数", e), t.setData({
                items: e
            });
        });
    },
    show: function() {
        this.setData({
            show: !0
        });
    },
    btn: function() {
        var t = this, e = {
            type: this.data.integral_pay ? 3 : 1,
            meal_id: this.data.integral_pay ? "" : this.data.items[this.data.itemsid].id,
            integral_pay: this.data.integral_pay
        };
        wx.$http.get(wx.$get.pay_integral_meal, e, "支付...").then(function(e) {
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(e) {
                    wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        duration: 2e3
                    }), t.mywo();
                },
                fail: function(t) {}
            });
        });
    },
    zhi: function(t) {
        var e = t.detail, i = this, n = {
            type: 2,
            code: e
        };
        wx.$http.get(wx.$get.pay_integral_meal, n).then(function(t) {
            console.log("获取套餐数", t), i.setData({
                show: !1
            }), wx.showToast({
                title: "兑换成功",
                icon: "success",
                duration: 2e3
            }), i.mywo();
        });
    },
    bindchinge: function(t) {
        this.setData({
            integral_pay: t.detail.value,
            itemsid: null
        });
    },
    onPageScroll: function(t) {
        t.scrollTop > 80 ? this.setData({
            background: "white"
        }) : this.setData({
            background: ""
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