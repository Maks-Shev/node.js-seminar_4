const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkBody, checkParams } = require('./validation/validator');
const { productScheme, idScheme} = require('./validation/scheme');

const filePath = path.join(__dirname, 'products.json');
const app = express();

let uniqueID = 0;

app.use(express.json());


app.get('/product', (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.send({ products });
});

app.get('/product/:id', checkParams(idScheme), (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const product = products.find((product) => product.id === Number(req.params.id));
    if (product) {
        res.send({ product });
    } else { 
        res.status(404);
        res.send({ product: null });
    }
});

app.post('/product', checkBody(productScheme), (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const maxId = products.reduce((max, product) => product.id > max ? product.id : max, 0);

    const newProduct = {
        id: maxId + 1,
       ...req.body
    };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products), 'utf8');
    res.send({ newProduct });

});

app.put('/product/:id', checkParams(idScheme), checkBody(productScheme), (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const product = products.find((product) => product.id === Number(req.params.id));
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category;
        product.color = req.body.color;
        fs.writeFileSync(filePath, JSON.stringify(products), 'utf8');
        res.send({ product });
    } else {
        res.status(404);
        res.send({ product: null});
    }
});

app.delete('/product/:id', checkParams(idScheme), (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const product = products.find((product) => product.id === Number(req.params.id));
    if (product) {
        const productIndex = products.indexOf(product);
        products.splice(productIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(products), 'utf8');
        res.send({ status: 'OK' });
    } else {
        res.status(404);
        res.send({ product: null});
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


