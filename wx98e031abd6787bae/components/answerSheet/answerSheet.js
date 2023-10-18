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
            value: {}
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
            this.setData({
                show: !1
            });
        },
        daiao: function(e) {
            var t = e.currentTarget.dataset.index, a = getCurrentPages(), i = a[a.length - 1];
            this.setData({
                show: !1
            }), i.setData({
                num: t - 1,
                submit: !1
            }), i.tidetail();
        }
    }
});