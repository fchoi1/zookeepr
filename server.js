const express = require('express');
const { animals } = require('./data/animals');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// The specificed folder to be readilty available (middleware)
app.use(express.static('public'));


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;
    // Initialize array to handle 1 or multiple personalities
    if(query.personalityTraits){
        typeof query.personalityTraits === 'string' ?  personalityTraitsArray = [query.personalityTraits] :  personalityTraitsArray = query.personalityTraits;
    }   // For each trait, if it exists, filter animal
    personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter( animal => animal.personalityTraits.indexOf(trait) !== -1);
    });

    // Filter by other query parameters
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray){
    const animal = body;

    animalsArray.push(animal);
    fs.writeFileSync(path.join(__dirname, './data/animals.json'), JSON.stringify({animals : animalsArray}, null, 2));

    return body;
}

function validateAnimal(animal){
    return !animal.name || typeof animal.name !== 'string'
    || !animal.species || typeof animal.species !== 'string'
    || !animal.diet || typeof animal.diet !== 'string'
    || !animal.personalityTraits || !Array.isArray(animal.personalityTraits)
    ? false : true;
}


// Get request for animal properties (parameter) returns a json object responses

app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Get request for specific iD (parameter) returns a json object response
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    result ? res.json(result) : res.send(404);
});

// Post request and sending a request of an animal object and getting a response of an animal made
app.post('/api/animals', (req, res) => {
    req.body.id = animals.length.toString(); // set new id to be new string
    if (!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.')
    }else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

// Get request and getting the response from server via html
app.get('/', (req, res) => {
    //res.sendFile('./public/index.html');
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
})

app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
})

// Wildcard to return to index if not found, should always come last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})