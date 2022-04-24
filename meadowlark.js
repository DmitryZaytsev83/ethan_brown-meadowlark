const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortuneCookie = require('./lib/fortune');

const { engine } = expressHandlebars;

const app = express();

engine({ defaultLayout: 'main' });
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortuneCookie.getFortune() });
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});