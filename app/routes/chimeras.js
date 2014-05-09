'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');

  chimeras.find().toArray((err, records)=>{
    res.render('chimeras/index', {chimeras:records, title: 'Chimera-Factory - Chimeras'});
  });
};


exports.new = (req, res)=>{
  res.render('chimeras/new', {title: 'Chimera-Factory - New Chimera'});
};


exports.create = (req, res)=>{
  debugger;
  var head;
  var body;
  var tail;

  switch(req.body.head){
  case 'Cheetah':
    head = 'cheetah_head.png';
    break;
  case 'Deer':
    head = 'deer_head.png';
    break;
  case 'Dog':
    head = 'dog_head.png';
    break;
  }

  switch(req.body.body){
  case 'Cheetah':
    body = 'cheetah_body.png';
    break;
  case 'Deer':
    body = 'deer_body.png';
    break;
  case 'Dog':
    body = 'dog_body.png';
    break;
  }

  switch(req.body.tail){
  case 'Cheetah':
    tail = 'cheetah_tail.png';
    break;
  case 'Deer':
    tail = 'deer_tail.png';
    break;
  case 'Dog':
    tail = 'dog_tail.png';
    break;
  }

  req.body.head = head;
  req.body.body = body;
  req.body.tail = tail;

  var chimeras = global.nss.db.collection('chimeras');
  chimeras.save(req.body, (err, obj)=>{
    // console.log(obj);
    res.redirect('/chimeras');
  });

};


exports.show = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chimeras.findOne({_id:_id}, (err, record)=>{
    res.render('chimeras/show', {chimera:record, title:'Chimera-Factory - New Chimera'});
  });
};


exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  var chimeras = global.nss.db.collection('chimeras');
  chimeras.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/chimeras');
  });
};


exports.search = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');

  var fileName = req.query.animal.toLowerCase() + '_' + req.query.position.toLowerCase() + '.png';

  var property = req.query.position.toLowerCase();
  var obj = {};//.find() method does not accept req.query.position as a property.
  obj[property] = fileName;//this is why we entered the information into an object, then entered that into our search

  chimeras.find(obj).toArray((err, records)=>{
    res.render('chimeras/index', {chimeras:records, title: 'Chimera-Factory - Chimeras'});
  });
};
