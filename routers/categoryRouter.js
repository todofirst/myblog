// const express = require('express') ;
// const dbTools = require('../tools/dbTools') ;
// const log = require('../tools/log') ;
import express from 'express' ;
import * as log from '../tools/log' ;
import * as dbTools from '../tools/dbTools' ;

const router = express.Router() ;

// 表示请求"全部分类"的路由下的全部文章
router.get('/category/allarticle', function(req, res, next){

  dbTools.getAllOnly('indexarticles', req.query.page)
  .then(function(data){
    let aObj = {} ;
    aObj['articles'] = data ;

    res.status(200).json(aObj) ;

  })
  .catch(function(err){
    log('error', err.message) ;
    next(err) ;
  })
})

// 请求所有分类
router.get('/category/allCategory', function(req, res, next){
  dbTools.getAllCategorys()
  .then(function(cateObj){

    res.status(200).json(cateObj) ;

  })
  .catch(function(err){
    log('error', err.message) ;
    next(err) ;
  })
})

// 处理除全部分类外的某一分类的请求下的全部文章
router.get('/category/:category', function(req, res){
  let curPN = req.query.page||1 ;
  dbTools.getAllByWhere('indexarticles', {
    cId: req.params.category
  }, curPN)
  .then(function(data){
    let aObj = {} ;
    aObj['articles'] = data ;
    res.status(200).json(aObj) ;
  })
  .catch(function(err){
    console.log(('error', err.message)) ;
    
  })
})



// 跳转到文章详情
// router.get('/category/:category/:articleid', function(req, res){
  
// })



export default router ;
