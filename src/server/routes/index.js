var express = require('express');
var router = express.Router();
var Data = require("../schema.js");

var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//查询当前有多少期
router.post('/getData', function(req, res, next) {
	// db.model('datas', Data );
	Data.find(function(err,data){
      res.json({totalNum: data.length})
    });
});
//当前开奖号码
router.post('/nowNum', function(req, res, next) {
  	Data.find({}).sort({'date': -1}).exec(function(err,doc){
		res.json(doc[0]); //返回最新一期双色球
	})
});
//查询各个球出现的概率
router.post('/number', function(req, res, next) {
	var redball=[],blueball=[],data1=[],data2=[],data=[];
	var fontLength = req.body.num;
	for(var i=0;i<34;i++){
		redball[i]=0;
	}
	for(var i=0;i<17;i++){
		blueball[i]=0;
	}
	if(isNaN(req.body.num)||req.body.num<=0){
  			res.json({msg:"必须输入大于0的数字！"})
  		}else {
  			if(req.body.num){
				Data.find(function(err,data){
			      req.body.num = data.length
			    });
			}
		  	Data.find({}).sort({'date': -1}).exec(function(err,doc){
		  			for(var i=0;i<fontLength;i++){
			  			for(var j=0;j<doc[i].ball.length-1;j++){
			  				redball[doc[i].ball[j].num]+=1;
			  			}
			  			blueball[doc[i].ball[6].num]+=1;
			  		}
			  		for(var i=1;i<redball.length;i++){
			  			var ball = {
			  				num: null,
			  				color: null,
			  				frequency: null,
			  			}
			  			ball.num = i;
			  			ball.frequency = redball[i]
			  			ball.color = 'red';
			  			data1.push(ball);
			  		}
			  		for(var i=1;i<blueball.length;i++){
			  			var ball = {
			  				num: null,
			  				color: null,
			  				frequency: null,
			  			}
			  			ball.num = i;
			  			ball.frequency = blueball[i]
			  			ball.color = 'blue';
			  			data2.push(ball);
			  		}
			  		data1.sort(compare("frequency"))
			  		data2.sort(compare("frequency"))
			  		data = data1.concat(data2);
			  		console.log('redball',redball[1])
			  		res.json(data)
			})
  		}
});
//推荐下注
router.post('/recommend', function(req, res, next) {
	switch(req.body.value)
	{
	case 1:
	  	
	  break;
	case 2:
	  
	  break;
	default:
	  res.json({msg: 'error,发生错误'})
	}
});
//查询号码是否中过大奖
router.post('/search', function(req, res, next) {
	var num = 0,arr1=[],arr2=[],data=[];
	var str = req.body.value;
	console.log(12345,req.body.value)
	var arr = str.split(',');
	for(var i=0;i<6;i++){
		arr1.push(parseInt(arr[i]))
	}
	arr1 = arr1.sort()
	console.log(arr1)
	// arr = arr.sort();
	// console.log(arr)
	Data.find({}).sort({'date': -1}).exec(function(err,doc){
		for(var i=0;i<doc.length;i++){
			if(arr[6]==doc[i].ball[6].num)
			{
				for(var j=0;j<6;j++){
					arr2.push(doc[i].ball[j].num);
				}
				arr2 = arr2.sort();
				if(arr2.toString()==arr1.toString())
				{
					data.push(doc[i])
				}
				arr2 = []
			}
		}
		console.log('data11111',data)
		if(data.length!=0)
		{
			res.json({data: data})
		}else {
			res.json({data: '未查询到'})
		}
		// for(var i=0;i<doc.length;i++)
		// {  
		// 	for(var j=0;j<)
		// 	doc[i].ball.sort(compare("num"))[j]
		// }
	});
	// res.json({arr: arr});
});
//显示出重复的大奖号码
router.post('/haveWin', function(req, res, next) {
	// var data=[],isFirst=true;
	// var vm = {
	// 		ball: null,
	// 		num: 0,
	// 		stage: []
	// 	}
	// Data.find({}).sort({'date': -1}).exec(function(err,doc){
	// 	doc[0].ball.sort(compare("num")).toString()

	// 	for(var i=0;i<doc.length;i++)
	// 	{
	// 		for(var j=i+1;j<doc.length;j++){
	// 			if(doc[i].ball.sort(compare("num"))[0].num==doc[j].ball.sort(compare("num"))[0].num&&doc[i].ball.sort(compare("num"))[0].color==doc[j].ball.sort(compare("num"))[0].color&&doc[i].ball.sort(compare("num"))[1].num==doc[j].ball.sort(compare("num"))[1].num&&doc[i].ball.sort(compare("num"))[1].color==doc[j].ball.sort(compare("num"))[1].color&&doc[i].ball.sort(compare("num"))[2].num==doc[j].ball.sort(compare("num"))[2].num&&doc[i].ball.sort(compare("num"))[2].color==doc[j].ball.sort(compare("num"))[2].color&&doc[i].ball.sort(compare("num"))[3].num==doc[j].ball.sort(compare("num"))[3].num&&doc[i].ball.sort(compare("num"))[3].color==doc[j].ball.sort(compare("num"))[3].color&&doc[i].ball.sort(compare("num"))[4].num==doc[j].ball.sort(compare("num"))[4].num&&doc[i].ball.sort(compare("num"))[4].color==doc[j].ball.sort(compare("num"))[4].color&&doc[i].ball.sort(compare("num"))[5].num==doc[j].ball.sort(compare("num"))[5].num&&doc[i].ball.sort(compare("num"))[5].color==doc[j].ball.sort(compare("num"))[5].color&&doc[i].ball.sort(compare("num"))[6].num==doc[j].ball.sort(compare("num"))[6].num&&doc[i].ball.sort(compare("num"))[6].color==doc[j].ball.sort(compare("num"))[6].color){
	// 				vm.num++ ;
	// 				vm.ball=doc[i].ball;
	// 				if(isFirst)
	// 				{
	// 					vm.stage.push(doc[i].stage);
	// 					isFirst = false;
	// 				}
	// 				vm.stage.push(doc[j].stage)
	// 			}
	// 		}
	// 		if(vm.ball!=null)
	// 		{
	// 			data.push(vm);
	// 		}
	// 		isFirt = true;
	// 		vm.num = 0;
	// 	}
	// 	console.log(12345555,data)
	// 	res.json({data: data})
	// });
});
module.exports = router;
