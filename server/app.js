'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = async function (fastify, opts) {
	fastify.register(require('./db-connector'));

	fastify.register(require('fastify-cors'), {
		origin: "*",
    methods: ["GET"]
	});
	
	fastify.register(require('fastify-cors'), {
		origin: "https://swamijis-spiritual-pearls.herokuapp.com/",
    methods: ["GET, POST"]
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts)
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts)
	});
};
