const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

// Allows you to dclare routes in any file, complete middleware and routing system
const router = require('express').Router();

// Get request for animal properties (parameter) returns a json object responses
router.get('/animals', (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Get request for specific iD (parameter) returns a json object response
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    result ? res.json(result) : res.send(404);
});

// Post request and sending a request of an animal object and getting a response of an animal made
router.post('/animals', (req, res) => {
    req.body.id = animals.length.toString(); // set new id to be new string
    if (!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.')
    }else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;