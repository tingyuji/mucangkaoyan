var t = getApp();

Page({
    data: {
        ios: t.globalData.ios,
        id: "",
        show: !1,
        current: 0,
        content: "",
        address: "",
        jz: "",
        jf: ""
    },
    onLoad: function(t) {
        this.setData({
            id: t.id,
            jz: wx.$cache.get("can").integral_price_proportion
        }), console.log(this.data.jf, this.data.jz, "ddddddddddddddd"), this.init();
    },
    init: function() {
        var t = this, a = {
            goods_id: this.data.id
        };
        wx.$http.get(wx.$get.goods_info, a).then(function(a) {
            console.log("商品详情", a), t.setData({
                items: a,
                content: a.content
            });
        });
    },
    bindqei: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    moren: function() {
        var t = this;
        wx.$http.get(wx.$get.default_goods_address, {}).then(function(a) {
            console.log(a, "默认地址"), t.setData({
                address: a
            });
        });
    },
    goaddress: function() {
        wx.navigateTo({
            url: "/pages/shippingAddress/shippingAddress"
        });
    },
    gopay: function() {
        this.data.ios ? this.data.jf >= this.data.items.integral_t ? wx.navigateTo({
            url: "/pages/confirmOrder/confirmOrder?id=".concat(this.data.id)
        }) : wx.showToast({
            title: "抱歉，积分不够",
            icon: "none",
            duration: 2e3
        }) : wx.navigateTo({
            url: "/pages/confirmOrder/confirmOrder?id=".concat(this.data.id)
        });
    },
    goshow: function() {
        1 == this.data.items.type && this.data.address || 1 != this.data.items.type ? this.setData({
            show: !0
        }) : wx.navigateTo({
            url: "/pages/shippingAddress/shippingAddress"
        });
    },
    zhi: function(t) {
        console.log(t);
        var a = this, e = {
            goods_id: this.data.id,
            pay_type: 2,
            province: this.data.address.province ? this.data.address.province : "",
            city: this.data.address.city ? this.data.address.city : "",
            area: this.data.address.area ? this.data.address.area : "",
            address: this.data.address.address ? this.data.address.address : "",
            mobile: this.data.address.mobile ? this.data.address.mobile : "",
            realname: this.data.address.realname ? this.data.address.realname : "",
            activation_code: t.detail
        };
        wx.$http.get(wx.$get.add_goods_order, e).then(function(t) {
            console.log("立即支付", t), a.setData({
                show: !1
            }), wx.redirectTo({
                url: "/pages/myOrder/myOrder?type=".concat(a.data.items.type)
            });
        });
    },
    goshuo: function() {
        1 == this.data.items.no_money_type ? t.globalData.content = this.data.items.no_money_intro : t.globalData.content = this.data.items.no_money_url, 
        wx.navigateTo({
            url: "/pages/waparse/waparse?is_url=".concat(this.data.items.no_money_type)
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.$cache.get("dz") && this.setData({
            address: wx.$cache.get("dz")
        }), this.setData({
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