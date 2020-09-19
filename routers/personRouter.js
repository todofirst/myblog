import express from 'express' ;
import log from '../tools/log' ;
import * as tools from '../tools/tools' ;
import * as dbTools from '../tools/dbTools' ;
import * as formater from '../tools/formater' ;
import * as queryModels from '../models/queryModels' ;


const setting = tools.getSetting() ;
const config = tools.getConfig() ;

const router = express.Router() ;

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn ;

// 渲染个人信息页面
router.get('/person', ensureLoggedIn('/'), function(req, res){
  res.render('person.html', {
    user: req.user,
    setting: setting,
    tags: setting.admin_tags,
    current: 0
  })
})

// 查看我发表的全部文章
router.get('/article/my', function(req, res, next){

  let model = req.query.d === '1'? queryModels.query_isDraft_articles:queryModels.query_publish_articles ;
  let current = req.query.d === '1'? 2:1 ;
  let id = req.user[0]._id

  let isFirst = req.query.page? false:true

  let curPN = req.query.page? req.query.page:1 

  let skip = config.pageSize * (curPN-1) ;

  let sql = dbTools.mysql.format(model, [id, skip, config.pageSize, id]) ;

  dbTools.query(sql).then(function(data){

    let articleRecords = data[0] ;
    let total = tools.getTotalPageNum(data[1][0].total) ;
   
    articleRecords.forEach(function(item){
      item.create_time = formater.getDate(item.create_time) ;
      item.modify_time = formater.getDate(item.modify_time) ;
    })


    if(!isFirst){

      let recordObj = {} ;
      recordObj['articleRecords'] = articleRecords ;
      recordObj['total'] = total ;
      
      return res.status(200).json(recordObj) ;

    }

    let pageStorage = tools.getInitPageBarNum(total) ;
    res.render('myarticle_records.html', {
      user: req.user,
      setting: tools.getSetting(),
      articleRecords: articleRecords,
      pageStorage: pageStorage,
      current: current
    })


  })
  .catch(function(err){
    log('error', err.message) ;
    next(err) ;
  })

})

// 删除文章
router.get('/article/del/:articleId', function(req, res){

})











// module.exports = router ;
export default router ;