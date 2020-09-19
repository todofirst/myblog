import fs from 'fs' ;
import path from 'path' ;
import multer from 'multer' ;
import express from 'express' ;
import shortid from 'shortid' ;
import log from '../tools/log' ;


const router = express.Router() ;

// 图片上传配置
const storageImg = multer.diskStorage({
  destination(req, file, cb) {
      if (req.query.guid) {

          let dirPathParent = path.join(__dirname, '../public/uploads/', req.query.guid),
              dirPath = path.join(dirPathParent, 'img') ; 
          fs.mkdir(dirPathParent, err => {
              if (err && err.code !== 'EEXIST') {
                  cb(err);
              } else {
                  fs.mkdir(dirPath, err => {
                      if (err && err.code !== 'EEXIST') {
                          cb(err);
                      } else {

                        cb(null, dirPath);
                      }
                  });
              }
          });
      } else {
          cb(new Error('参数uniqueId不存在！'));
      }
  },

  filename(req, file, cb) {

    const fileName = `${file.originalname.substring(0, file.originalname.lastIndexOf('.'))}_${shortid.generate()}`;
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
    const fullName = fileName + ext;

    cb(null, fullName);
  }

});


// 图片上传
router.post('/uimg', function(req, res, next){

  let uploadImg = multer({ storage: storageImg })
  .single('editormd-image-file') ;

  uploadImg(req, res, function(err){

    if(err){
      log('error', err.message) ;
      res.json({
        success: 0,
        message: '上传失败',
      })
      next(err) ;
    }

    res.json({
      success: 1,
      message: '上传成功',
      url: `/public/uploads/${req.query.guid}/img/${req.file.filename}`,
    })
  })
})

export default router ;