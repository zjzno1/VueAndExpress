var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getData', function(req, res, next) {
  res.json({name:'zjz'});
});
//当前开奖号码
router.post('/nowNum', function(req, res, next) {
  res.json({name:'zjz'});
});
//查询各个球出现的概率
router.post('/number', function(req, res, next) {
  res.json({name:'zjz'});
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
