const express = require('express');
const { checkBody, checkParams } = require('./validation/validator.js');
const { idScheme, articleScheme } = require('./validation/scheme.js');

const app = express();

let uniqueID = 0;
const articles = [];

app.use(express.json());


// Получить вспе статьи
app.get('/articles', (req, res) => {
    res.send({ articles });
});

// Получить конкретную статью
app.get('/articles/:id', checkParams(idScheme), (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null});
    }
});  

// Создание статьи
app.post('/articles', checkBody(articleScheme), (req, res) => {
    uniqueID += 1;

    articles.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID,
    });
});

// Изменени/обновление статьи
app.put('/articles/:id', checkParams(idScheme), checkBody(articleScheme), (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

// Удаление статьи
app.delete('/articles/:id', checkParams(idScheme), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        const articleIndex = articles.indexOf(article);
        articles.splice(articleIndex, 1);

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

// Обработка несуществующих роутов
app.use((req, res) => {
    res.status(404);
    res.send({ message: 'URL Not found' });
});


// запуск сервера
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});