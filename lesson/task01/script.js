const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const articles = [
    { title: 'Article 1', description: 'First awesome article'},
    { title: 'Article 2', description: 'Second awesome article'},
    { title: 'Article 3', description: 'Third awesome article'},
];

app.get('/', (req, res) => {
    res.render('home', { layout: 'index', title: 'Home', articles });
});

app.listen(3000);