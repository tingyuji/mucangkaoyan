var t = require("../../@babel/runtime/helpers/defineProperty"), e = getApp();

Component({
    properties: {
        detail: {
            type: Object,
            value: {}
        },
        items: {
            type: Object,
            value: {}
        },
        submit: {
            type: Boolean,
            value: !1,
            observer: "watch"
        },
        my_answer: {
            type: Object,
            value: []
        },
        num: {
            type: Number,
            value: 0
        },
        type: {
            type: Number,
            value: 0
        },
        tabid: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabid: 0,
        fen: "",
        fen2: {},
        ti: !1,
        domain: e.domain
    },
    methods: {
        qie: function(t) {
            var e = t.currentTarget.dataset.index, a = "";
            this.data.fen2[e] && (a = this.data.fen2[e]), this.setData({
                tabid: e,
                fen: a
            });
            var i = getCurrentPages();
            i[i.length - 1].setData({
                tabid: e
            });
        },
        bindchinge: function(t) {
            this.setData({
                fen: t.detail.value
            });
        },
        bindtis: function() {
            this.setData({
                ti: !this.data.ti
            });
        },
        check: function(t) {
            var e = t.currentTarget.dataset.index, a = this.data.tabid, i = this.data.detail;
            if (2 != this.data.type) {
                for (var n = 0; n < i.little_question_json[a].option_str.length; n++) i.little_question_json[a].option_str[n].flage = !1;
                i.little_question_json[a].option_str[e].flage = !0, console.log(i, "exam3"), this.setData({
                    detail: i
                });
            } else this.check2(e, a);
        },
        check2: function(e, a) {
            for (var i, n = this.data.detail, s = 0; s < n.little_question_json[a].option_str.length; s++) n.little_question_json[a].option_str[s].flage = !1;
            n.little_question_json[a].option_str[e].flage = !0, this.setData({
                detail: n
            });
            for (var o = [], l = 0; l < n.little_question_json.length; l++) {
                o = o.concat({
                    answer: "",
                    fraction: n.little_question_json[l].fraction,
                    correct_answer: n.little_question_json[l].correct_answer
                });
                for (var r = 0; r < n.little_question_json[l].option_str.length; r++) n.little_question_json[l].option_str[r].flage && (o[l].answer = n.little_question_json[l].option_str[r].option);
            }
            var d = getCurrentPages();
            d[d.length - 1].setData((t(i = {}, "items2[".concat(this.data.num, "].subject_log.my_answer"), o), 
            t(i, "items2[".concat(this.data.num, "].is_correct"), 1), i));
        },
        flage: function() {
            var e = this.data.detail;
            this.setData(t({}, "detail.little_question_json[".concat(this.data.tabid, "].flage"), !e.little_question_json[this.data.tabid].flage));
        },
        watch: function(t, e) {
            if (this.setData({
                option_str: []
            }), console.log(t, e, "exam3"), t) if (3 == this.data.detail.type) {
                var a = this.data.my_answer, i = this.data.detail.little_question_json;
                console.log(i);
                for (var n = 0; n < i.length; n++) for (var s = 0; s < i[n].option_str.length; s++) i[n].option_str[s].dui = !1, 
                i[n].option_str[s].cuo = !1, 1 == i[n].option_str[s].is_correct ? i[n].option_str[s].dui = !0 : 0 != a.length && 2 == i[n].option_str[s].is_correct && a[n].answer == i[n].option_str[s].option && (i[n].option_str[s].cuo = !0);
                this.setData({
                    option_str: i
                });
            } else {
                var o = this.data.my_answer;
                this.setData({
                    fen: o[0],
                    fen2: o
                });
            }
        },
        sure: function() {
            if (0 != this.data.fen.length) if (console.log(this.data.fen, this.data.detail.little_question_json[this.data.tabid].fraction), 
            this.data.fen > Number(this.data.detail.little_question_json[this.data.tabid].fraction)) wx.showToast({
                title: "所填分数有误，请重新填写",
                icon: "none"
            }); else {
                if (this.setData(t({}, "fen2.".concat(this.data.tabid), this.data.fen)), 2 == this.data.type) {
                    for (var e, a = getCurrentPages(), i = a[a.length - 1], n = [], s = 0; s < this.data.detail.little_question_json.length; s++) n = n.concat({
                        fraction: this.data.detail.little_question_json[s].fraction
                    });
                    i.setData((t(e = {}, "items2[".concat(this.data.num, "].fen2"), this.data.fen2), 
                    t(e, "items2[".concat(this.data.num, "].fraction"), n), t(e, "items2[".concat(this.data.num, "].is_correct"), 1), 
                    e));
                }
                console.log(this.data.fen2, "xxx", this.data.fen2[0], "x", this.data.fen2[1]);
            } else wx.showToast({
                title: "请输入分数",
                icon: "none"
            });
        },
        bindti: function() {
            for (var t = getCurrentPages(), e = t[t.length - 1], a = [], i = 0; i < this.data.detail.little_question_json.length; i++) this.data.fen2[i] && (a = a.concat(1));
            a.length == this.data.detail.little_question_json.length ? e.submit() : wx.showToast({
                title: "全部确定才能提交哟",
                icon: "none"
            });
        }
    }
});