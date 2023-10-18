getApp();

var e = require("../../api/api").Api;

Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        yejian: {
            type: Boolean,
            value: !1
        },
        itemslength: {
            type: Number,
            value: 0
        },
        flage: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        domain: e.domain
    },
    methods: {
        shang: function() {
            var e = getCurrentPages();
            e[e.length - 1].shang();
        },
        next: function() {
            var e = getCurrentPages(), t = e[e.length - 1];
            t.submit(), t.next();
        },
        jiao: function() {
            this.triggerEvent("submit");
        }
    }
});