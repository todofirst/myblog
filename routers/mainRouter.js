// const express = require('express') ;

// const log = require('../tools/log') ;
// const dbTools = require('../tools/dbTools') ;
// const tools = require('../tools/tools') ;

import express from 'express' ;
import * as log from '../tools/log' ;
import * as tools from '../tools/tools' ;
import * as dbTools from '../tools/dbTools' ;
const router = express.Router() ;

// 渲染主页
router.get('/', function(req, res, next){

  let p1 = dbTools.getAllCategorys() ;
  let p2 = dbTools.getAllByWhere('article', {'isDraft': 0},  req.query.page) ;

  Promise.all([ p1, p2 ])
  .then( results => {
    let cateObj  = results[0] ;
    let articles  = results[1] ;

    res.render('index.html',{
      setting: tools.getSetting(),
      user: req.user,
      cateFathers: Object.keys(cateObj),
      cateObj: cateObj,
      articles: articles
    })

  })
  .catch(err => {
    log('error', err.message) ;
    return next(err) ;
  })

})

// 渲染留言页面
router.get('/lmsg', function(req, res){

})

// 渲染我的个人信息页面
router.get('/about', function(req, res){

})

// module.exports = router ;
export default router ;