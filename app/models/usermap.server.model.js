'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Usermap Schema
 */
var UsermapSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Usermap name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	lat:{
		type: Number,
		default: ''
	},
	lng:{
		type:Number,
		default:''
	},
	description:{
		type: String,
		default: ''
	},
	notes:{
		type: String,
		default: ''
	},
	link:{
		type: String,
		default: '',
		trim: true
	},
	category:{
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Usermap', UsermapSchema);
