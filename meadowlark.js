const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');

const { engine } = expressHandlebars;

const app = express();

engine({ defaultLayout: 'main' });
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', handlers.home);
app.get('/about', handlers.about);

app.use((req, res) => handlers.notFound);
app.use((err, req, res, next) => handlers.serverError);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
