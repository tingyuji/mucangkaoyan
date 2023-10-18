getApp();

var e = require("../../api/api").Api;

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        daitem: {
            type: Object,
            value: {},
            observer: "watch"
        },
        questionNumber: {
            type: Number,
            value: {}
        }
    },
    data: {
        domain: e.domain
    },
    methods: {
        close: function() {
            console.log("5555555"), this.setData({
                show: !1
            });
        },
        watch: function(e, t) {
            console.log(e);
        },
        daiao: function(e) {
            if (t - 1 > this.data.questionNumber) wx.showToast({
                title: "只能看已做过的题,请顺序刷题",
                icon: "none"
            }); else {
                var t = e.currentTarget.dataset.index, a = getCurrentPages(), o = a[a.length - 1];
                this.setData({
                    show: !1
                }), o.setData({
                    num: t - 1,
                    submit: !1
                }), o.next();
            }
        }
    }
});