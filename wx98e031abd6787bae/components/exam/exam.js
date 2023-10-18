var t = require("../../@babel/runtime/helpers/defineProperty"), e = (getApp(), require("../../api/api").Api);

Component({
    properties: {
        detail: {
            type: Object,
            value: {},
            observer: "watch1"
        },
        submit: {
            type: Boolean,
            value: !1,
            observer: "watch"
        },
        vague: {
            type: Boolean,
            value: !1
        },
        ye: {
            type: Boolean,
            value: !1
        },
        my_answer: {
            type: Object,
            value: []
        },
        items: {
            type: Object,
            value: {}
        },
        num: {
            type: Number,
            value: 0
        },
        type: {
            type: Number,
            value: 0
        },
        isOnExam: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        option_str: [],
        domain: e.domain
    },
    moved: function() {},
    methods: {
        check: function(t) {
            if (!this.data.submit) {
                var e = t.currentTarget.dataset.index;
                if (2 != this.data.type) {
                    var o = this.data.detail;
                    if (1 == o.type) {
                        for (var a = 0; a < o.option_str.length; a++) o.option_str[a].flage = !1;
                        o.option_str[e].flage = !0;
                    } else o.option_str[e].flage = !o.option_str[e].flage, console.log(o.option_str[e].flage, "adsfasdfafasdfafasfadsf");
                    this.setData({
                        detail: o
                    }), console.log(this.data.detail, "88888888");
                } else this.check2(e);
            }
        },
        check2: function(e) {
            var o = getCurrentPages(), a = o[o.length - 1], s = e, i = this.data.detail;
            if (1 == i.type) {
                for (var n = 0; n < i.option_str.length; n++) i.option_str[n].flage = !1;
                i.option_str[s].flage = !0;
            } else i.option_str[s].flage = !i.option_str[s].flage;
            this.setData({
                detail: i
            });
            for (var r, l = [], u = 0; u < i.option_str.length; u++) i.option_str[u].flage && (l = l.concat(i.option_str[u].option));
            0 != l.length && a.setData((t(r = {}, "items2[".concat(this.data.num, "].subject_log.my_answer"), l), 
            t(r, "items2[".concat(this.data.num, "].is_correct"), 1), r));
            console.log(a.data.items2, "执行了该方法");
        },
        watch1: function(t, e) {
            console.log("nnnnnn", t), console.log("oooooo", e), this.setData({
                option_str: []
            });
            var o = getCurrentPages(), a = o[o.length - 1];
            if (console.log("yyuuyuyuyu", a.data.typeitemsss), 2 == a.data.typeitemsss) {
                console.log("666666666666666", a.data.typeitemsss), this.closeVague();
                var s = this.data.detail.option_str;
                console.log(s, "xxx");
                for (var i = 0; i < s.length; i++) 1 == s[i].is_correct && (s[i].dui = !0);
                this.setData({
                    option_str: s
                });
            } else if (console.log("uuuuuuuuuuuuuu", this.data), this.data.isSubmit && this.data.my_answer.length > 0) {
                this.closeVague();
                var n = this.data.my_answer, r = this.data.detail.option_str;
                if (console.log(r, "xxx"), this.data.detail.subject_log) for (var l = 0; l < r.length; l++) {
                    1 == r[l].is_correct && (r[l].dui = !0);
                    for (var u = 0; u < n.length; u++) r[l].option == n[u] && (1 == r[l].is_correct ? r[l].dui = !0 : r[l].cuo = !0);
                }
                this.setData({
                    option_str: r
                });
            }
        },
        watch: function(t, e) {
            if (console.log("nnnnnn", t), console.log("oooooo", e), this.setData({
                option_str: []
            }), console.log("88uyyyyyyyyyyyyyyyyyyyyy", t, "newDate", e), t) {
                this.closeVague();
                var o = this.data.my_answer, a = this.data.detail.option_str;
                console.log(a, "xxx");
                for (var s = 0; s < a.length; s++) {
                    1 == a[s].is_correct && (a[s].dui = !0);
                    for (var i = 0; i < o.length; i++) a[s].option == o[i] && (1 == a[s].is_correct ? a[s].dui = !0 : a[s].cuo = !0);
                }
                this.setData({
                    option_str: a,
                    isSubmit: !0
                });
            }
        },
        closeVague: function() {
            var t = getCurrentPages();
            t[t.length - 1].setData({
                vague: !1
            });
        }
    }
});