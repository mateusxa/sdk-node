const event = require('./event.js');

exports.attempt = require('./attempt');
exports.get = event.get;
exports.query = event.query;
exports.page = event.page;
exports.update = event.update;
exports.delete = event.delete;
exports.parse = event.parse;
exports.Event = event.Event;
