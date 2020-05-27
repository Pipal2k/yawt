/*var fs = exports;

fs.myfunc = function () {
    return {name: 'Jane'};
}*/


/*var myfunc = function() {
    return {name: 'Jane'};
}

exports = module.exports = myfunc;  */

/*
function Person(name) {
    this.name = name;
  }
  
  Person.prototype.greet = function() {
    return "Hi, I'm " + this.name;
  };
  
  module.exports = Person;*/
 /*exports = module.exports = function() { throw "asdasdasd"};

  function createApplication() {
     throw "sadasd";
  }

  exports.t ="asd";
  exports.y ="asd";*/

  var qs = require('qs')
  , parse = require('../utils').parseUrl;

module.exports = function query(options){
  return function query(req, res, next){
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        ? qs.parse(parse(req).query, options)
        : {};
    }

    next();
  };
};