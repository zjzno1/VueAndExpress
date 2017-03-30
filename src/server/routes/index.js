var express = require('express');
var router = express.Router();
var Data = require("../schema.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
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
	// res.json({num: req.body.num})
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
			  				// console.log('doc[i].ball.length',i)
			  				// console.log('doc[i].ball[j]',doc[i].ball[j])
			  			}
			  			// console.log('red:',redball)
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
					// res.json(doc[0]); //返回最新一期双色球
			})
  		}
});
//查询号码是否中过大奖
router.post('/recommend', function(req, res, next) {
  res.json({name:'zjz'});
});
//显示出重复的大奖号码
router.post('/haveWin', function(req, res, next) {
  res.json({name:'zjz'});
});
module.exports = router;
