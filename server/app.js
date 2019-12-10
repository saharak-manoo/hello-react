const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const connectionString = 'postgres://saharak:@localhost:5432/ruby_on_rails_dev';

const client = new Client({
	connectionString: connectionString
});

client.connect();

const app = express();

// Server static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

app.get('/api/students', (req, res) => {
	client.query('SELECT * FROM students', function(err, result) {
		if (err) {
			res.status(400).send({ students: [], success: false, errors: err });
		} else {
			res.status(200).send({ students: result.rows, success: true, errors: null });
		}
	});
});

app.post('/api/students', (req, res) => {
	let student = req.body.student;
	let query = {
		text:
			'INSERT INTO students (first_name, last_name, status, created_at, updated_at, class_level_id, credits_earned, total_vacation)  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		values: [student.firstName, student.lastName, student.status, new Date(), new Date(), 1, 10, 10]
	};

	client.query(query, (err, result) => {
		if (err) {
			res.status(400).send({ student: null, success: false, errors: err });
		} else {
			res.status(200).send({ students: result.rows[0], success: true, errors: null });
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
