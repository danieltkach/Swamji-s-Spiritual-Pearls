let ObjectId = require('mongodb').ObjectId;

async function routes(fastify, options) {
	const collection = fastify.mongo.db.collection('teachings');

	fastify.get('/', async (request, reply) => {
		return { mantra: 'ॐ नमः शिवाय' };
	});

	fastify.get('/count', async (request, reply) => {
		const teachings = await collection.find().project({ teaching: 1, _id: 0 }).toArray();
		
		let wordsCount = {};

		teachings.forEach(teaching => {
			console.log(teaching)
			let words = teaching.teaching.split(' ');
			words.forEach(word => {
				if (!wordsCount[word]) {
					wordsCount[word] = 0;
				}
				wordsCount[word]++;
			});
		});

		return wordsCount;
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
		required: ['teaching'],
		properties: {
			question: { type: 'string' },
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
			question: request.body.question,
			teaching: request.body.teaching,
			questions: request.body.questions
		});
		return result;
	});
}

module.exports = routes;
