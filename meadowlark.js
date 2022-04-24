const express = require('express');
const expressHandlebars = require('express-handlebars');
const { engine } = expressHandlebars;

const app = express();

engine({ defaultLayout: 'main' });
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const port = process.env.port || 3000;

const fortuneCookies = [
    'Победи свои страхи, или они победят тебя.',
    'Рекам нужны истоки.',
    'Не бойся неведомого.',
    'Тебя ждет приятный сюрприз.',
    'Будь проще везде, где только можно.',
];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    const randomFortune = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
    res.render('about', { fortune: randomFortune });
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