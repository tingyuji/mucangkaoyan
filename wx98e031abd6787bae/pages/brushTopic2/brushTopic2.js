var t = getApp();

Page({
    data: {
        type: 1,
        items: [],
        num: 0,
        detail: "",
        submit: !0,
        tabid: 0
    },
    onLoad: function(e) {
        e.num && this.setData({
            num: Number(e.num)
        }), this.setData({
            items: t.items,
            items2: t.items2
        }), this.tidetail();
    },
    gobaocuo: function() {
        t.title = this.data.detail.subject_str, wx.navigateTo({
            url: "/pages/mistake/mistake?id=" + this.data.items[this.data.num]
        });
    },
    tidetail: function() {
        var t = this, e = {
            member_id: wx.$cache.get("member_id"),
            subject_id: this.data.items[this.data.num]
        };
        console.log("在错题本里"), wx.$http.get(wx.$get.subject_info, e).then(function(e) {
            console.log(e, "题目解析");
            var a = "";
            4 == e.type || 6 == e.type ? a = t.data.items2[t.data.num].fen || 0 : 1 == e.type || 2 == e.type || 3 == e.type ? a = 0 != t.data.items2[t.data.num].subject_log.length ? t.data.items2[t.data.num].subject_log.my_answer : [] : 5 == e.type && (a = t.data.items2[t.data.num].fen), 
            t.setData({
                my_answer: a,
                detail: e,
                isOnExam: !0
            });
        });
    },
    next: function() {
        console.log(), this.setData({
            num: this.data.num += 1
        }), this.tidetail();
    },
    shang: function() {
        this.setData({
            num: this.data.num -= 1
        }), this.tidetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
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