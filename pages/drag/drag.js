//最大拖拽距离
var dragright = 125;
//touchstart点
var startX = 0,startY = 0;
//touchmove差值
var distanceX = 0,distanceY = 0;
//touchstart指向的item的index
var index = 0;
//记录touchmove的方向
var dir = "";
Page({
    data:{
        title : "CARD LIST",
        cardlist : [{
            open: false,
            right:0,
            transition:"none",
            cardName : "中信银行",
            cardNum  : "4578",
            cardType : "借贷合一卡",
            cardImage: "../../image/4.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "农业银行",
            cardNum  : "6288",
            cardType : "信用卡",
            cardImage: "../../image/3.png",
            cardColor: "#149e86"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "工商银行",
            cardNum  : "1345",
            cardType : "储蓄卡",
            cardImage: "../../image/1.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "招商银行",
            cardNum  : "8432",
            cardType : "储蓄卡",
            cardImage: "../../image/2.png",
            cardColor: "#f28720"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "农业银行",
            cardNum  : "6288",
            cardType : "信用卡",
            cardImage: "../../image/3.png",
            cardColor: "#149e86"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "工商银行",
            cardNum  : "1345",
            cardType : "储蓄卡",
            cardImage: "../../image/1.png",
            cardColor: "#e65457"
        },{
            open: false,
            right:0,
            transition:"none",
            cardName : "招商银行",
            cardNum  : "8432",
            cardType : "储蓄卡",
            cardImage: "../../image/2.png",
            cardColor: "#f28720"
        }]
    },
    //touchstart
    startCardItem : function(e){
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        index = parseInt(e.currentTarget.id);
        var cardItem = this.data.cardlist[index];
        var cData = {};
        cData['cardlist['+index+'].transition'] = "none";
        this.setData(cData);
    },
    //touchmove
    moveCardItem : function(e){
        distanceX = e.touches[0].clientX - startX;
        distanceY = e.touches[0].clientY - startY;
        console.dir(distanceX +"--"+ distanceY);
        if((Math.abs(distanceY)-2) >= Math.abs(distanceX)){
            console.log("%c%s", "border-bottom:1px solid green;", "识别为竖直拖拽");
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            return;
        }else{
            if(distanceX < 0){
                console.log("%c%s","color:#d46e17;","左滑动")
                dir = "left";
                var opt = {
                    x : distanceX,
                    y : distanceY,
                    dir: "left"
                }
                this.dragCardItem(opt)
            }else if(distanceX > 0){
                console.log("%c%s","color:#9e25dc","右滑动")
                dir = "right";
                var opt = {
                    x : distanceX,
                    y : distanceY,
                    dir: "right"
                }
                this.dragCardItem(opt)
            }else if(distanceX == 0){
                console.log("%c%s","color:25dc55","未滑动")
            }
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            return;
        }
    },
    //drag
    dragCardItem : function(e){
        var cardItem = this.data.cardlist[index];
        var cData = {};
        if(e.dir == "right" && cardItem.right <= 1){
            console.log("到右边了")
            cData['cardlist['+index+'].right'] = 0;
            this.setData(cData);
            return;
        }else if(e.dir == "left" && cardItem.right >= dragright){
             console.log("到左边了")
             cData['cardlist['+index+'].right'] = dragright;
             this.setData(cData);
             return;
        }
        cData['cardlist['+index+'].right'] =(cardItem.right -= e.x);
        console.log(cardItem.right -= e.x)
        this.setData(cData);
    },
    //touchend
    endCardItem : function(e){
        startX = 0,startY = 0;
        distanceX = 0,distanceY = 0;
        var cardItem = this.data.cardlist[index];
        var cData = {};
        cData['cardlist['+index+'].transition'] = "all .2s linear";
        this.setData(cData);
        //向左
        if(dir == "left"){
            if(cardItem.right >= 35){
                cData['cardlist['+index+'].right'] = dragright;
                this.setData(cData);
            }else{
                cData['cardlist['+index+'].right'] = 0;
                this.setData(cData);
            }
        }
        //向右
        else if(dir == "right"){
            if(cardItem.right <= (dragright-35)){
                cData['cardlist['+index+'].right'] = 0;
                this.setData(cData);
            }else{
                cData['cardlist['+index+'].right'] = dragright;
                this.setData(cData);
            }
        }  
    },
    deleteItem : function(e){
        this.data.cardlist.splice(index,1);
        var cData = {};
        cData.cardlist = this.data.cardlist
        this.setData(cData);
        wx.showToast({
            title: "删除成功"
        })
    },
    onReady : function(){
        const _that = this;
        wx.onAccelerometerChange(function(res) {
            var ilist = _that.data.cardlist;
            var cData = {};
            //x轴手机以左边为边垂直于地面为（-1），向反则为（1）；
            // console.log(res.x)
            //y轴手机以底部为边垂直于地面为（-1），向反则为（1）；
            // console.log(res.y)
            //z轴正面朝上（-1），背面朝上（1），从四个方西由正向反都会是此值增加
            // console.log(res.z)
            if(Math.abs(res.y) < 0.7 && res.z > -0.6 && res.x < 0){
                //手机向左倾斜
                ilist.forEach(function(item,index){
                    item.open = true;
                    item.transition = "all .2s linear";
                })
                cData.cardlist = ilist;
                _that.setData(cData)
            }
            if(Math.abs(res.y) < 0.7 && res.z > -0.75 && res.x > 0){
                //手机向右倾斜
                ilist.forEach(function(item,index){
                    item.open = false;
                    item.transition = "all .2s linear";
                })
                cData.cardlist = ilist;
                _that.setData(cData)
            }
        })
    }
})
