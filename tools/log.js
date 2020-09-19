
import log4js from 'log4js' ;

var logger = log4js.getLogger() ;

/**日志操作
 * @param level 日志类型
 * @param msg 要打印的日志的信息
 * @param isStore 是否存储到数据库中
 * @return 无
 */
export default function log( level, msg, isStore = true){

  logger.level = level ;
  logger[level](msg) ;

}