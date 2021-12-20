const express = require('express');
const {animals} = require('./data/animals');

const app = express();

function filterByQuery(query, animalsArray){
    let filteredResults = animalsArray;
    let personalityTraitsArray = [];

    // Initialize array to handle 1 or multiple personalities
    typeof query.personalityTraits === 'string' ?  personalityTraitsArray = [query.personalityTraits] :  personalityTraitsArray = query.personalityTraits;

    // For each trait, if it exists, filter animal
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

app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`)
})