
import moment from 'moment' ;

export const getDate = function(date){

  try{
    if( date instanceof Date)
      return moment(date, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') ;
    return moment(new Date(date), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') ;
  }catch(err){
    console.log(err) ;
  }


  

}