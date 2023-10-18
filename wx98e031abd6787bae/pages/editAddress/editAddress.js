var a = require("../../@babel/runtime/helpers/defineProperty"), e = getApp();

Page({
    data: {
        flage: !1,
        region: [],
        id: "",
        params: {
            realname: "",
            mobile: "",
            address: ""
        }
    },
    onLoad: function(a) {
        console.log(e.address);
        var t = e.address;
        this.setData({
            "params.realname": t.realname,
            "params.mobile": t.mobile,
            "params.address": t.address,
            "region[0]": t.province,
            "region[1]": t.city,
            "region[2]": t.area,
            id: t.id,
            flage: 1 == t.is_default
        });
    },
    bindchine: function() {
        this.setData({
            flage: !this.data.flage
        });
    },
    bindRegionChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            region: a.detail.value
        });
    },
    btn: function() {
        function a(a, e) {
            return null != a && "" != a && a != [] || (wx.showToast({
                title: e,
                icon: "none"
            }), !1);
        }
        var e = this.data.params;
        if (a(e.realname, "请填写联系人") && a(e.mobile, "请填写联系电话") && a(this.data.region, "请填写收货地址") && a(e.address, "请填写详细地址")) {
            var t = {
                realname: this.data.params.realname,
                mobile: this.data.params.mobile,
                address: this.data.params.address,
                is_default: this.data.flage ? 1 : 2,
                province: this.data.region[0],
                city: this.data.region[1],
                area: this.data.region[2],
                goods_address_id: this.data.id
            };
            wx.$http.get(wx.$get.edit_goods_address, t).then(function(a) {
                console.log("添加收货地址", a), wx.navigateBack({
                    delta: 1
                });
            });
        }
    },
    bindchinge: function(e) {
        var t = e.target.id, i = e.detail.value;
        this.setData(a({}, "params.".concat(t), i));
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