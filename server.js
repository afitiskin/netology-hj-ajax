var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
};

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false,
}));

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
    res.sendFile('./responses/response.txt', options);
});

app.get('/api/get_html', function (req, res) {
    res.sendFile('./responses/response.html', options);
});

app.get('/api/get_xml', function (req, res) {
    res.sendFile('./responses/person.xml', options);
});

app.get('/api/get_json', function (req, res) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.sendFile('./responses/person.json', options);
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

app.get('/homework/login_xml', function (req, res) {
    res.status(400).sendFile('./responses/400.xml', options);;
});

app.post('/homework/login_xml', function (req, res) {
    setTimeout(function () {
        if (req.body && req.body.email === 'test@netology.ru' && req.body.password === '12345') {
            res.sendFile('./responses/person.xml', options);
        } else {
            res.status(401).sendFile('./responses/401.xml', options);;
        }
    }, 3000);
});

app.get('/homework/login_json', function (req, res) {
    res.status(400).sendFile('./responses/400.json', options);;
});

app.post('/homework/login_json', function (req, res) {
    setTimeout(function () {
        if (req.body && req.body.email === 'test@netology.ru' && req.body.password === '12345') {
            res.sendFile('./responses/person.json', options);
        } else {
            res.status(401).sendFile('./responses/401.json', options);;
        }
    }, 3000);
});

app.get('*', function (req, res) {
    res.status(404).send('404 not found');
});

var port = process.env.PORT || 3000;
var url = 'http://localhost:' + port;
app.listen(port, function () {
    console.log('Simple server listening on port %s! Open %s in your browser to see the result.', port, url);
});
