'use strict';

var traceur = require('traceur');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var chimeras = traceur.require(__dirname + '/../routes/chimeras.js');

  app.get('/', home.index);
  app.get('/help', home.help);
  app.get('/about', home.about);
  app.get('/chimeras', chimeras.index);
  app.get('/chimeras/new', chimeras.new);
  app.get('/chimeras/search', chimeras.search);
  app.get('/chimeras/:id', chimeras.show);
  app.post('/chimeras', chimeras.create);
  app.post('/chimeras/:id/delete', chimeras.destroy);
  console.log('Routes Loaded');
  fn();
}
