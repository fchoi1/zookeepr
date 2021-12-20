const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

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
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    result ? res.json(result) : res.send(404);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})