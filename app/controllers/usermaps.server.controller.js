'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Usermap = mongoose.model('Usermap'),
	_ = require('lodash');

/**
 * Create a Usermap
 */
exports.create = function(req, res) {
	var usermap = new Usermap(req.body);
	usermap.user = req.user;

	usermap.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(usermap);
		}
	});
};

/**
 * Show the current Usermap
 */
exports.read = function(req, res) {
	res.jsonp(req.usermap);
};

/**
 * Update a Usermap
 */
exports.update = function(req, res) {
	var usermap = req.usermap ;

	usermap = _.extend(usermap , req.body);

	usermap.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(usermap);
		}
	});
};

/**
 * Delete an Usermap
 */
exports.delete = function(req, res) {
	var usermap = req.usermap ;

	usermap.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(usermap);
		}
	});
};

/**
 * List of Usermaps
 */
exports.list = function(req, res) { 
	Usermap.find().sort('-created').populate('user', 'displayName').exec(function(err, usermaps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(usermaps);
		}
	});
};

/**
 * Usermap middleware
 */
exports.usermapByID = function(req, res, next, id) { 
	Usermap.findById(id).populate('user', 'displayName').exec(function(err, usermap) {
		if (err) return next(err);
		if (! usermap) return next(new Error('Failed to load Usermap ' + id));
		req.usermap = usermap ;
		next();
	});
};

/**
 * Usermap authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.usermap.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.getCoord = function(req,res){
	Usermap.find().sort('-created').populate('user', 'displayName').exec(function(err, usermaps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var coord = [];

			for(var i = 0; i !== usermaps.length; ++i){
				coord.push({
						lat: usermaps[i].lat,
						lng: usermaps[i].lng
					});
			}
/*			console.log(coord);*/
			res.jsonp(coord);
		}
	});
};

exports.getCategory = function(req, res){
	console.log('here');
	Usermap.find().sort('-created').populate('user','displayName').exec(function(err,usermaps){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var categoryList = [];
			var temp = '';
			//inserting the first category string for compare purpose

			for(var i = 0; i !== usermaps.length; ++i){
				temp = usermaps[i].category;
				if(usermaps[i].category !== '' && categoryList.indexOf(temp) === -1){
					categoryList.push(
						temp
					);
				}
			}
/*			console.log(coord);*/
			console.log('test category');
			console.log(categoryList);
			res.jsonp(categoryList);
		}
	});
};
