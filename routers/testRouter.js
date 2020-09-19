import * as dbTools from '../tools/dbTools' ;
import express from 'express' ;

const router = express.Router() ;

router.get('/test', function(){
  console.log('test') ;
  dbTools.query(`SELECT * FROM reply WHERE uid IN (SELECT uid FROM comment WHERE aid='ys8727fbfz400000000'))`)
  .then(function(data){
    console.log(data) ;
  })
})

export default router ;