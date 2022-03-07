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

	fastify.get('/question-answer/:id', async (request, reply) => {
		const result = await collection.findOne({ _id: ObjectId(request.params.id)});
		if (!result) {
			throw new Error('Invalid value.');
		}
		return result;
	});

	const questionAnswerSchema = {
		type: 'object',
		required: ['answer'],
		properties: {
			answer: { type: 'string' },
		},
	};

	const schema = {
		body: questionAnswerSchema,
	};

	fastify.post('/question-answer', { schema }, async (request, reply) => {
		const result = await collection.insertOne({
			question: request.body.question, 
			answer: request.body.answer
		});
		return result;
	});
}

module.exports = routes;