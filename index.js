// logger
module.exports = function(req, res, next){
  var start = new Date;
  var err = null;
  try{
    next();
  }catch(e){
    err = e;
  } finally {
    function color(str, c){
      return "\x1b[" + c + "m" + str + "\x1b[0m";
    };
    if(err){
      res.writeHead(500);
    }
    var cc = ({
      2: 32,
      3: 36,
      4: 33,
      5: 31
    })[parseInt(res.statusCode / 100)];
    console.log('%s %s %s %s %s',
      err ? '-x' : '->',
      color(req.method              , 35),
      color(req.url                 , 90),
      color(res.statusCode          , cc),
      color((new Date - start)+ "ms", 90)
    );
    if(err){
      throw err;
    }
  }
};
