var e = require("api.js");

var t = "_deadtime";

module.exports = {
    request: function(e, t, n, o, a, i) {
        this.requestLoading(e, t, n, "", "", o, a, i);
    },
    requestLoading: function(e, t, n, o, a, i, r, s) {
        if (t.disid = wx.getStorageSync("disidkey"), wx.showNavigationBarLoading(), "" != o && wx.showLoading({
            title: o,
            mask: !0
        }), this.get("is_show") && 2 == this.get("is_show")) return void wx.showToast({
            icon: "none",
            title: "小程序被禁用，请联系管理员",
            duration: 1e4
        });
        switch (n) {
          case 1:
            if (this.get("key")) t.key = this.get("key"); else {
                var c = getCurrentPages();
                c[c.length - 1].setData({
                    register: !0
                });
            }
            break;

          case 2:
            this.get("key") && (t.key = this.get("key"));
        }
        var u = this;
        wx.request({
            url: e,
            data: t,
            header: {
                "Content-Type": "" != i ? i : "GET" === a ? "application/json" : "application/x-www-form-urlencoded"
            },
            method: a,
            success: function(e) {
                var t;
                (wx.hideNavigationBarLoading(), "" != o && wx.hideLoading(), 200 == e.statusCode) ? 200 == e.data.code ? r(e.data.datas) : e.data.error ? "请登录" == e.data.error ? (u.remove("key"), 
                (t = getCurrentPages())[t.length - 1].setData({
                    register: !0
                })) : (wx.showToast({
                    icon: "none",
                    title: e.data.error
                }), s(e.data)) : "请登录" == e.data.datas.error ? (u.remove("key"), (t = getCurrentPages())[t.length - 1].setData({
                    register: !0
                })) : (wx.showToast({
                    icon: "none",
                    title: e.data.datas.error
                }), s(e.data.datas)) : s();
            },
            fail: function(e) {
                wx.hideNavigationBarLoading(), "" != o && wx.hideLoading(), s();
            },
            complete: function(e) {}
        });
    },
    put: function(e, n, o) {
        wx.setStorageSync(e, n);
        var a = parseInt(o);
        if (a > 0) {
            var i = Date.parse(new Date());
            i = i / 1e3 + a, wx.setStorageSync(e + t, i + "");
        } else wx.removeStorageSync(e + t);
    },
    get: function(e, n) {
        var o = parseInt(wx.getStorageSync(e + t));
        if (o && parseInt(o) < Date.parse(new Date()) / 1e3) return n || void 0;
        var a = wx.getStorageSync(e);
        return a || n;
    },
    remove: function(e) {
        wx.removeStorageSync(e), wx.removeStorageSync(e + t);
    },
    clear: function() {
        wx.clearStorageSync();
    },
    formid: function(t) {
        var n = this.get("openID");
        if ("the formId is a mock one" != t.detail.formId && n) {
            var o = {
                openid: n,
                formid: t.detail.formId
            };
            this.requestLoading(e.GET.from_id, o, 3, "", "", "GET", function(e) {
                console.log(e);
            }, function(e) {
                console.error(e);
            });
        }
    },
    setlocation: function(e, t, n, o, a) {
        var i = this;
        wx.setlocation({
            type: e ? "gcj02" : "wgs84",
            success: function(e) {
                o(e);
            },
            fail: function(r) {
                a(r), t && i.opention(e, t, n, o, a);
            }
        });
    },
    opention: function(e, t, n, o, a) {
        var i = this;
        wx.showModal({
            title: "获取位置失败",
            content: n,
            success: function(r) {
                r.confirm ? wx.openSetting({
                    success: function(r) {
                        !0 === r.authSetting["scope.userLocation"] && (wx.showToast({
                            title: "授权成功",
                            icon: "success",
                            duration: 1e3
                        }), i.setlocation(e, t, n, o, a));
                    }
                }) : r.cancel && i.opention(e, t, n, o, a);
            }
        });
    },
    uploadFileList: function(e, t, n, o, a, i) {
        var r = Object.prototype.toString, s = 0;
        function c(e, t, o, a, i, u, l) {
            wx.uploadFile({
                url: e,
                filePath: o.path,
                name: "file",
                header: {
                    "Content-Type": "multipart/form-data"
                },
                formData: t,
                success: function(o) {
                    console.log(o), (o = JSON.parse(o.data)).datas.idx = s, console.log(o.datas), a(o.datas), 
                    "[object Array]" == r.call(n) && u < n.length - 1 && (s++, c(e, t, n[s], a, i, s, l));
                },
                fail: function(o) {
                    wx.showToast({
                        icon: "none",
                        title: "第" + (s + 1) + "张照片上传失败" + o.data.error
                    }), a(o), res.datas.idx = s, "[object Array]" == r.call(n) && u < n.length - 1 && (s++, 
                    c(e, t, n[s], a, i, s, l));
                }
            }).onProgressUpdate(function(e) {
                wx.showToast({
                    icon: "none",
                    title: "第" + (s + 1) + "张照片上传中.." + e.progress + "%"
                }), l({
                    idx: s + 1,
                    progress: e.progress
                });
            });
        }
        "[object Array]" == r.call(n) ? n.length > 1 ? c(e, t, n[s], o, a, s, i) : c(e, t, n[0], o, a, 1, i) : c(e, t, n, o, a, 1, i);
    },
    validate_required: function(e, t) {
        return null != e && "" != e && e != [] || (wx.showToast({
            title: t,
            icon: "none"
        }), !1);
    },
    toDecimal2: function(e) {
        var t = parseFloat(e);
        if (isNaN(t)) return !1;
        var n = (t = Math.round(100 * e) / 100).toString(), o = n.indexOf(".");
        for (o < 0 && (o = n.length, n += "."); n.length <= o + 2; ) n += "0";
        return n;
    },
    locationDetails: function(t, n, o) {
        new (require("qqmap/qqmap-wx.js"))({
            key: e.qqmapKey
        }).reverseGeocoder({
            location: t || "",
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                console.error(e), o(e);
            }
        });
    },
    getCityList: function(t, n) {
        new (require("qqmap/qqmap-wx.js"))({
            key: e.qqmapKey
        }).getCityList({
            success: function(e) {
                t(e.result[1]);
            },
            fail: function(e) {
                n(e);
            }
        });
    },
    Searcher: function(e, t, n, o) {
        return e.filter(function(e, a, i) {
            for (var r = 0; r < e[o].length; r++) {
                e[o][r].show = !1;
                for (var s = function(a) {
                    null == e[o][r][n[a]] && null == e[o][r][n[a]] || e[o][r][n[a]].indexOf(t) >= 0 && ([], 
                    e[o].filter(function(e, o, i) {
                        e[n[a]].indexOf(t) >= 0 && (e.show = !0);
                    }));
                }, c = 0; c < n.length; c++) {
                    s(c);
                }
            }
        }), e;
    },
    filterOne: function(e, t, n) {
        return e.filter(function(e, o, a) {
            for (var i = 0; i < n.length; i++) if ((null != e[n[i]] || null != e[n[i]]) && e[n[i]].indexOf(t) >= 0) return e;
        });
    },
    getuserinfo: function(t) {
        var n = this;
        n.get("key") && n.requestLoading(e.GET.member_info, {
            member_id: n.get("member_id")
        }, 1, "", "GET", "", function(e) {
            n.put("userinfo", e), t(!0);
        }, function() {
            wx.showToast({
                title: "网络繁忙，请稍后再试",
                icon: "none"
            });
        });
    }
};