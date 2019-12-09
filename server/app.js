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

app.get('*', (req, res) => {
	console.log(res);
	console.log(req);
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
