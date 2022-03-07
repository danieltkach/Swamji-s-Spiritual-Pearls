const fastifyPlugin = require('fastify-plugin');

async function dbConnector(fastify, options) {
	fastify.register(require('fastify-mongodb'), {
		url: 'mongodb://localhost:27017/questions-answers'
	});
}

module.exports = fastifyPlugin(dbConnector);