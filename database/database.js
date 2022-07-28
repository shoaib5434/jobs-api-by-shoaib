const { Pool } = require('pg');

const client = new Pool({
	connectionString : `postgres://nrkbnksnetmdiq:21e286ae666c98f6c00dc96160b14caf411c1b1b8d643add60f9aec037137001@ec2-54-208-104-27.compute-1.amazonaws.com:5432/dd2l5hodun7u5m
`,
	ssl : {rejectUnauthorized : false}
})

// client.connect();

module.exports = client;