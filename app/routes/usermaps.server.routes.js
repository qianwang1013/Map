'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var usermaps = require('../../app/controllers/usermaps.server.controller');

	// Usermaps Routes
	app.route('/usermaps')
		.get(usermaps.list)
		.post(users.requiresLogin, usermaps.create);
	app.route('/usermaps/getCategory').post(usermaps.getCategory);
	app.route('/usermaps/getCoord').post(usermaps.getCoord);
	app.route('/usermaps/:usermapId')
		.get(usermaps.read)
		.put(users.requiresLogin, usermaps.hasAuthorization, usermaps.update)
		.delete(users.requiresLogin, usermaps.hasAuthorization, usermaps.delete);

	// Finish by binding the Usermap middleware
	app.param('usermapId', usermaps.usermapByID);
};
