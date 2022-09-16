const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const router = express.Router();
const app = express();

require('dotenv').config();
const Person = require('./models/person');

app.use(cors());

app.use(express.json());

router.get('/persons', (request, response, next) => {
    Person.find({}).then((persons) => response.json(persons))
        .catch((error) => next(error));
});

router.get('/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then((person) => {
        if (!person) {
            return response.status(404).end();
        }
        return response.json(person);
    })
        .catch((error) => next(error));
});

router.get('/info', (request, response) => {
    let info = 'Phonebook has info for people <br /><br />';
    const date = new Date();
    info += ` ${date}`;
    response.send(info);
});

router.delete('/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove({ _id: request.params.id })
        .then(() => response.status(204).end())
        .catch((error) => next(error));
});

router.put('/persons/:id', (request, response, next) => {
    const { name, number } = request.body;
    const Console = console; // Custom Console for eslint
    Console.log(name);

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' },
    )
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

router.post('/persons', (request, response, next) => {
    const { body } = request;
    Person.find({}).then((persons) => {
        if (persons.find((person) => person.name === body.name)) {
            return response.status(400).json(
                { error: 'name must be unique' },
            );
        }
        const person = new Person({
            name: body.name,
            number: body.number,
        });

        person.save().then((savedPerson) => {
            response.json(savedPerson);
        })
            .catch((error) => next(error));

        return null; // eslint consistent return
    })
        .catch((error) => next(error));
});

app.use('/.netlify/functions/index', router);

const errorHandler = (error, request, response, next) => {
    const Console = console;
    Console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    return next(error);
};

app.use(errorHandler);

module.exports.handler = serverless(app);
