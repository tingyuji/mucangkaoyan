var t = require("../../@babel/runtime/helpers/defineProperty"), a = getApp();

Component({
    properties: {
        index: {
            type: Number,
            value: 0,
            observer: "watchIndex"
        },
        detail: {
            type: Object,
            value: {},
            observer: "watch1"
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
        my_answer_c: "",
        subjectInfo: {},
        ti: !1,
        domain: a.domain
    },
    lifetimes: {
        show: function() {
            console.log("sssssssss");
        },
        ready: function() {
            console.log("rrrrrrrrrrrrrrr");
        },
        attached: function() {
            console.log("wewewewewe");
        },
        detached: function() {
            console.log("abababababaabab");
        }
    },
    methods: {
        watchIndex: function(t, a) {
            this.setData({
                tabid: t
            });
        },
        watch1: function(t, a) {
            console.log(t, "date677776736476346367364"), this.setData({
                tabid: 0
            }), this.get_mk_subject_info(t.subject_id, t.report_id);
        },
        get_mk_subject_info: function(t, a) {
            var e = this;
            wx.$request(wx.$api.mk_subject_info, {
                subject_id: t,
                report_id: a
            }).then(function(t) {
                var a, s;
                t.mk_ask.forEach(function(t) {
                    return t.flage = !1;
                }), console.log(t), e.setData({
                    subjectInfo: t,
                    fen: (null === (a = t.mk_ask[e.data.index].mk_answer_ask_log) || void 0 === a ? void 0 : a.fraction) || "",
                    my_answer_c: (null === (s = t.mk_ask[e.data.index].mk_answer_ask_log) || void 0 === s ? void 0 : s.answer_content) || ""
                });
            });
        },
        qie: function(t) {
            var a, e, s = t.currentTarget.dataset.index;
            this.data.fen2[s] && this.data.fen2[s], this.setData({
                tabid: s,
                fen: (null === (a = this.data.subjectInfo.mk_ask[s].mk_answer_ask_log) || void 0 === a ? void 0 : a.fraction) || "",
                my_answer_c: (null === (e = this.data.subjectInfo.mk_ask[s].mk_answer_ask_log) || void 0 === e ? void 0 : e.answer_content) || ""
            });
            var n = getCurrentPages();
            n[n.length - 1].setData({
                tabid: s
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
            var a = t.currentTarget.dataset.index, e = this.data.tabid, s = this.data.detail;
            if (2 != this.data.type) {
                for (var n = 0; n < subjectInfo.mk_ask[e].option_str.length; n++) subjectInfo.mk_ask[e].option_str[n].flage = !1;
                subjectInfo.mk_ask[e].option_str[a].flage = !0, console.log(s, "exam3"), this.setData({
                    detail: s
                });
            } else this.check2(a, e);
        },
        check2: function(a, e) {
            for (var s, n = this.data.detail, o = 0; o < subjectInfo.mk_ask[e].option_str.length; o++) subjectInfo.mk_ask[e].option_str[o].flage = !1;
            subjectInfo.mk_ask[e].option_str[a].flage = !0, this.setData({
                detail: n
            });
            for (var i = [], c = 0; c < subjectInfo.mk_ask.length; c++) {
                i = i.concat({
                    answer: "",
                    fraction: subjectInfo.mk_ask[c].fraction,
                    correct_answer: subjectInfo.mk_ask[c].correct_answer
                });
                for (var r = 0; r < subjectInfo.mk_ask[c].option_str.length; r++) subjectInfo.mk_ask[c].option_str[r].flage && (i[c].answer = subjectInfo.mk_ask[c].option_str[r].option);
            }
            var d = getCurrentPages();
            d[d.length - 1].setData((t(s = {}, "items2[".concat(this.data.num, "].subject_log.my_answer"), i), 
            t(s, "items2[".concat(this.data.num, "].is_correct"), 1), s));
        },
        bindmy_answer: function(t) {
            console.log(t), this.setData({
                my_answer_c: t.detail.value
            });
        },
        flage: function() {
            this.data.detail;
            if (!this.data.my_answer_c) return wx.showToast({
                title: "请先作答后再对照答案打分",
                icon: "none"
            }), !1;
            this.setData(t({}, "subjectInfo.mk_ask[".concat(this.data.tabid, "].flage"), !this.data.subjectInfo.mk_ask[this.data.tabid].flage));
        },
        watch: function(t, a) {
            if (this.setData({
                option_str: []
            }), console.log(t, a, "exam3"), t) if (3 == this.data.detail.type) {
                var e = this.data.my_answer, s = this.data.subjectInfo.mk_ask;
                console.log(s);
                for (var n = 0; n < s.length; n++) for (var o = 0; o < s[n].option_str.length; o++) s[n].option_str[o].dui = !1, 
                s[n].option_str[o].cuo = !1, 1 == s[n].option_str[o].is_correct ? s[n].option_str[o].dui = !0 : 0 != e.length && 2 == s[n].option_str[o].is_correct && e[n].answer == s[n].option_str[o].option && (s[n].option_str[o].cuo = !0);
                this.setData({
                    option_str: s
                });
            } else {
                var i = this.data.my_answer;
                this.setData({
                    fen: i[0],
                    fen2: i
                });
            }
        },
        sure: function() {
            var a = (s = getCurrentPages())[s.length - 1];
            if (console.log(a.data.questionList), console.log(a.data.subjectInfo), this.data.my_answer_c) if (this.data.subjectInfo.mk_ask[this.data.tabid].flage) if (0 != this.data.fen.length) {
                if (this.data.fen > Number(this.data.subjectInfo.mk_ask[this.data.tabid].fraction)) wx.showToast({
                    title: "自评分不能超过题目参考分",
                    icon: "none"
                }); else if (this.setData(t({}, "fen2.".concat(this.data.tabid), this.data.fen)), 
                2 == this.data.type) {
                    a = (s = getCurrentPages())[s.length - 1];
                    for (var e, s, n = [], o = 0; o < this.data.subjectInfo.mk_ask.length; o++) n = n.concat({
                        fraction: this.data.subjectInfo.mk_ask[o].fraction
                    });
                    a.setData((t(e = {}, "items2[".concat(this.data.num, "].fen2"), this.data.fen2), 
                    t(e, "items2[".concat(this.data.num, "].fraction"), n), t(e, "items2[".concat(this.data.num, "].is_correct"), 1), 
                    e)), this.mk_submit_subject_big(this.data.subjectInfo.mk_ask[this.data.tabid].id, this.data.fen, this.data.my_answer_c, this.data.detail.report_id);
                }
            } else wx.showToast({
                title: "请输入分数",
                icon: "none"
            }); else wx.showToast({
                title: "请先查看参考答案",
                icon: "none"
            }); else wx.showToast({
                title: "请输入答案",
                icon: "none"
            });
        },
        mk_submit_subject_big: function(t, a, e, s) {
            var n = this;
            wx.$request(wx.$api.mk_submit_subject_big, {
                ask_id: t,
                fraction: a,
                answer_content: e,
                report_id: s
            }).then(function(t) {
                var s, o, i = n.data.subjectInfo, c = {
                    fraction: a,
                    answer_content: e
                };
                (i.mk_ask[n.data.tabid].mk_answer_ask_log = c, n.setData({
                    subjectInfo: i
                }), console.log(n.data.subjectInfo, "8889898989ddddddd"), n.data.subjectInfo.mk_ask.length > n.data.tabid + 1) && n.setData({
                    tabid: n.data.tabid += 1,
                    fen: (null === (s = n.data.subjectInfo.mk_ask[n.data.tabid].mk_answer_ask_log) || void 0 === s ? void 0 : s.fraction) || "",
                    my_answer_c: (null === (o = n.data.subjectInfo.mk_ask[n.data.tabid].mk_answer_ask_log) || void 0 === o ? void 0 : o.answer_content) || ""
                });
            }).catch(function(t) {
                var a, e;
                (console.log("ccccccccccccccccccccc"), n.data.subjectInfo.mk_ask.length > n.data.tabid + 1) && n.setData({
                    tabid: n.data.tabid += 1,
                    fen: (null === (a = n.data.subjectInfo.mk_ask[n.data.tabid].mk_answer_ask_log) || void 0 === a ? void 0 : a.fraction) || "",
                    my_answer_c: (null === (e = n.data.subjectInfo.mk_ask[n.data.tabid].mk_answer_ask_log) || void 0 === e ? void 0 : e.answer_content) || ""
                });
            });
        },
        bindti: function() {
            for (var t = getCurrentPages(), a = t[t.length - 1], e = [], s = 0; s < this.data.subjectInfo.mk_ask.length; s++) this.data.fen2[s] && (e = e.concat(1));
            e.length == this.data.subjectInfo.mk_ask.length ? a.submit() : wx.showToast({
                title: "全部确定才能提交哟",
                icon: "none"
            });
        }
    }
});