const fastifyPlugin = require('fastify-plugin');

const localConnectionString = 'mongodb://localhost:27017/teachings';
const dbConnectionString1 = 'mongodb+srv://swamiji:OmnamaHshivAyaH@cluster0.g6zoh.mongodb.net/development?retryWrites=true&w=majority';
const dbConnectionString2 = 'mongodb://swamiji:OmnamaHshivAyaH@cluster0-shard-00-00.g6zoh.mongodb.net:27017,cluster0-shard-00-01.g6zoh.mongodb.net:27017,cluster0-shard-00-02.g6zoh.mongodb.net:27017/development?ssl=true&replicaSet=atlas-r0l1zt-shard-0&authSource=admin&retryWrites=true&w=majority';

async function dbConnector(fastify, options) {
	fastify.register(require('fastify-mongodb'), {
		url: dbConnectionString1,
	});
}

module.exports = fastifyPlugin(dbConnector);