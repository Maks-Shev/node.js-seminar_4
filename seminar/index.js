const express = require('express');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const filePath = path.join(__dirname, 'users.json');

const app = express();

let uniqueID = 0;

app.use(express.json());

const scheme = Joi.object({
        firstName: Joi.string().min(1).required(),
        secondName: Joi.string().min(1).required(),
        city: Joi.string().min(2),
        age: Joi.number().min(0).max(300).required(),
});

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null});
    }
});

app.put('/users/:id', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details);
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.city = req.body.city;
        user.age = req.body.age;
        fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null});
    }
});

app.post('/users', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details);
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const maxId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
    
    const newUser = {
        id: maxId + 1,
        ...req.body
        // firstName: req.body.firstName,
        // secondName: req.body.secondName,
        // city: req.body.city,
        // age: req.body.age,
    };
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
     res.send({ newUser });
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
        res.send({ status: 'OK' });
    } else {
        res.status(404);
        res.send({ user: null});
    }
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});