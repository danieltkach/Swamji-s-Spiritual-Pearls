let ObjectId = require('mongodb').ObjectId;

async function routes(fastify, options) {
	const collection = fastify.mongo.db.collection('questions-answers');

	fastify.get('/', async (request, reply) => {
		return { mantra: 'ॐ नमः शिवाय' };
	});

	fastify.get('/all', async (request, reply) => {
		const result = await collection.find().toArray();
		if (result.length === 0) {
			throw new Error('No data found.');
		}
		return result;
	});

	fastify.get('/teaching/:id', async (request, reply) => {
		const result = await collection.findOne({ _id: ObjectId(request.params.id) });
		if (!result) {
			throw new Error('Invalid value.');
		}
		return result;
	});

	const teachingSchema = {
		type: 'object',
		properties: {
			teaching: { type: 'string' },
			questions: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						question: { type: 'string' },
						answer: { type: 'string' }
					}
				}
			},
		}
	};

	const schema = {
		body: teachingSchema,
	};

	fastify.post('/new-teaching', { schema }, async (request, reply) => {
		const result = await collection.insertOne({
			teaching: request.body.teaching,
			questions: request.body.questions
		});
		return result;
	});
}

module.exports = routes;
