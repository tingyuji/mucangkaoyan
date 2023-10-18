var t = require("../../@babel/runtime/helpers/defineProperty"), e = getApp(), a = require("../../api/api").Api;

Page({
    data: {
        itemss: [ {
            value: 1,
            name: "刷题",
            checked: "true"
        }, {
            value: 2,
            name: "背题"
        } ],
        nzidtype: !1,
        nzidsss: [],
        nzid: "",
        nkid: "",
        ntid: "",
        zid: "",
        kid: "",
        tid: "",
        vague: !1,
        submit: !1,
        card: !0,
        ye: !1,
        show: !1,
        tabid: 0,
        questionNumber: 0,
        items: [],
        num: 0,
        detail: "",
        type: 1,
        typeitemsss: 1,
        comment: [],
        subject: [],
        my_answer: [],
        daitem: [],
        items2: [],
        reque: !1,
        domain: a.domain
    },
    onLoad: function(t) {
        if (1 == t.type) {
            var a = JSON.parse(t.nzids);
            this.setData({
                nzidsss: a
            });
            for (var i = 0; i < a.length; i++) if (a[i].id == t.zid) {
                if (void 0 !== a[i + 1]) {
                    a[i + 1].id;
                    this.setData({
                        nzidtype: !0
                    });
                }
                break;
            }
            this.setData({
                num: Number(t.num),
                zid: t.zid,
                tid: t.tid,
                kid: t.kid,
                type: 1,
                questionNumber: Number(t.num)
            }), this.type1items(t.zid, t.tid, t.kid), this.record(t.zid, t.tid, t.kid), console.log(this.data.type, "tttyytytyttyyt", this.data.submit);
        }
        2 == t.type && (this.examination(t.tid), e.time1 = this.getNowTime(), this.setData({
            num: 0,
            type: 2,
            card: !1
        })), 3 == t.type && (this.setData({
            num: Number(t.num),
            zid: t.zid,
            tid: t.tid,
            kid: t.kid,
            type: 3,
            card: !1
        }), this.wrongTopic(t.zid, t.tid, t.kid)), 4 == t.type && (this.setData({
            num: 0,
            items: [ t.id ],
            submit: !0,
            type: 4,
            card: !1
        }), this.tidetail()), wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value);
        for (var e = this.data.itemss, a = 0, i = e.length; a < i; ++a) e[a].checked = e[a].value == t.detail.value;
        this.setData({
            itemss: e
        }), 1 == t.detail.value ? (console.log(this.data.my_answer.length, "dddddddddd"), 
        0 == this.data.my_answer.length ? this.setData({
            submit: !1,
            typeitemsss: 1
        }) : this.setData({
            submit: !0,
            typeitemsss: 1
        })) : 2 == t.detail.value && this.setData({
            submit: !0,
            typeitemsss: 2
        }), this.tidetail(), console.log(this.data.type), console.log(this.data.detail), 
        console.log(this.data.my_answer);
    },
    record: function(t, e, a) {
        var i = this, n = {
            library_id: e || "",
            course_id: a || "",
            chapter_id: t || ""
        };
        wx.$http.get(wx.$get.card_subject, n).then(function(t) {
            for (var e = t, a = [ {
                name: "单选题",
                children: []
            }, {
                name: "多选题",
                children: []
            }, {
                name: "阅读多问题",
                children: []
            }, {
                name: "翻译题",
                children: []
            }, {
                name: "分析题",
                children: []
            }, {
                name: "作文题",
                children: []
            } ], n = 0; n < e.length; n++) e[n].index = n + 1, 1 == e[n].type && (a[0].children = a[0].children.concat(t[n])), 
            2 == e[n].type && (a[1].children = a[1].children.concat(t[n])), 3 == e[n].type && (a[2].children = a[2].children.concat(t[n])), 
            4 == e[n].type && (a[3].children = a[3].children.concat(t[n])), 5 == e[n].type && (a[4].children = a[4].children.concat(t[n])), 
            6 == e[n].type && (a[5].children = a[5].children.concat(t[n]));
            i.setData({
                daitem: a
            }), console.log(a, "答题卡信息");
        });
    },
    type1items: function(t, e, a) {
        var i = this, n = {
            member_id: wx.$cache.get("member_id"),
            library_id: e || "",
            course_id: a || "",
            chapter_id: t || ""
        };
        wx.$http.get(wx.$get.subject_ids, n).then(function(t) {
            console.log(t, "章节列表进来的所有题id");
            var e = 0;
            t.forEach(function(t) {
                1 == t.is_subject_log && e++;
            }), console.log(e, "做题");
            for (var a = [], n = 0; n < t.length; n++) a = a.concat(t[n].id);
            i.setData({
                items: a
            }), i.tidetail();
        });
    },
    examination: function(t) {
        var e = this, a = {
            library_id: t
        };
        wx.$http.get(wx.$get.examination, a).then(function(t) {
            console.log(t, "考试列表");
            for (var a = t, i = [], n = [ {
                name: "单选题",
                children: []
            }, {
                name: "多选题",
                children: []
            }, {
                name: "阅读多问题",
                children: []
            }, {
                name: "翻译题",
                children: []
            }, {
                name: "分析题",
                children: []
            }, {
                name: "作文题",
                children: []
            } ], s = 0; s < a.length; s++) a[s].index = s + 1, a[s].subject_log = [], 1 == a[s].type && (n[0].children = n[0].children.concat(t[s])), 
            2 == a[s].type && (n[1].children = n[1].children.concat(t[s])), 3 == a[s].type && (n[2].children = n[2].children.concat(t[s])), 
            4 == a[s].type && (n[3].children = n[3].children.concat(t[s])), 5 == a[s].type && (n[4].children = n[4].children.concat(t[s])), 
            6 == a[s].type && (n[5].children = n[5].children.concat(t[s]));
            for (var o = 0; o < a.length; o++) i = i.concat(a[o].id);
            e.setData({
                items: i,
                items2: a,
                daitem: n
            }), console.log(n, "题卡信息", i, "items的信息", e.data.num, "num的信息"), e.tidetail();
        });
    },
    wrongTopic: function(t, e, a) {
        var i = this, n = 2;
        0 == t && (n = 1);
        var s = {
            library_ids: e || "",
            course_ids: a || "",
            chapter_ids: t || "",
            page: 1,
            page_size: 300,
            type: n
        };
        wx.$http.post(wx.$get.wrong_log_my, s).then(function(t) {
            console.log(t, "错题本所有id");
            for (var e = 0; e < t.length; e++) t[e].id || t.splice(e, 1);
            for (var a = [], n = 0; n < t.length; n++) a = a.concat(t[n].id);
            i.setData({
                items: a
            }), i.tidetail();
        });
    },
    tidetail: function() {
        var e = this, a = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items[this.data.num]
        };
        wx.$http.get(wx.$get.subject_info, a).then(function(a) {
            if (console.log(a, "题目解析"), a.right_percentage = parseInt(a.correct_num / a.total_num * 100), 
            1 == e.data.type && wx.$cache.get("answer") && e.setData({
                vague: !0
            }), a.subject_log && 1 == e.data.type) {
                console.log("zzzzzzzzz", a), e.setData({
                    detail: a
                });
                var i = [];
                3 == a.type || 5 == a.type ? (i = JSON.parse(a.subject_log.my_answer), console.log(i, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"), 
                e.setData({
                    my_answer: i,
                    submit: !0
                })) : (i = a.subject_log.my_answer.split(","), console.log("6666666666665656565656", a.subject_log.my_answer), 
                e.setData({
                    submit: !0,
                    my_answer: i
                }));
            }
            if (2 == e.data.type) {
                var n, s;
                if (1 == a.type || 2 == a.type) if (e.setData((t(n = {}, "items2[".concat(e.data.num, "].correct_answer"), a.correct_answer), 
                t(n, "items2[".concat(e.data.num, "].fraction_total"), a.fraction_total), n)), 0 != e.data.items2[e.data.num].subject_log.length) for (var o = 0; o < e.data.items2[e.data.num].subject_log.my_answer.length; o++) for (var c = 0; c < a.option_str.length; c++) e.data.items2[e.data.num].subject_log.my_answer[o] == a.option_str[c].option && (a.option_str[c].flage = !0);
                if (4 == a.type || 6 == a.type) e.setData((t(s = {}, "items2[".concat(e.data.num, "].correct_answer"), a.fraction_total), 
                t(s, "items2[".concat(e.data.num, "].fraction_total"), a.fraction_total), s)), e.data.items2[e.data.num].fen && (a.my_answer = e.data.items2[e.data.num].fen);
                3 != a.type && 5 != a.type || e.setData(t({}, "items2[".concat(e.data.num, "].my_answerlength"), a.little_question_json.length)), 
                e.setData(t({
                    detail: a
                }, "items2[".concat(e.data.num, "].type"), a.type));
            } else console.log("wwwwwwwwwww", a), console.log("wwwwwwwwwww1111", e.data.type), 
            a.iidddd = a.id, e.setData({
                detail: a
            });
            e.pinglist(), e.bilist();
        });
    },
    goye: function() {
        this.setData({
            ye: !this.data.ye
        }), this.data.ye ? wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#202020",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        }) : wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "white"
        });
    },
    show: function() {
        1 == this.data.type && this.record(this.data.zid, this.data.tid, this.data.kid), 
        this.setData({
            show: !0
        });
    },
    pinglist: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items[this.data.num],
            page: 1,
            page_size: 3
        };
        wx.$http.get(wx.$get.comment_list, e).then(function(e) {
            console.log(e, "评论列表"), t.setData({
                comment: e
            });
        });
    },
    zhan: function(t) {
        var e = this, a = t.currentTarget.dataset, i = a.id, n = a.type, s = {
            log_id: i,
            type: n
        };
        wx.$http.get(wx.$get.give_log, s).then(function(t) {
            console.log(t, "点赞"), 2 == n && e.pinglist(), 1 == n && e.bilist();
        });
    },
    gocomment: function() {
        wx.navigateTo({
            url: "/pages/comment/comment?id=".concat(this.data.items[this.data.num])
        });
    },
    bilist: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_ids: this.data.items[this.data.num],
            page: 1,
            page_size: 3
        };
        wx.$http.get(wx.$get.note_list, e).then(function(e) {
            console.log(e, "笔记列表"), t.setData({
                subject: e,
                reque: !1
            });
        });
    },
    cha: function() {
        wx.navigateTo({
            url: "/pages/quanbj/quanbj?id=" + this.data.items[this.data.num]
        });
    },
    gobaocuo: function() {
        e.title = this.data.detail.subject_str, wx.navigateTo({
            url: "/pages/mistake/mistake?id=" + this.data.items[this.data.num]
        });
    },
    gomynote: function() {
        wx.navigateTo({
            url: "/pages/myNotes/myNotes?id=" + this.data.items[this.data.num]
        });
    },
    gonewnote: function() {
        wx.navigateTo({
            url: "/pages/newnote/newnote?id=" + this.data.items[this.data.num]
        });
    },
    submit: function() {
        if (1 == this.data.detail.type || 2 == this.data.detail.type) {
            for (var t = this.selectComponent("#exam").data.detail, e = [], a = [], i = 2, n = 0; n < t.option_str.length; n++) 1 == t.option_str[n].is_correct && (a = a.concat(t.option_str[n].option)), 
            t.option_str[n].flage && (e = e.concat(t.option_str[n].option));
            if (e.length <= 1 && 2 == this.data.detail.type) return void wx.showToast({
                title: "此题为多选题",
                icon: "none"
            });
            if (0 == e.length) return void wx.showToast({
                title: "请选择答案",
                icon: "none"
            });
            e.toString() == a.toString() && (i = 1), this.submitfang(e, i, "");
        }
        if (4 == this.data.detail.type || 6 == this.data.detail.type) {
            var s = this.selectComponent("#exam2").data.fen;
            this.submitfang(s, 1, "");
        }
        if (3 == this.data.detail.type) {
            for (var o = [], c = 2, d = [], r = [], l = this.selectComponent("#exam3").data.detail, h = 0; h < l.little_question_json.length; h++) {
                d = d.concat(l.little_question_json[h].correct_answer), o = o.concat([ {
                    answer: ""
                } ]);
                for (var u = 0; u < l.little_question_json[h].option_str.length; u++) l.little_question_json[h].option_str[u].flage && (r = r.concat(l.little_question_json[h].option_str[u].option), 
                o[h].answer = l.little_question_json[h].option_str[u].option);
            }
            if (d.length != r.length) return void wx.showToast({
                title: "每个小问的答案都要选择",
                icon: "none"
            });
            d.toString() == r.toString() && (c = 1), o = JSON.stringify(o), this.submitfang(o, c, "");
        }
        if (5 == this.data.detail.type) {
            var m = this.selectComponent("#exam3").data, g = JSON.stringify(m.fen2);
            this.submitfang(g, 1, "");
        }
    },
    submitfang: function(t, e, a) {
        var i = this;
        console.log("888888888888777777777777777777777rrrrrrrrrrrrrrr", this.data.detail), 
        1 == e ? this.setData({
            "detail.is_wrong": 2
        }) : this.setData({
            "detail.is_wrong": 1
        }), this.setData({
            reque: !0
        });
        var n = {
            subject_id: this.data.items[this.data.num],
            my_answer: t.toString(),
            is_correct: e,
            little_question_json: a,
            wid: 2
        };
        wx.$http.get(wx.$get.make_question, n).then(function(a) {
            if (console.log(a, "做题"), 1 == i.data.type && i.data.num > i.data.questionNumber && i.setData({
                questionNumber: i.data.num
            }), wx.$cache.get("she") && 1 == i.data.type && 1 == e) {
                if (i.data.num + 1 != i.data.items.length) return void i.next();
                wx.showToast({
                    title: "没有下一题了!",
                    icon: "none"
                });
            }
            wx.$cache.get("yin") && 1 == i.data.type && (1 == e && i.zheng(), 2 == e && i.cuowu()), 
            3 == i.data.detail.type || 5 == i.data.detail.type ? i.setData({
                submit: !0,
                my_answer: JSON.parse(t)
            }) : i.setData({
                submit: !0,
                my_answer: t
            }), i.setData({
                reque: !1
            });
        }).catch(function(t) {
            i.setData({
                reque: !1
            });
        });
    },
    goxiaa: function(t) {
        console.log(t.currentTarget.dataset.index), console.log(this.data.detail.subject_knowledge), 
        e.globalData.content = this.data.detail.subject_knowledge[t.currentTarget.dataset.index].content, 
        wx.navigateTo({
            url: "/pages/waparse/waparse?title=" + this.data.detail.subject_knowledge[t.currentTarget.dataset.index].title + "&is_url=1"
        });
    },
    nextzhang: function() {
        var t = this;
        wx.showModal({
            title: "下一章",
            content: "是否确认进入下一章节？",
            success: function(e) {
                if (e.confirm) {
                    for (var a = t.data.zid, i = t.data.kid, n = t.data.tid, s = t.data.nzidsss, o = JSON.stringify(s), c = 0; c < s.length; c++) if (s[c].id == a) {
                        var d = s[c + 1].id;
                        if (void 0 !== d) {
                            var r = d, l = t.data.type;
                            wx.redirectTo({
                                url: "/pages/brushTopic/brushTopic?zid=".concat(r, "&kid=").concat(i, "&tid=").concat(n, "&type=").concat(l, "&num=0&nzids=").concat(o)
                            });
                        } else t.setData({
                            nzidtype: !1
                        });
                        break;
                    }
                } else e.cancel && console.log("用户点击取消");
            }
        });
    },
    next: function() {
        this.setData({
            my_answer: []
        }), this.data.itemss[1].checked ? this.setData({
            num: this.data.num += 1,
            submit: !0
        }) : this.setData({
            num: this.data.num += 1,
            submit: !1
        }), this.gun(), this.tidetail();
    },
    shang: function() {
        this.data.itemss[1].checked || 3 == this.data.type ? this.setData({
            num: this.data.num -= 1,
            submit: !0
        }) : this.setData({
            num: this.data.num -= 1,
            submit: !1
        }), this.gun(), this.tidetail();
    },
    zheng: function() {
        var t = wx.createInnerAudioContext();
        t.src = wx.$cache.get("can").correct_music, t.play(), console.log("1");
    },
    cuowu: function() {
        console.log("cuo");
        var t = wx.createInnerAudioContext();
        t.src = wx.$cache.get("can").error_music, console.log(wx.$cache.get("can").error_music), 
        t.play(), console.log("2");
    },
    jiao: function() {
        for (var t = this, a = this.data.items2, i = [], n = 0; n < a.length; n++) 1 != a[n].is_correct && (i = i.concat(1));
        var s = 0 == i.length ? "你确定要交卷吗？" : "你还有" + i.length + "道题没做,确定要交卷吗？";
        wx.showModal({
            title: "提示",
            content: s,
            success: function(i) {
                if (i.confirm) {
                    e.items2 = a, e.items = t.data.items, e.time2 = t.getNowTime();
                    var n = {
                        subject_data: t.data.items2,
                        wid: 2
                    };
                    wx.$http.get(wx.$get.make_wrong_log, n).then(function(t) {
                        console.log(t, "加入错题11111111");
                    }), wx.redirectTo({
                        url: "/pages/examreport/examreport"
                    });
                }
            }
        }), console.log(this.data.items2, "交卷的qqq题");
    },
    getNowTime: function() {
        var t;
        return t = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate() + " " + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()) + ":" + (new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds()), 
        console.log(t), t;
    },
    addjia: function(t) {
        var e = this;
        if (2 == t.currentTarget.dataset.flage) {
            var a = {
                subject_id: this.data.items[this.data.num]
            };
            wx.$http.get(wx.$get.wrong_log_add, a).then(function(t) {
                console.log(t, "加入错题"), e.setData({
                    "detail.is_wrong": 1
                });
            });
        } else {
            var i = {
                subject_id: this.data.items[this.data.num]
            };
            wx.$http.get(wx.$get.wrong_log_del, i).then(function(t) {
                console.log(t, "移除错题"), 3 == e.data.type ? e.setData({
                    "detail.is_wrong": 4
                }) : e.setData({
                    "detail.is_wrong": 2
                }), wx.showToast({
                    title: "移除成功",
                    icon: "success",
                    duration: 2e3,
                    complete: function(t) {}
                });
            });
        }
    },
    gun: function() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    tidetail2: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items[this.data.num]
        };
        wx.$http.get(wx.$get.subject_info, e).then(function(e) {
            console.log(e, "题目解析"), t.setData({
                "detail.comment_num": e.comment_num,
                "detail.note_num": e.note_num
            }), t.pinglist(), t.bilist();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return "button" === t.from ? {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/brushTopic/brushTopic?type=4&pid=".concat(wx.$cache.get("member_id"), "&id=").concat(this.data.items[this.data.num])
        } : {
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