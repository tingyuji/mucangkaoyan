var t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        console.log(a), console.log(t.globalData);
        this.setData({
            title: a.title,
            is_url: a.is_url,
            content: t.globalData.content
        }, function() {
            1 == a.is_url && wx.setNavigationBarTitle({
                title: a.title
            });
        });
    }
});