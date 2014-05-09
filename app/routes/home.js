'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Chimera-Factory - Home'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Chimera-Factory - Help'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'Chimera-Factory - About'});
};
