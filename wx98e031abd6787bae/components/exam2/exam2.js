var e = require("../../@babel/runtime/helpers/defineProperty");

getApp();

Component({
    properties: {
        detail: {
            type: Object,
            value: {}
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
    data: {
        flage: !1,
        fen: ""
    },
    methods: {
        flage: function() {
            this.setData({
                flage: !this.data.flage
            });
        },
        bindchinge: function(e) {
            this.setData({
                fen: e.detail.value
            });
        },
        sure: function() {
            if (0 != this.data.fen.length) if (this.data.fen > this.data.detail.fraction_total) wx.showToast({
                title: "所填分数有误，请重新填写",
                icon: "none"
            }); else {
                var t, a = getCurrentPages(), i = a[a.length - 1];
                if (2 == this.data.type) i.setData((e(t = {}, "items2[".concat(this.data.num, "].fen"), this.data.fen), 
                e(t, "items2[".concat(this.data.num, "].is_correct"), 1), t)); else i.submit();
            } else wx.showToast({
                title: "请输入分数",
                icon: "none"
            });
        }
    }
});