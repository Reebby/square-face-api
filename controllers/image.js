const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cf019fde812f43859689f069f79254bd'
});

const handleApiCall = (req, res) => {
	const { input } = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(data => res.json(data)).catch(err => res.status(400).json('error getting api'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
		db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		}).catch(err => res.status(400).json('something went wrong'))
	}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}