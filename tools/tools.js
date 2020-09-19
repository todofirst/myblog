// const fs = require('fs') ;
// const path = require('path') ;

import fs from 'fs' ;
import path from 'path' ;

// 将文件读取转换成Promise版本
export const readFilePromise = function(path, encode='utf-8'){

  return new Promise(function(resolve, reject){
    fs.readFile(path, encode, function(err, data){
      if(err) reject(err) ;

      resolve(data) ;

    })
  })

}

// 获取页面配置
export const getSetting = function(){
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../setting.json')))
}

// 获取系统配置
export const getConfig = function(){
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))
}

// 获取初始化分页的显示数
export const getInitPageBarNum = function(total){
  let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'))) ;
  
  let end = total<config.pageNumOnBar? total:config.pageNumOnBar ;

  let store = [] ;

  for(var i=1 ; i<=end ; i++){
    store.push(i) ;
  }
  
  return store ;
  

}

// 获得分页的数目
export const getTotalPageNum = function(total){
  let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'))) ; ;
  return Math.ceil(total/config.pageSize) ;
}

export const genId = function(){

  return Number(Math.random().toString().substr(3,32) + Date.now()).toString(36);
  }






