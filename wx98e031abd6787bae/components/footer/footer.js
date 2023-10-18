getApp();

var e = require("../../api/api").Api;

Component({
    properties: {
        num: {
            type: Number,
            value: 0
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
            var e = getCurrentPages();
            e[e.length - 1].next();
        },
        jiao: function() {
            var e = getCurrentPages();
            e[e.length - 1].jiao();
        }
    }
});