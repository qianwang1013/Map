'use strict';

var mongoose = require('mongoose'),
	UserMap = mongoose.model('userMap'),
	errorHandler = require('./errors.server.controller');
/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};
