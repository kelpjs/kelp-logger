'use strict';
/**
 * [STATUS_CODES description]
 * @type {Object}
 */
const STATUS_CODES = {
  2: 32,
  3: 36,
  4: 33,
  5: 31
};
/**
 * [color description]
 * @param  {[type]} str [description]
 * @param  {[type]} c   [description]
 * @return {[type]}     [description]
 */
function color(str, c){
  return "\x1b[" + c + "m" + str + "\x1b[0m";
};

// logger
module.exports = function(req, res, next){
  var err    = null;
  var end    = res.end;
  var start  = new Date;
  var respod = false;
  /**
   * [function description]
   * @return {[type]} [description]
   */
  res.end = function(){
    end.apply(res, arguments);
    respod = true;
  };
  try{
    next();
  }catch(e){
    err = e;
  }
  if(!respod && err) res.statusCode = 500;
  var cc = STATUS_CODES[ res.statusCode / 100 | 0 ];
  console.log(
    err && !respod ? '-x' : '->'  ,
    color(req.method              , 35),
    color(req.url                 , 90),
    color(res.statusCode          , cc),
    color((new Date - start)+ "ms", 90)
  );
  if(err){
    throw err;
  }
};
