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
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    comment:{
        type: String,
        trim: true,
        default: ''
    }
});

mongoose.model('Comment', CommentSchema);
