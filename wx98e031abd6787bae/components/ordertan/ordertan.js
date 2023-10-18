Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        idd: {
            type: Number,
            value: ""
        },
        goods_name: {
            type: String,
            value: ""
        },
        tips: {
            type: String,
            value: ""
        }
    },
    data: {
        wx: ""
    },
    attached: function() {
        this.setData({
            wx: wx.$cache.get("can").goods_wx
        });
    },
    methods: {
        close: function() {
            this.setData({
                show: !1
            });
        },
        copy: function() {
            console.log("11", this.data.idd);
            wx.setClipboardData({
                data: wx.$cache.get("can").goods_wx,
                success: function(t) {
                    console.log(t, "dddd"), wx.getClipboardData({
                        success: function(t) {
                            console.log(t.data);
                        }
                    });
                }
            });
        }
    }
});