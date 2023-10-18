Component({
    properties: {
        title: {
            type: String,
            value: "标题"
        },
        desc: {
            type: String,
            value: "描述内容"
        },
        value: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        close: function() {
            this.setData({
                value: !1
            });
        }
    }
});