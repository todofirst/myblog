import md5 from 'md5' ;
import express from 'express' ;
import passport from 'passport' ;

import * as log from '../tools/log' ;
import * as tools from '../tools/tools' ;
import * as dbTools from '../tools/dbTools' ;
import * as insertModels from '../models/insertModels' ;


import {Strategy as LocalStrategy} from'passport-local' ;

const router = express.Router() ;

// passport配置
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },

  function(username, password, done) {
    password = md5(password) ;
    dbTools.getAllByWhere('user', {username: username, password: password})
    .then(function(user){
      if(user.length === 0){
        return done(null, false) ;
      }
      done(null, user) ;
    })
    .catch(function(err){
      done(err) ;
    })

  }
));

passport.serializeUser(function(user, done) {

  done(null, user) ;
});
 
passport.deserializeUser(function(user, done) {

  done(null, user) ;
});

// 处理登陆请求
router.post('/login', function(req, res, next){

  passport.authenticate('local', function(err, user, info) {

    if (err) { 
      log('error', err.message) ;
      return next(err) ; }

    if (!user) {
      return  res.status(403).json({
      code: 1,
      message: "用户名或者密码不正确"
    })  
   }

  req.logIn(user, function(err) {
    if (err) { return next(err) ; }
    return res.status(201).json({
      code: 2,
      message: "登陆成功"
    })
  })

  })(req, res, next) ;

})



// 处理注册请求
router.post('/register', function(req, res, next){

  dbTools.getColumnsByWhere(['_id'], 'user', {username: req.body.username})
  .then(function(data){
    if(data.length === 1){
      return res.status(403).json({
        code: 3,
        errMessage: '用户名已经存在'
      })
    }else{

      let user = {}
      user._id = tools.genId() ;
      user.username = req.body.username 
      user.password = md5(req.body.password)
      user.create_time = new Date() ;
      user.last_login_time = new Date() ;

      let sql = dbTools.mysql.format(insertModels.insert_user, [
        user._id,
        user.username,
        user.password,
        user.create_time,
        user.last_login_time
      ] )

      dbTools.query(sql)
      .then(function(data){
        // 这里是自己给自己留的一个坑
        let userList = []
        userList.push(user)
        req.logIn(userList, function(err) {
          if (err) { return next(err) ; }
          return res.status(200).json({
            code: 2,
            message: "登陆成功"
          })
        })

      })
      .catch(function(err){
        log('error', err.message) ;
        next(err) ;
      })
    }
  })
})

// 退出登陆
router.get('/logout', function(req, res){
  req.logout() ;
  res.status(301).redirect('/') ;
})



// module.exports = router ;
export default router ;

