/**
 * Created by qian on 4/30/2015.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Comment = mongoose.model('Comment'),
    _ = require('lodash');


exports.create = function(req,res){
    var comment = new Comment(req.body);
    comment.user = req.user;

    comment.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(comment);
        }
    });
};

exports.find = function(req, res) {
    Comment.find().sort('-created').populate('user', 'displayName').exec(function(err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(data);
        }
    });
};
exports.delete = function(req,res){
    var comment = req.comment ;

    comment.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(comment);
        }
    });
};
