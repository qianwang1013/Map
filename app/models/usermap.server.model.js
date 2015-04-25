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
		type: string,
		default: ''
	},
	long:{
		type:string,
		default:''
	},
	locationName:{
		type:string,
		default:'',
		trim:true
	},
	locationNote:{
		type:string,
		default:'',
		trim:true
	}
});

mongoose.model('Usermap', UsermapSchema);
