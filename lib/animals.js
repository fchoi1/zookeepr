const path = require('path');
const fs = require('fs')

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
    fs.writeFileSync(path.join(__dirname, '../data/animals.json'), JSON.stringify({animals : animalsArray}, null, 2));

    return body;
}

function validateAnimal(animal){
    return !animal.name || typeof animal.name !== 'string'
    || !animal.species || typeof animal.species !== 'string'
    || !animal.diet || typeof animal.diet !== 'string'
    || !animal.personalityTraits || !Array.isArray(animal.personalityTraits)
    ? false : true;
}

module.exports = { filterByQuery, findById, createNewAnimal, validateAnimal };