getApp();

var t = require("../../api/api").Api;

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1,
            observer: "_setDate"
        },
        er: {
            type: String,
            value: ""
        }
    },
    data: {
        tabid: 0,
        src: "",
        hai: "",
        domain: t.domain
    },
    methods: {
        noshow: function() {
            this.setData({
                show: !1
            });
        },
        _setDate: function(t, o) {
            console.log(t, "newDate", o), t && (this.setData({
                hai: wx.$cache.get("hai")
            }), this.drawCanvas());
        },
        qie: function(t) {
            var o = t.currentTarget.dataset.index;
            this.setData({
                tabid: o
            }), this.drawCanvas();
        },
        drawCanvas: function() {
            console.log("wewwewe"), console.log(this.data.hai);
            var t = this, o = this.data.hai[this.data.tabid].img, e = this.data.domain + "index_menu_4.png", i = this.data.er, a = [], s = [];
            0 == this.data.tabid && (a = [ {
                x: 0,
                y: 0,
                width: 652,
                height: 878,
                url: o
            }, {
                x: 234,
                y: 620,
                width: 185,
                height: 190,
                url: i
            }, {
                x: 282,
                y: 671,
                width: 88,
                height: 88,
                url: e,
                borderRadius: 88
            } ], s = [ {
                x: 219,
                y: 607,
                borderRadius: 215,
                backgroundColor: "#FFFFFF",
                width: 215,
                height: 215
            } ]), 1 == this.data.tabid && (a = [ {
                x: 0,
                y: 0,
                width: 652,
                height: 878,
                url: o
            }, {
                x: 210,
                y: 562,
                width: 185,
                height: 190,
                url: i
            }, {
                x: 258,
                y: 612,
                width: 88,
                height: 88,
                url: e,
                borderRadius: 88
            } ], s = [ {
                x: 185,
                y: 537,
                backgroundColor: "#FFFFFF",
                width: 234,
                height: 236,
                borderWidth: 4,
                borderColor: "#41122B"
            } ]), 2 == this.data.tabid && (a = [ {
                x: 0,
                y: 0,
                width: 652,
                height: 878,
                url: o
            }, {
                x: 426,
                y: 640,
                width: 185,
                height: 190,
                url: i
            }, {
                x: 474,
                y: 690,
                width: 88,
                height: 88,
                url: e,
                borderRadius: 88
            } ], s = [ {
                x: 410,
                y: 627,
                borderRadius: 215,
                backgroundColor: "#FFFFFF",
                width: 215,
                height: 215
            } ]), 3 == this.data.tabid && (a = [ {
                x: 25,
                y: 22,
                width: 296,
                height: 304,
                url: i,
                zIndex: 2
            }, {
                x: 102,
                y: 102,
                width: 141,
                height: 141,
                url: e,
                borderRadius: 141,
                zIndex: 3
            } ], s = [ {
                x: 0,
                y: 0,
                borderRadius: 346,
                backgroundColor: "#FFFFFF",
                width: 346,
                height: 346
            } ], this.setData({
                posterConfig: {
                    width: 346,
                    height: 346,
                    images: a,
                    blocks: s
                }
            }, function() {
                console.log(t.selectComponent("#poster")), t.selectComponent("#poster").onCreate(!0);
            })), 3 != this.data.tabid && this.setData({
                posterConfig: {
                    width: 652,
                    height: 878,
                    images: a,
                    blocks: s
                }
            }, function() {
                console.log(t.selectComponent("#poster")), t.selectComponent("#poster").onCreate(!0);
            });
        },
        onPosterSuccess: function(t) {
            console.log("预览还和好说歹说");
            var o = t.detail;
            console.log(o), this.setData({
                src: o
            });
        },
        onPosterFail: function(t) {
            console.log(t);
        },
        bindbtn: function() {
            var t = this;
            console.log("23232323"), console.log(this.data.src), wx.saveImageToPhotosAlbum({
                filePath: this.data.src,
                success: function(t) {
                    wx.showToast({
                        title: "保存成功",
                        icon: "success",
                        duration: 2e3
                    });
                },
                fail: function(o) {
                    console.log(o.errMsg), o.errMsg && wx.showModal({
                        title: "提示",
                        content: "您好,请先授权，在保存此图片。",
                        showCancel: !1,
                        success: function(o) {
                            o.confirm && wx.openSetting({
                                success: function(o) {
                                    console.log(o), o.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                                        filePath: t.data.src,
                                        success: function(t) {
                                            wx.showToast({
                                                title: "保存成功",
                                                icon: "success",
                                                duration: 2e3
                                            });
                                        }
                                    }) : wx.showModal({
                                        title: "温馨提示",
                                        content: "授权失败，请稍后重新获取",
                                        showCancel: !1
                                    });
                                }
                            });
                        }
                    });
                }
            });
        },
        go: function(t) {
            var o = t.currentTarget.dataset.url;
            this.noshow(), wx.navigateTo({
                url: o
            });
        }
    }
});