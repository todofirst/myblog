
const path = require('path') ;
const fs = require('fs') ;
const log = require('./log') ;
const models = require('../models/queryModels') ;

let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'))) ;

export const mysql = require('mysql') ;
let pool = mysql.createPool(config.mysql) ;

export function handleWhere( where, rela){
  rela = rela? rela:'AND' ;
  where = mysql.format('?', where).split(',').join(` ${rela} `) ;
  return where ;
}


// exports.handleWhere = handleWhere ;

// exports.mysql = mysql ;

// 一般查询
export const query = function( sql ){

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      connection.query(sql, function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        resolve(results) ;
        connection.release();
     
      }) ;
    }) ;
  })
}

// 格式化和查询
export const formatAndQ = function(model, list, test=false){
  list = typeof list === 'array'? list:new Array(list) ;
  let sql = mysql.format(model, list) ;
  if(test)
    console.log('the sql is：', sql) ;
  return query(sql) ;
}

// 用来获取某个表的全部信息
export const getAllOnly = function( tablename, curPN ){

  curPN = curPN||1 ;

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      if (err) log('error', err.message) ;

      let skip = config.pageSize * (curPN-1) ;
      let query_all = models.query_all+ `limit ${skip}, ${config.pageSize}` ;
      connection.query(query_all, [tablename], function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        resolve(results) ;
        connection.release();
     
      }) ;
    }) ;
  })
}

// 查询某些列
export const getColumnsOnly = function( columns, tablename ){

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      if (err) log('error', err.message) ;

      let sql = connection.query(models.query_columns, [columns,tablename], function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        resolve(results) ;
        connection.release();
     
      }) ;

    }) ;
  })
}

// 通过条件查询全部列
export const getAllByWhere = function(tablename, where, curPN, rela){

  curPN = curPN||1 ;

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      if (err) log('error', err.message) ; 

      let sql = models.query_all_where + handleWhere(where, rela) ;

      let skip = config.pageSize * (curPN-1) ;

      sql = sql+ ` limit ${skip}, ${config.pageSize}` ;
      
      connection.query(sql, [tablename], function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        resolve(results) ;
        connection.release();
     
      }) ;
    }) ;
  })
}

// 通过条件查询某些列
export const getColumnsByWhere = function(columns, tablename, where, rela){

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      if (err) log('error', err.message) ;

      let sql = models.query_columns_where+handleWhere(where, rela) ;

      let query = connection.query(sql, [columns, tablename], function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        resolve(results) ;
        connection.release();
     
      }) ;
    }) ;
  })
}


// 主要用来获取主页面的所有分类的信息
export const getAllCategorys = function(){

  return new Promise(function(resolve, reject){

    pool.getConnection(function(err, connection) {

      if (err) log('error', err.message) ; 

      
      connection.query(models.get_all_categorys, function (err, results, fields) {

        if(err){
          reject(err) ;
        } 

        let cateObj = {} ;
        results.forEach(item => {
          cateObj[item.father] = typeof cateObj[item.father] === 'undefined'? []:cateObj[item.father] ;
          cateObj[item.father].push(item) ;
        });

        resolve(cateObj) ;
        connection.release();
     
      }) ;
    }) ;
  })
}







