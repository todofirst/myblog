import express from 'express' ;
import log from '../tools/log' ;
import moment from '../tools/mymoment' ;

import * as tools from '../tools/tools' ;
import * as dbTools from '../tools/dbTools' ;
import * as queryModels from '../models/queryModels' ;
import * as updateModes from '../models/updateModels' ;
import * as insertModels from '../models/insertModels' ;


const router = express.Router() ;
const config = tools.getConfig() ;
const setting = tools.getSetting() ;

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn ;

// 渲染编辑页面
router.get('/article/edit', ensureLoggedIn('/'), function(req, res){

  if(req.query.aid){

    return dbTools.getColumnsByWhere(['aId'], 'articlesrecord', {uId: req.user[0]._id, aId: req.query.aid})
      .then(data=>{
        if(data.length===0){

          return res.status(301).redirect('/') ;
          
        }

        return res.render('edit.html', {
          user: req.user,
          setting: tools.getSetting(),
          articleId: req.query.aid
        })
        
      })
      .catch(err=>{
        log('error', err.message) ;
        next(err) ;
      })

  }
    res.render('edit.html', {
      user: req.user,
      setting: tools.getSetting()
    })

})

// 文章创建
router.post('/article/edit', function(req, res, next){
  req.body.modify_time = new Date() ;
  if(req.body._id !== ''){

    try{
      
      let sql = dbTools.mysql.format(updateModes.update_article_record, req.body) ;
      sql += dbTools.handleWhere({uId: req.user[0]._id, _id: req.body._id}) ;

      dbTools.query(sql)
      .then(function(data){
        res.status(200).json({
          code: 2,
          errMessage: '修改成功'
        })
      })
      .catch(function(err){
        log('error', err.message) ;
        next(err) ;
      })

    }catch(err){
      res.status(403).json({
        code: 5,
        errMessage: '非法文章'
      })
    }

  }else{
  
    let sql = dbTools.mysql.format(insertModels.insert_articles,
               [tools.genId(), req.body.title, 0, req.body.content,
               req.body.isDraft, req.body.category, req.body.type, new Date(), new Date(), req.user[0]._id]) ;
  
    dbTools.query(sql)
    .then(function(data){
      res.status(200).json({
        code: 2,
        errMessage: '创建成功'
      })
    })
    .catch(function(err){
      log('error', err.message) ;
      next(err) ;
    })
 
  }
  
})

// 处理内容请求
router.get('/article/edit/:articleId', ensureLoggedIn('/'), function(req, res, next){

  if(req.query.op === '1'){
    return dbTools.getColumnsByWhere(['title','content'], 'article', {uId: req.user[0]._id, _id: req.params.articleId})
    .then(function(data){
      let draftObj = {} ;

      draftObj['title'] = data[0].title ;
      draftObj['content'] = data[0].content ;
      res.status(200).json(draftObj) ;
    })
  }

  res.render('edit.html',{
    articleId: req.params.articleId
  })

})



// 查看某个文章
router.get('/article/:article', function(req, res, next){
  let aid = req.params.article
  
  let incVSql = dbTools.mysql.format(updateModes.update_vnum_inc, [aid]) ;
  dbTools.query(incVSql) ;

  let sql = dbTools.mysql.format(queryModels.query_article_with_author, [aid])
  dbTools.query(sql)
  .then(function(articles){
    res.render('article_show.html', {
      user: req.user,
      setting,
      article: articles[0]
    })
  })
  .catch(function(err){
    log('error', err.message) ;
    next(err) ;
  })

})

// 获取评论内容
router.get('/comments', function(req, res, next){
  let aid = req.query.aid ;

  let sql = dbTools.mysql.format(queryModels.query_article_comments_reply, [aid, aid, aid]) ;

  dbTools.query(sql)
  .then(function(data){
    let replys   = data[0] ;
    let comments = data[1] ;

    comments.forEach(comment => {
      comment['replylist'] = typeof comment['replylist'] === 'undefined'? []:comment['replylist'] ;
      comment.time = moment(comment.time).fromNow() ;
      replys.forEach(reply =>{
        if(reply.uid === comment._id){
          reply.time = moment(reply.time).fromNow() ;
          comment['replylist'].push(reply) ;
        }
          
      })
    }) ;

    res.status(200).json(comments) ;

  })
  .catch(function(err){
    log('error', err.message) ;
    next(err) ;
  })
})

// 创建评论信息
router.post('/comment', function(req, res, next){
  let comment = req.body['comment[]'] ;
  comment.push(req.user[0]._id) ;
  comment.push(new Date()) ;
  comment.push(0) ;

  let sql = dbTools.mysql.format(insertModels.insert_comment, comment) ;
  dbTools.query(sql)
  .then(function(data){
    res.json({
      code:2,
      message: '评论成功',
      comment:{
        _id: req.user[0]._id,
        avatar:req.user[0].avatar,
        time: moment(comment[3]).fromNow(),
        username: req.user[0].username
      }
    })
  })
  .catch(function(err){
    next(err) ;
  })

})

// 创建回复信息
router.post('/reply', function(req, res, next){
  let reply = req.body['reply[]'] ;
  let id = tools.genId()
  reply.push(req.user[0]._id) ;
  reply.push(new Date()) ;
  reply.push(0) ;
  reply.push(id) ;
  let sql = dbTools.mysql.format(insertModels.insert_reply, reply) ;
  dbTools.query(sql)
  .then(function(data){
    res.json({
      code:2,
      message: '回复成功',
      reply:{
        time: moment(reply[5]).fromNow(),
        ravatar: req.user[0].avatar,
        rid: req.user[0]._id,
        rname: req.user[0].username,
        _id: id
      }
    })
  })
  .catch(function(err){
    next(err) ;
  })
})

// 点赞
router.get('/good/:type', function(req, res, next){
  console.log(req.params.type) ;
  let model = req.params.type === 'comment'? updateModes.update_comment_good:updateModes.update_reply_good ;
  let where = req.query.where ;
  let sql   = dbTools.mysql.format(model, where) ;
  console.log(model, where) ;
  console.log(sql) ;
  dbTools.query(sql)
  .then(function(){
    res.json({
      code: 2,
      message: '点赞成功哦'
    })
  })
  .catch(function(){
    log('error', err.message) ;
    next(err) ;
  })

})

export default router ;