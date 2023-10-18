function e(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET", a = arguments.length > 3 ? arguments[3] : void 0, n = null, r = 1e4, i = "key", d = "disidkey", s = new Promise(function(s, l) {
        a && wx.showLoading({
            title: a,
            mask: !0
        }), wx.showNavigationBarLoading();
        var g = wx.getStorageSync(i);
        t.key = g, t.disid = wx.getStorageSync(d), wx.request({
            url: e,
            data: t,
            timeout: r,
            header: n || {
                "Content-Type": "application/json"
            },
            method: o,
            success: function(e) {
                if (200 == e.statusCode) if (200 == e.data.code) s(e.data.datas); else {
                    if (console.log(e.data.datas.error), "请登录" == e.data.datas.error) {
                        var t = getCurrentPages(), o = t[t.length - 1];
                        wx.removeStorageSync(i), o.setData({
                            register: !0
                        });
                    } else console.log(e.data.datas.error), wx.showToast({
                        title: e.data.datas.error,
                        icon: "none"
                    });
                    l(e);
                }
            },
            fail: function(e) {
                l(e);
            },
            complete: function() {
                a && wx.hideLoading({}), wx.hideNavigationBarLoading();
            }
        });
    });
    return s;
}

function t(t, o) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET", n = arguments.length > 3 ? arguments[3] : void 0;
    return e(t, o, a, n);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0, t.get = function(t) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments.length > 2 ? arguments[2] : void 0;
    return e(t, o, "GET", a);
}, t.post = function(t) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments.length > 2 ? arguments[2] : void 0;
    return e(t, o, "POST", a);
};

var o = t;

exports.default = o;