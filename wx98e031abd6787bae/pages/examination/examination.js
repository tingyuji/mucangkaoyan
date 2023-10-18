Page({
    data: {
        id: "",
        timer: null,
        items: "",
        num: 0,
        detail: "",
        daid: "",
        time: "",
        tabid: 0
    },
    onLoad: function(t) {
        this.setData({
            id: t.id,
            time: t.time
        }), this.init(), this.minReturn(60 * Number(this.data.time));
    },
    init: function() {
        var t = this, e = {
            question_id: wx.$cache.get("question_id"),
            curriculum_id: this.data.id,
            school_id: wx.$cache.get("schoolid"),
            major_id: wx.$cache.get("majorid")
        };
        wx.$http.post(wx.$get.add_assessment_answer_card, e).then(function(e) {
            console.log(e, "创建答题卡"), t.setData({
                daid: e
            }), t.chainit();
        });
    },
    chainit: function() {
        var t = this, e = {
            question_id: wx.$cache.get("question_id"),
            curriculum_id: this.data.id
        };
        wx.$http.post(wx.$get.my_assessment_answer_card, e).then(function(e) {
            console.log(e, "答题卡信息", e.card_json), t.setData({
                items: e.card_json
            }), t.detail();
        });
    },
    detail: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items[this.data.num].subject_id
        };
        wx.$http.post(wx.$get.assessment_subject_info, e).then(function(e) {
            console.log(e, "题目详情"), t.setData({
                detail: e
            });
        });
    },
    jiao: function() {
        for (var t = this, e = this.data.items, a = [], i = [], n = 0; n < e.length; n++) if (4 == e[n].type || 1 == e[n].type || 2 == e[n].type) console.log("1"), 
        a = a.concat("1"), (e[n].my_answer || e[n].score_fraction) && (i = i.concat("1"), 
        console.log(2)); else for (var o = 0; o < e[n].little_question_json.length; o++) a = a.concat("1"), 
        console.log(3), (e[n].little_question_json[o].my_answer || e[n].little_question_json[o].score_fraction) && (i = i.concat("1"), 
        console.log(4));
        var s = {
            answer_card_id: this.data.daid,
            card_json: JSON.stringify(this.data.items)
        };
        wx.showModal({
            title: "提示",
            content: "你还有".concat(a.length - i.length, "题未做完,确定交卷？"),
            success: function(e) {
                e.confirm ? wx.$http.post(wx.$get.submit_assessment_answer_card, s).then(function(e) {
                    console.log(e, "提交答题卡"), wx.redirectTo({
                        url: "/pages/examreport/examreport?id=".concat(t.data.id)
                    });
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    shang: function() {
        this.setData({
            num: this.data.num -= 1,
            tabid: 0
        }), this.detail();
    },
    next: function() {
        this.setData({
            num: this.data.num += 1,
            tabid: 0
        }), this.detail();
    },
    sure: function() {
        var t = this.data.detail.type, e = this.data.items;
        if (1 == t || 2 == t) {
            var a = this.selectComponent("#exam").data.detail.option_type, i = [];
            if (2 != a) {
                for (var n = this.selectComponent("#exam").data.detail.option_str, o = [], s = 0; s < n.length; s++) n[s].flage ? (i = i.concat(n[s].option), 
                o = o.concat(n[s].option)) : o = o.concat("空");
                e[this.data.num].array3 = o;
            }
            if (1 != a) {
                for (var c = this.selectComponent("#exam").data.detail.option_img, r = [], d = 0; d < c.length; d++) c[d].flage ? (i = i.concat(c[d].option), 
                r = r.concat(c[d].option)) : r = r.concat("空");
                e[this.data.num].array4 = r;
            }
            e[this.data.num].my_answer = i.toString(), this.setData({
                items: e
            });
        } else if (4 == t || 6 == t) {
            var l = this.selectComponent("#exam2").data.fen;
            e[this.data.num].score_fraction = l, this.setData({
                items: e
            });
        } else if (3 == t) {
            for (var m = "", h = this.selectComponent("#exam3").data.tabid, u = this.selectComponent("#exam3").data.detail.little_question_json[h].option_str, f = this.selectComponent("#exam3").data.detail.little_question_json[h].option_img, _ = 0; _ < u.length; _++) u[_].flage && (m = u[_].option);
            for (var g = 0; g < f.length; g++) f[g].flage && (m = f[g].option);
            e[this.data.num].little_question_json[h].my_answer = m, this.setData({
                items: e
            });
        } else if (5 == t) {
            var p = this.selectComponent("#exam3").data.tabid, x = this.selectComponent("#exam3").data.fen;
            e[this.data.num].little_question_json[p].score_fraction = x, this.setData({
                items: e
            });
        }
    },
    minReturn: function(t) {
        var e = this, a = this.data.timer;
        a = setInterval(function() {
            t--;
            var i = e.formatSeconds(t);
            wx.setNavigationBarTitle({
                title: i
            }), e.setData({
                timer: a,
                time: t
            }), t <= 0 && clearInterval(e.data.timer);
        }, 1e3);
    },
    formatBit: function(t) {
        return (t = +t) > 9 ? t : "0" + t;
    },
    formatSeconds: function(t) {
        var e = Math.floor(t % 3600);
        return this.formatBit(Math.floor(t / 3600)) + ":" + this.formatBit(Math.floor(e / 60)) + ":" + this.formatBit(t % 60);
    },
    onReady: function() {},
    onShow: function() {
        this.data.time;
    },
    onHide: function() {
        console.log("3");
    },
    onUnload: function() {
        clearInterval(this.data.timer), console.log(4);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: wx.$cache.get("fx").title,
            imageUrl: wx.$cache.get("fx").img,
            path: "/pages/index/index?pid=".concat(wx.$cache.get("member_id"))
        };
    }
});