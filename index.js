var browserify = require("browserify");
var path = require("path");
var vm = require("vm");
var b = browserify();

b
.add(path.normalize(__dirname+"/will-require-you"))
.require(path.normalize(__dirname+"/please-please-require-me"),{expose:"require-me"})
;

var errorcount = 0;
function tryToRun(){
  b.bundle(function(err,bun){
    if(err){
      console.log(err)
      errorcount++;
      return setImmediate(tryToRun);
    }
    console.log("net size: "+bun.length);
    console.log("error count: "+errorcount);
    vm.runInThisContext(bun);
  })
}

tryToRun();
