Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../@babel/runtime/helpers/classCallCheck"), t = require("../@babel/runtime/helpers/createClass"), i = function() {
    function i() {
        e(this, i), this.cache = void 0, this.cache = {};
    }
    return t(i, [ {
        key: "on",
        value: function(e, t) {
            (this.cache[e] || (this.cache[e] = [])).push(t);
        }
    }, {
        key: "once",
        value: function(e, t) {
            this.on(e, function i() {
                this.off(e, i), t.apply(this, arguments);
            });
        }
    }, {
        key: "off",
        value: function(e, t) {
            if (t) {
                var i = this.cache[e];
                if (i) for (var a = 0; a < i.length; a++) if (i[a] == t) {
                    i.splice(a, 1);
                    break;
                }
            } else delete this.cache[e];
        }
    }, {
        key: "emit",
        value: function(e) {
            for (var t = this, i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), c = 1; c < i; c++) a[c - 1] = arguments[c];
            var r = this.cache[e];
            r && r.length > 0 && r.forEach(function(e) {
                e.apply(t, a);
            });
        }
    } ]), i;
}();

exports.default = i;