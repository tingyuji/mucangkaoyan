var o = require("../../@babel/runtime/helpers/defineProperty"), t = (getApp(), require("../../api/api").Api);

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
        showDa: {
            type: Boolean,
            value: !1
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
        option_json: [],
        domain: t.domain,
        subjectInfo: {}
    },
    moved: function() {},
    methods: {
        get_mk_subject_info: function(o, t) {
            var e = this;
            console.log("787883487yuuyuyere"), console.log("787883487yuuyuyere", t), console.log("787883487yuuyuyere"), 
            wx.$request(wx.$api.mk_subject_info, {
                subject_id: o,
                report_id: t
            }).then(function(o) {
                console.log("1111212121212"), console.log(o), console.log("1111212121212"), e.setData({
                    subjectInfo: o
                });
            });
        },
        check: function(o) {
            if (!this.data.submit) {
                var t = o.currentTarget.dataset.index;
                if (2 != this.data.type) {
                    var e = this.data.detail;
                    if (1 == e.type) {
                        for (var i = 0; i < e.option_json.length; i++) e.option_json[i].is_choice = 2;
                        e.option_json[t].is_choice = 1;
                    } else e.option_json[t].is_choice = 1 == e.option_json[t].is_choice ? 2 : 1, console.log(e.option_json[t].is_choice, "adsfasdfafasdfafasfadsf");
                    console.log(e.option_json), this.triggerEvent("optionJson", e.option_json), this.setData({
                        detail: e
                    });
                } else this.check2(t);
            }
        },
        check2: function(t) {
            var e = getCurrentPages(), i = e[e.length - 1], s = t, n = this.data.detail;
            if (1 == n.type) {
                for (var a = 0; a < n.option_json.length; a++) n.option_json[a].is_choice = 2;
                n.option_json[s].is_choice = 1;
            } else n.option_json[s].is_choice = 1 == n.option_json[s].is_choice ? 2 : 1;
            this.setData({
                detail: n
            }), console.log("222222222222222"), console.log(this.data.detail), console.log("33333333333333"), 
            this.triggerEvent("optionJson", n.option_json);
            for (var c, l = [], r = 0; r < n.option_json.length; r++) 1 == n.option_json[r].is_choice && (l = l.concat(n.option_json[r].content));
            0 != l.length && i.setData((o(c = {}, "items2[".concat(this.data.num, "].subject_log.my_answer"), l), 
            o(c, "items2[".concat(this.data.num, "].is_correct"), 1), c));
            console.log("12111111111", i.data.items2, "7777777777777777777"), console.log("888888888888888", i.data.questionList, "执行了该方法");
        },
        watch1: function(o, t) {
            if (console.log(o, "date555555555555555555"), this.get_mk_subject_info(o.subject_id, o.report_id), 
            this.setData({
                option_json: []
            }), this.data.isOnExam && this.data.isSubmit) {
                this.closeVague();
                var e = this.data.my_answer, i = this.data.detail.option_json;
                console.log(i, "xxx");
                for (var s = 0; s < i.length; s++) {
                    1 == i[s].is_correct && (i[s].dui = !0);
                    for (var n = 0; n < e.length; n++) i[s].option == e[n] && (1 == i[s].is_correct ? i[s].dui = !0 : i[s].cuo = !0);
                }
                this.setData({
                    option_json: i
                });
            }
        },
        watch: function(o, t) {
            if (this.setData({
                option_json: []
            }), console.log(o, "newDate", t), o) {
                this.closeVague();
                var e = this.data.my_answer, i = this.data.detail.option_json;
                console.log(i, "xxx");
                for (var s = 0; s < i.length; s++) {
                    1 == i[s].is_correct && (i[s].dui = !0);
                    for (var n = 0; n < e.length; n++) i[s].option == e[n] && (1 == i[s].is_correct ? i[s].dui = !0 : i[s].cuo = !0);
                }
                this.setData({
                    option_json: i,
                    isSubmit: !0
                });
            }
        },
        closeVague: function() {
            var o = getCurrentPages();
            o[o.length - 1].setData({
                vague: !1
            });
        }
    }
});