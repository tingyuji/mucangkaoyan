var t = function(t) {
    return (t = t.toString())[1] ? t : "0".concat(t);
};

module.exports = {
    formatTime: function(n) {
        var e = n.getFullYear(), o = n.getMonth() + 1, r = n.getDate(), a = n.getHours(), c = n.getMinutes(), u = n.getSeconds();
        return "".concat([ e, o, r ].map(t).join("/"), " ").concat([ a, c, u ].map(t).join(":"));
    },
    throttle: function(t, n) {
        var e = Date.now();
        return function() {
            var o = arguments, r = Date.now();
            r - e > n && (t.apply(this, o), e = Date.now());
        };
    }
};