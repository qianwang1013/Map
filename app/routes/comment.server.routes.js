/**
 * Created by qian on 4/30/2015.
 */

'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var comment = require('../../app/controllers/comment.server.controller');

    // Usermaps Routes
    app.route('/comment')
        .get(comment.find)
        .post(comment.create);

    app.route('/comment/:commentId')
        .delete(comment.delete);

};
