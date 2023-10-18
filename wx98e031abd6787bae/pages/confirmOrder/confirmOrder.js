var t = getApp();

Page({
    data: {
        ios: t.globalData.ios,
        id: "",
        items: "",
        address: "",
        flage: !1,
        content: "",
        jf: ""
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        }), t.globalData.ios && this.setData({
            flage: !0
        }), this.init();
    },
    init: function() {
        var t = this, e = {
            goods_id: this.data.id
        };
        wx.$http.get(wx.$get.goods_info, e).then(function(e) {
            console.log("商品详情", e), t.setData({
                items: e
            });
        });
    },
    black: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    moren: function() {
        var t = this;
        wx.$http.get(wx.$get.default_goods_address, {}).then(function(e) {
            console.log("默认地址", e), t.setData({
                address: e
            });
        });
    },
    godetail: function() {
        wx.navigateTo({
            url: "/pages/shippingAddress/shippingAddress"
        });
    },
    qie: function() {
        this.setData({
            flage: !this.data.flage
        });
    },
    bindchinge: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    zhi: function() {
        1 == this.data.items.type && this.data.address || 1 != this.data.items.type ? this.fukuan() : wx.navigateTo({
            url: "/pages/shippingAddress/shippingAddress"
        });
    },
    fukuan: function() {
        var t = this, e = {
            goods_id: this.data.id,
            pay_type: 1,
            is_deduction: this.data.flage ? 1 : 2,
            province: this.data.address.province ? this.data.address.province : "",
            city: this.data.address.city ? this.data.address.city : "",
            area: this.data.address.area ? this.data.address.area : "",
            address: this.data.address.address ? this.data.address.address : "",
            mobile: this.data.address.mobile ? this.data.address.mobile : "",
            realname: this.data.address.realname ? this.data.address.realname : "",
            remarks: this.data.content ? this.data.content : ""
        };
        wx.$http.get(wx.$get.add_goods_order, e, "支付...").then(function(e) {
            if (3 == e.code) wx.redirectTo({
                url: "/pages/myOrder/myOrder?type=".concat(t.data.items.type)
            }); else {
                var a = e.data;
                t.data.ios ? (wx.showToast({
                    title: "抱歉,积分不足",
                    icon: "none",
                    duration: 2e3
                }), t.quxiao(a.order_id)) : wx.requestPayment({
                    timeStamp: a.timeStamp,
                    nonceStr: a.nonceStr,
                    package: a.package,
                    signType: "MD5",
                    paySign: a.paySign,
                    success: function(e) {
                        wx.redirectTo({
                            url: "/pages/myOrder/myOrder?type=".concat(t.data.items.type)
                        });
                    },
                    fail: function(e) {
                        t.quxiao(a.order_id);
                    }
                });
            }
            t.my();
        });
    },
    my: function() {
        wx.$http.get(wx.$get.get_member_info, {}).then(function(t) {
            t.vip_time || (t.vip_time = "1970-01-01"), console.log("我的", t), wx.$cache.set("userinfo", t);
        });
    },
    quxiao: function(t) {
        var e = {
            order_id: t
        };
        wx.$http.get(wx.$get.cancel_goods_order, e).then(function(t) {
            console.log("取消订单", t);
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.$cache.get("dz") && this.setData({
            address: wx.$cache.get("dz"),
            jf: wx.$cache.get("userinfo").integral
        });
    },
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