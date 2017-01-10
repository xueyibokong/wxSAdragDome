//touchstart点
var startX = 0,startY = 0;
//touchmove差值
var distanceX = 0,distanceY = 0;
//touchstart指向的item的index
var index = 0;
Page({
    data:{
        title : "CARD LIST",
        cardlist : [{
            open: false,
            right:0,
            cardName : "中信银行",
            cardNum  : "6228480134578432868",
            cardType : "借贷合一卡",
            cardImage: "../../image/4.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            cardName : "农业银行",
            cardNum  : "6228480134578432868",
            cardType : "信用卡",
            cardImage: "../../image/3.png",
            cardColor: "#149e86"
        },{
            open: false,
            right:0,
            cardName : "工商银行",
            cardNum  : "6228480134578432868",
            cardType : "储蓄卡",
            cardImage: "../../image/1.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            cardName : "招商银行",
            cardNum  : "6228480134578432868",
            cardType : "储蓄卡",
            cardImage: "../../image/2.png",
            cardColor: "#f28720"
        },{
            open: false,
            right:0,
            cardName : "中信银行",
            cardNum  : "6228480134578432868",
            cardType : "借贷合一卡",
            cardImage: "../../image/4.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            cardName : "农业银行",
            cardNum  : "6228480134578432868",
            cardType : "信用卡",
            cardImage: "../../image/3.png",
            cardColor: "#149e86"
        }]
    },
    startCardItem : function(e){
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        index = parseInt(e.currentTarget.id);
    },
    moveCardItem : function(e){
        distanceX = e.touches[0].clientX - startX;
        distanceY = e.touches[0].clientY - startY;
        // console.dir(distanceX +"--"+ distanceY);
        if(Math.abs(distanceY) > Math.abs(distanceX)){
            console.log("识别为竖直拖拽");
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            return;
        }else{
            if(distanceX < 0){
                console.log("左滑动")
                var opt = {
                    x : distanceX,
                    y : distanceY
                }
                this.dragCardItem(opt)
            }else if(distanceX > 0){
                console.log("右滑动")
                var opt = {
                    x : distanceX,
                    y : distanceY
                }
                this.dragCardItem(opt)
            }else if(distanceX == 0){
                console.log("未滑动")
            }
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            return;
        }
        this.openCardItem(e);
    },
    endCardItem : function(e){
        startX = 0,startY = 0;
        distanceX = 0,distanceY = 0;
    },
    dragCardItem : function(e){
        console.log(e);
        console.log(index)
    },
    openCardItem : function(e){
        var index = parseInt(e.currentTarget.id);
        var cardItem = this.data.cardlist[index];
        var cData = {};
        if(cardItem.open){
            cData['cardlist['+index+'].open'] = false;
        }else if(!cardItem.open){
            cData['cardlist['+index+'].open'] = true;
        }
        this.setData(cData);
    },
    deleteItem : function(e){
        var index = parseInt(e.currentTarget.id);
        var cardItem = this.data.cardlist[index];
        this.data.cardlist.splice(index,1);
        var cData = {};
        cData.cardlist = this.data.cardlist;
        this.setData(cData);
        wx.showToast({
            title: "删除成功"
        })
    },
    onReady : function(){
        var ilist = this.data.cardlist;
        var cData = {};
        const _that = this;
        wx.onAccelerometerChange(function(res) {
            //x轴手机以左边为边垂直于地面为（-1），向反则为（1）；
            // console.log(res.x)
            //y轴手机以底部为边垂直于地面为（-1），向反则为（1）；
            // console.log(res.y)
            //z轴正面朝上（-1），背面朝上（1），从四个方西由正向反都会是此值增加
            // console.log(res.z)
            if(Math.abs(res.y) < 0.7 && res.z > -0.6 && res.x < 0){
                ilist.forEach(function(item,index){
                    item.open = true;
                })
                cData.cardlist = ilist;
                _that.setData(cData)
            }
            if(Math.abs(res.y) < 0.7 && res.z > -0.85 && res.x > 0){
                ilist.forEach(function(item,index){
                    item.open = false;
                })
                cData.cardlist = ilist;
                _that.setData(cData)
            }
        })
    }
})
