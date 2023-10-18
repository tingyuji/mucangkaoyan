var t = require("../../@babel/runtime/helpers/defineProperty");

getApp();

Component({
    properties: {
        detail: {
            type: Object,
            value: {},
            observer: function(t) {}
        },
        yejian: {
            type: Boolean,
            value: !1
        },
        submit: {
            type: Boolean,
            value: !1
        },
        items: {
            type: Object,
            value: {}
        },
        type: {
            type: Number,
            value: 0
        },
        num: {
            type: Number,
            value: 0
        }
    },
    observers: {
        detail: function(t) {
            this.monitor_detail(t);
        }
    },
    data: {
        my_answer: "",
        flage: !1,
        fen: "",
        fenshu_arr: [],
        df_popShow: !1
    },
    methods: {
        monitor_detail: function(t) {
            console.log("题目详情", t);
            for (var e = [], a = t.fraction_total, n = .5; n <= a; n += .5) e.push(n);
            this.setData({
                fenshu_arr: e
            }), t.subject_log && this.setData({
                my_answer: t.subject_log.little_question_json,
                fen: t.subject_log.score,
                flage: !0
            });
        },
        bindChange_fen: function(t) {
            console.log(t), this.setData({
                fen: this.data.fenshu_arr[t.detail.value[0]]
            });
        },
        popupTap: function(t) {
            this.setData({
                df_popShow: !0
            });
        },
        closePop: function(t) {
            this.setData({
                df_popShow: !1
            });
        },
        preventTouchMove: function(t) {},
        dafen: function() {
            this.setData({
                df_popShow: !1
            }), this.sure();
        },
        flage: function() {
            if (this.data.my_answer.length < 1) return wx.showToast({
                title: "答案不能为空~",
                icon: "none"
            }), !1;
            this.setData({
                flage: !this.data.flage
            });
        },
        bindmy_answer: function(t) {
            this.setData({
                my_answer: t.detail.value
            });
        },
        bindchinge: function(t) {
            this.setData({
                fen: t.detail.value
            });
        },
        sure: function() {
            if (0 != this.data.fen.length) if (this.data.fen > this.data.detail.fraction_total) wx.showToast({
                title: "自评分不能超过题目满分",
                icon: "none"
            }); else {
                var e, a = getCurrentPages(), n = a[a.length - 1];
                if (2 == this.data.type) n.setData((t(e = {}, "items2[".concat(this.data.num, "].fen"), this.data.fen), 
                t(e, "items2[".concat(this.data.num, "].my_answer"), this.data.my_answer), t(e, "items2[".concat(this.data.num, "].is_correct"), 1), 
                e));
                n.submit(), wx.showToast({
                    title: "保存成功",
                    icon: "none"
                });
            } else wx.showToast({
                title: "保存分数失败，请重新选择",
                icon: "none"
            });
        }
    }
});