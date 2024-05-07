const express = require('express');
const Joi = require('joi');

const app = express();

let uniqueID = 0;
const articles = [];

const articleScheme = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(10).required(),
});

const idScheme = Joi.object({
    id: Joi.number().required(),
});

app.use(express.json());

app.get('/articles', (req, res) => {
    res.send({ articles });
});

app.get('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null});
    }
});  

app.post('/articles', (req, res) => {
    const articleValidationResult = articleScheme.validate(req.body);
    if (articleValidationResult.error) {
        return res.status(400).send(articleValidationResult.error.details);
    }

    uniqueID += 1;

    articles.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID,
    });
});



app.put('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const articleValidationResult = articleScheme.validate(req.body);
    if (articleValidationResult.error) {
        return res.status(400).send(articleValidationResult.error.details);
    }

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

app.delete('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error);
    }

    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        const articleIndex = articles.indexOf(article);
        articles.splice(articleIndex, 1);

        res.send({ article });
    } else {
        res.status(404).send('article: null');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// const schema = Joi.object({
//     id: Joi.number().required(),
//     title: Joi.string().min(1).required(),
//     content: Joi.string().min(10).required(),
// });

// const result = schema.validate({
//     id: 1,
//     title: '1',
//     content: '0123456789',
// });

// console.log(result.error?.details);