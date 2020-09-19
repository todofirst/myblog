// const express = require('express') ;


import express from 'express' ;
const router = express.Router() ;

// 查看个人全部文章
router.get('/admin', function(req, res){

})

// 渲染日志信息
router.get('/admin/log', function(req, res){

})

// 渲染用户信息
router.get('/admin/users', function(req, res){

})

// 添加用户
router.get('/admin/user/add', function(req, res){

})

// 删除用户
router.get('/admin/user/del', function(req, res){

})

// 渲染配置信息
router.get('/admin/config', function(req, res){

})

// 配置信息保存
router.get('/admin/config/save', function(req, res){

})

// module.exports = router ;
export default router ;