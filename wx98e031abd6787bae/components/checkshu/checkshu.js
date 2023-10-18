var t = require("../../@babel/runtime/helpers/defineProperty"), a = (getApp(), require("../../api/api").Api);

Component({
    properties: {
        mask: {
            type: Boolean,
            value: !1
        },
        shulist: {
            type: Array,
            value: ""
        },
        shuid: {
            type: Array,
            value: ""
        }
    },
    data: {
        shuid: [],
        domain: a.domain
    },
    methods: {
        noMask: function() {
            this.setData({
                mask: !1
            });
        },
        check: function(a) {
            var e = a.currentTarget.dataset.index, s = a.currentTarget.dataset.flage, i = a.currentTarget.dataset.id, r = this.data.shuid;
            if (this.setData(t({}, "shulist[".concat(e, "].flage"), !this.data.shulist[e].flage)), 
            s) r = r.concat(i), this.setData({
                shuid: r
            }), console.log(this.data.shuid); else {
                var n = r.filter(function(t) {
                    return t !== i;
                });
                this.setData({
                    shuid: n
                }), console.log(this.data.shuid);
            }
        },
        sure: function() {
            this.noMask();
            var t = getCurrentPages(), a = t[t.length - 1];
            a.setData({
                shuid: this.data.shuid
            }), a.init();
        }
    }
});