var express = require('express'),
	path = require('path'),
	app = express(),
	bodyParser = require('body-parser'),
	db = require('./mydatabase/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '../public/')));
app.get('/body/:name', require('./routes/index.js'));
app.get('/setting/:name', require('./routes/index.js'));
app.get('/amount/:name', require('./routes/index.js'));
app.get('/log', require('./routes/index.js'));
app.post('/data', require('./routes/index.js'));
app.get('/oper/', require('./routes/index.js'));

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../public/index.html'))});

db.connect(() => {
    app.listen(3000,console.log('Server on 3000'));
});