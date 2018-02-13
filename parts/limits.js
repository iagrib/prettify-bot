// A very basic 'cooldown'-like system
// Probably to be improved

"use strict";

const {lmax = 10, lms = 60000, lreset = 60000} = require("./config");

const limits = {};

setInterval(() => {
	const now = Date.now();
	for(const id in limits) if(now - limits[id][0] > lreset) delete limits[id];
}, lms);

module.exports = {
	add: (id, n) => limits[id] = [Date.now(), (limits[id] ? limits[id][1] : 0) + n],
	get: id => limits[id] && limits[id][1] >= lmax
};