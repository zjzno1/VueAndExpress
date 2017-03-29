 // var mongo = require('mongodb'),
 //     Server = mongo.Server,
 //     Db = mongo.Db;
 
 // var server = new Server('localhost', 27017, {auto_reconnect: true});
 // var db = new Db('foo', server);
 
 // db.open(function(err, db) {
 //     if(!err) {
 //         console.log("We are connected");
 //     }
 // });
var Data = require("./schema.js");
var fs = require("fs") ;

fs.readFile("../../double.txt","utf8",function (error,data){
     if(error) throw error ;
     // console.log(data)
     var arr = data.split('\n');
     // console.log(arr.length)
     // console.log(arr)
     // for(var i=0;i<arr.length;i++){
     // 	var arr2 = arr[i].split(' ');
     // 	var data = new Data({
	    //     stage : arr2[0],
	    //     date: arr2[1],
	    //     ball: [{
	    //     	num: parseInt(arr2[2]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[3]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[4]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[5]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[6]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[7]),
	    //     	color: 'red'
	    //     },{
	    //     	num: parseInt(arr2[8]),
	    //     	color: 'blue'
	    //     }]
	    // });
	    // data.save(function (err, res) {

	    //     if (err) {
	    //         console.log("Error:" + err);
	    //     }
	    //     else {
	    //         console.log("Res:" + res);
	    //     }
	    // });                                      
	    // console.log(i)
     // }
     arr.forEach(function(a){
		var arr2 = a.split(' ');
     	var data = new Data({
	        stage : arr2[0],
	        date: arr2[1],
	        ball: [{
	        	num: parseInt(arr2[2]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[3]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[4]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[5]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[6]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[7]),
	        	color: 'red'
	        },{
	        	num: parseInt(arr2[8]),
	        	color: 'blue'
	        }]
	    });
	    data.save(function (err, res) {

	        if (err) {
	            console.log("Error:" + err);
	        }
	        else {
	            console.log("Res:" + res);
	        }
	    });                                      
	    // console.log(arr2[1])
     })
 });

// function insert() {
//  for(var i=0;i<10;i++){
//     var data = new Data({
//         stage : '2017111',
//         ball: [{
//         	num: 1,
//         	color: 'red'
//         },{
//         	num: 2,
//         	color: 'red'
//         },{
//         	num: 3,
//         	color: 'red'
//         },{
//         	num: 4,
//         	color: 'red'
//         },{
//         	num: 5,
//         	color: 'red'
//         },{
//         	num: 6,
//         	color: 'red'
//         },{
//         	num: 7,
//         	color: 'blue'
//         }]
//     });
//     data.save(function (err, res) {

//         if (err) {
//             console.log("Error:" + err);
//         }
//         else {
//             console.log("Res:" + res);
//         }
//     });
// }
// }

// insert();