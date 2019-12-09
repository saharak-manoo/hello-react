const express = require('express');
const path = require('path');
const { Client } = require('pg');
const connectionString = 'postgres://saharak:@localhost:5432/ruby_on_rails_dev';

const client = new Client({
	connectionString: connectionString
});

client.connect();

const app = express();

// Server static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/students', (req, res, done) => {
	client.query('SELECT * FROM students', function(err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result.rows);
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
