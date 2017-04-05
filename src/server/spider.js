var superagent = require('superagent');
var cheerio = require('cheerio');
var Data = require("./schema.js");

var date = "";
function getData() {
  superagent.get('http://baidu.lecai.com/lottery/draw/ajax_get_detail.php?lottery_type=50&phase=2017038')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        var json = JSON.parse(sres.text);
        var $ = cheerio.load(sres.text);
        if(date!=json.data.time_startsale.substr(0,10))
        {
          var vm = new Data({
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
          vm.save(function (err, res) {

              if (err) {
                  console.log("Error:" + err);
              }
              else {
                  console.log("Res:" + res);
              }
          });
          date = json.data.time_startsale.substr(0,10);
        }
  });
}

setInterval(getData,1000*60*60*12);