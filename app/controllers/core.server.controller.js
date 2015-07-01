'use strict';

var mongoose = require('mongoose');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.sent = function(req, res){
	console.log(req.body);

};