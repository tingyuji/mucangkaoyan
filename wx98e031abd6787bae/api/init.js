var e = require("../@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = e(require("./http")), r = require("./api"), u = e(require("./cache.js"));

var a = function() {
    wx.wxp = {}, wx.$http = t.default, wx.$get = r.$get, wx.$post = r.$post, wx.$cache = u.default;
};

exports.default = a;