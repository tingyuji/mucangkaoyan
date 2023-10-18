var t = getApp(), e = require("../../api/api").Api, a = require("../../api/network.js");

Page({
    data: {
        array: [],
        index: 0,
        swiper: [],
        show: !1,
        timer: null,
        days: "000",
        hours: "00",
        minutes: "00",
        seconds: "00",
        yan: "",
        can: "",
        type: "",
        register: !1,
        shu: "",
        phone: !1,
        domain: e.domain,
        shuatinum: 0,
        mokaonum: 0
    },
    bindPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            index: t.detail.value
        });
        var e = t.detail.value, a = this.data.array[e].id;
        wx.setStorageSync("disidkey", a), this.can();
        var i = this.data.can.real_line ? this.data.can.real_line : 0 + this.data.can.fictitious_line ? this.data.can.fictitious_line : 0, n = this.data.can.mk_line ? this.data.can.mk_line : 0;
        this.setData({
            shuatinum: i
        }), this.setData({
            mokaonum: n
        });
    },
    get_library_discipline_list: function() {
        var t = this;
        wx.$request(wx.$api.library_discipline, {}).then(function(e) {
            t.setData({
                array: e
            });
            var a;
            a = e[0].id, t.setData({
                index: 0
            }), wx.setStorageSync("disidkey", a), console.log(e);
        });
    },
    jumpPage: function(t) {
        if (!wx.getStorageSync("key")) return this.setData({
            register: !0
        }), !1;
        wx.$request(wx.$api.add_mk_line, {}), console.log(t.currentTarget.dataset.url), 
        wx.navigateTo({
            url: t.currentTarget.dataset.path
        });
    },
    togw: function() {
        wx.navigateToMiniProgram({
            appId: "wxbf766cfc7cca4af7"
        });
    },
    onLoad: function(t) {
        console.log("55555555555666666666666"), this.can(), this.get_library_discipline_list(), 
        t.a && wx.$cache.set("pid", t.a), this.banner(), wx.$cache.get("can") ? (this.setData({
            can: wx.$cache.get("can")
        }), this.time()) : this.can(), wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    can: function() {
        var t = this;
        wx.$http.get(wx.$get.member_info, {}).then(function(t) {
            console.log("我的", t), a.put("userinfo", t);
        }), wx.$http.get(wx.$get.get_show, {}).then(function(e) {
            t.setData({
                can: e
            }), console.log("显示555555555555555555参数", e), wx.$cache.set("can", e), t.time(), 
            console.log(e, "显示参数");
        });
    },
    goranking: function() {
        wx.navigateTo({
            url: "/pages/ranking/ranking"
        });
    },
    time: function() {
        var t = this, e = this.data.can.examination_time, a = Number(e.split(" ")[0].split("-")[0]), i = Number(e.split(" ")[0].split("-")[1]), n = Number(e.split(" ")[0].split("-")[2]), s = Number(e.split(" ")[1].split(":")[0]), r = Number(e.split(" ")[1].split(":")[1]), o = new Date(), c = o.getFullYear(), l = o.getMonth() + 1, u = o.getDate(), g = o.getHours();
        o.getMinutes(), o.getSeconds();
        console.log(this.data.can.examination_time), c <= a && (l == i ? u == n ? g == s || g < s && (console.log("执行"), 
        this.setData({
            timer: setInterval(function() {
                t.leftTimer(a, i, n, s, r, 0);
            }, 1e3)
        })) : u < n && (console.log("执行1"), this.setData({
            timer: setInterval(function() {
                t.leftTimer(a, i, n, s, r, 0);
            }, 1e3)
        })) : this.setData({
            timer: setInterval(function() {
                t.leftTimer(a, i, n, s, r, 0);
            }, 1e3)
        }));
    },
    banner: function() {
        var t = this;
        wx.$http.post(wx.$get.get_banner, {
            type: 1
        }).then(function(e) {
            t.setData({
                swiper: e,
                yan: e[0].bg_color
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: e[0].bg_color
            });
        });
    },
    animationfinish: function(t) {
        var e = t.detail.current, a = this.data.swiper;
        this.setData({
            yan: a[e].bg_color
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a[e].bg_color
        });
    },
    tiao: function(e) {
        var a = this.data.swiper, i = e.currentTarget.dataset.index;
        "utside" == a[i].target ? (t.globalData.content = a[i].url, wx.navigateTo({
            url: "/pages/waparse/waparse?title=" + a[i].title + "&is_url=2"
        })) : 1 == a[i].applets_page_is_tabbar ? wx.switchTab({
            url: a[i].applets_page_path
        }) : "self" == a[i].target ? a[i].parameter ? wx.navigateTo({
            url: a[i].applets_page_path + "?" + a[i].parameter + "&" + a[i].applets_page_parameter
        }) : wx.navigateTo({
            url: a[i].applets_page_path
        }) : wx.navigateToMiniProgram({
            appId: a[i].app_id,
            path: a[i].path + "?" + a[i].parameter,
            extarData: {
                open: "auth"
            },
            envVersion: "release",
            success: function(t) {}
        });
    },
    leftTimer: function(t, e, a, i, n, s) {
        var r = new Date(t, e - 1, a, i, n, s) - new Date(), o = parseInt(r / 1e3 / 60 / 60 / 24, 10), c = parseInt(r / 1e3 / 60 / 60 % 24, 10), l = parseInt(r / 1e3 / 60 % 60, 10), u = parseInt(r / 1e3 % 60, 10);
        function g(t) {
            return t < 10 && (t = "0" + t), t;
        }
        o = function(t) {
            t < 10 ? t = "00" + t : t < 100 && (t = "0" + t);
            return t;
        }(o), c = g(c), l = g(l), u = g(u), this.setData({
            days: o,
            hours: c,
            minutes: l,
            seconds: u
        });
    },
    bindshe: function(t) {
        var e = t.currentTarget.dataset.type;
        this.setData({
            show: !0,
            type: e
        });
    },
    go: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = (e.flage, e.type);
        e.flag || 2 != i ? wx.navigateTo({
            url: a
        }) : this.setData({
            show: !0,
            type: 6
        });
    },
    shu: function() {
        var t = this;
        wx.$http.get(wx.$get.member_news_num, {}).then(function(e) {
            t.setData({
                shu: e
            });
        });
    },
    userinfo: function() {
        var t = this;
        wx.$http.get(wx.$get.get_member_info, {}).then(function(e) {
            e.vip_time || (e.vip_time = "1970-01-01"), wx.$cache.set("userinfo", e), wx.$cache.set("member_id", e.id), 
            e.mobile ? t.setData({
                phone: !1
            }) : t.setData({
                phone: !0
            });
        });
    },
    gojinsuo: function() {
        a.get("key") ? wx.navigateTo({
            url: "/pages/bookList/bookList"
        }) : this.setData({
            register: !0
        });
    },
    onShow: function() {
        wx.$cache.get("key") && (this.shu(), this.userinfo());
    },
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    },
    onShareTimeline: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            query: "a=".concat(wx.$cache.get("member_id"))
        };
    }
});