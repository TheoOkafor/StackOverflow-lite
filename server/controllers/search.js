import db from '../db';

const search = (req, res) => {
	let userQuery = req.query.search;
	if (!userQuery) {
		res.status(400);
		res.json({
			statusCode: 400,
			error: 'Invalid search request, no query provided',
		});
		return res;
	} else {
		userQuery = userQuery.split(' ').join(' & ')
		const query = `SELECT * FROM questions WHERE 
			to_tsvector('english', title || '. ' || body) 
			@@ to_tsquery('english', $1)`;

		userQuery.trim();

		db.any(query, [userQuery])
		.then(data => {
			if (data.length <= 0) {
				res.status(404);
				res.json({
					statusCode: 404,
					error: 'Question not found',
				});
				return res;
			} else {
				res.status(200);
				res.json({
					statusCode: 200,
					message: 'Question(s) found',
					data,
				});
				return res;
			}
		})
		.catch(error => {
			console.log(error);
		})
	}
}

export default search;
