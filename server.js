var express = require('express');
var open = require('open')
var app = express();

var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
};

app.use(express.static('public'));

app.post('/', function (req, res) {
    res.sendFile('public/index.html', options);
});

app.get('/api/test_request', function (req, res) {
    res.send('Some text data loaded with AJAX via XMLHttpRequest');
});

app.get('/api/slow_test_request', function (req, res) {
    setTimeout(function () {
        res.send('Some text data loaded with AJAX via XMLHttpRequest');
    }, 5000);
});

app.get('/api/get_text', function (req, res) {
    res.sendFile('./responses/test.txt', options);
});

app.get('/api/get_html', function (req, res) {
    res.sendFile('./responses/test.html', options);
});

app.get('/api/get_xml', function (req, res) {
    res.sendFile('./responses/test.xml', options);
});

app.get('/api/get_json', function (req, res) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.sendFile('./responses/test.json', options);
});

var person = {
    name: 'Alex',
    lastname: 'Fitiskin',
    country: 'Cyprus',
    age: 27,
    job: {
        company: 'Webzilla',
        position: 'Front-end web developer'
    },
    hobbies: ['Football', 'Snowboard', 'Wakeboard', 'Hiking'],
    online: true,
};

app.get('/api/get_other_json', function (req, res) {
    res.json(person);
});

app.get('/api/get_jsonp', function (req, res) {
    res.jsonp(person);
});

app.get('/api/get_other_jsonp', function (req, res) {
    res.jsonp(person);
});

app.get('*', function (req, res) {
    res.status(404).send('404 not found');
});

var port = process.env.port || 3000;
var url = process.env.APPLICATION_URL || 'http://localhost:' + port;
app.listen(port, function () {
    console.log('Simple server listening on port %s! Open %s in your browser to see the result.', port, url);
});
