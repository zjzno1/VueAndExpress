var superagent = require('superagent');
var cheerio = require('cheerio');
var Data = require("./schema.js");
var Repeat = require("./schema2.js");

var date = "";
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

function getData() {
  superagent.get('http://baidu.lecai.com/lottery/draw/ajax_get_detail.php?lottery_type=50&phase=2017038')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        var json = JSON.parse(sres.text);
        Data.find({}).sort({'date': -1}).exec(function(err,doc){
          if(doc[0].date!=json.data.time_startsale.substr(0,10))
          {
            var shuju = new Data({
                stage: json.data.phase,
                date: json.data.time_startsale.substr(0,10),
                ball: [{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[0])
                },{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[1])
                },{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[2])
                },{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[3])
                },{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[4])
                },{
                  color: 'red',
                  num: parseInt(json.data.result.result[0].data[5])
                },{
                  color: 'blue',
                  num: parseInt(json.data.result.result[1].data[0])
                }]
              });
              shuju.save(function (err, res) {

                  if (err) {
                      console.log("Error:" + err);
                  }
                  else {
                      console.log("Res:" + res);
                  }
              });
              date = json.data.time_startsale.substr(0,10);
              var data=[],isFirst=true;
              var vm = {
                  ball: null,
                  num: 1,
                  stage: []
                }
              // doc[0].ball.sort(compare("num")).toString()

              for(var i=0;i<doc.length;i++)
              {
                for(var j=i+1;j<doc.length;j++){
                  if(doc[i].ball.sort(compare("num"))[0].num==doc[j].ball.sort(compare("num"))[0].num&&doc[i].ball.sort(compare("num"))[0].color==doc[j].ball.sort(compare("num"))[0].color&&doc[i].ball.sort(compare("num"))[1].num==doc[j].ball.sort(compare("num"))[1].num&&doc[i].ball.sort(compare("num"))[1].color==doc[j].ball.sort(compare("num"))[1].color&&doc[i].ball.sort(compare("num"))[2].num==doc[j].ball.sort(compare("num"))[2].num&&doc[i].ball.sort(compare("num"))[2].color==doc[j].ball.sort(compare("num"))[2].color&&doc[i].ball.sort(compare("num"))[3].num==doc[j].ball.sort(compare("num"))[3].num&&doc[i].ball.sort(compare("num"))[3].color==doc[j].ball.sort(compare("num"))[3].color&&doc[i].ball.sort(compare("num"))[4].num==doc[j].ball.sort(compare("num"))[4].num&&doc[i].ball.sort(compare("num"))[4].color==doc[j].ball.sort(compare("num"))[4].color&&doc[i].ball.sort(compare("num"))[5].num==doc[j].ball.sort(compare("num"))[5].num&&doc[i].ball.sort(compare("num"))[5].color==doc[j].ball.sort(compare("num"))[5].color&&doc[i].ball.sort(compare("num"))[6].num==doc[j].ball.sort(compare("num"))[6].num&&doc[i].ball.sort(compare("num"))[6].color==doc[j].ball.sort(compare("num"))[6].color){
                    vm.num+=1 ;
                    // console.log(vm.num)
                    vm.ball=doc[i].ball;
                    if(isFirst)
                    {
                      vm.stage.push(doc[i].stage);
                      isFirst = false;
                    }
                    vm.stage.push(doc[j].stage)
                  }
                }
                if(vm.num!=0)
                {
                  data.push(vm);
                  console.log(data)
                }
                isFirt = true;
                vm.num = 0;
              }
              // console.log(data)
              // var repeat= new Repeat({
              //   data: data
              // })
              // repeat.save(function (err, res) {
              //     if (err) {
              //         console.log("Error:" + err);
              //     }
              //     else {
              //         console.log("Res:" + res);
              //     }
              // });
              // console.log(12345555,repeat)
              // });
          }
  });
}

// setInterval(getData,1000*60*60*24);
getData();