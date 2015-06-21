/**
 * Created by qian on 4/27/2015.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Usermap Schema
 */
var CommentSchema = new Schema({
    fromUser: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    toUser:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    comment:{
        type: String,
        trim: true,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Comment', CommentSchema);
