const path = require('path');
const fs = require('fs')

function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;

    // Filter by other query parameters
    if(query.age){
        // convert to number for comparision
        filteredResults = filteredResults.filter(zookeepers => zookeepers.age === Number(query.age));
    }
    if(query.favoriteAnimal){
        filteredResults = filteredResults.filter(zookeepers => zookeepers.favoriteAnimal.toLowerCase() === query.favoriteAnimal.toLowerCase());
    }
    if (query.name) {
        filteredResults = filteredResults.filter(zookeepers => zookeepers.name.toLowerCase() === query.name.toLowerCase());
    }
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter(zookeepers => zookeepers.id === id)[0];
    return result;
}

function createNewZookeeper(body, zookeepers){
    const zookeeper = body;

    zookeepers.push(zookeeper);
    fs.writeFileSync(path.join(__dirname, '../data/zookeepers.json'), JSON.stringify({zookeepers : zookeepers}, null, 2));

    return body;
}

function validateZookeeper(zookeeper){
    return !zookeeper.name || typeof zookeeper.name !== 'string'
    || !zookeeper.age || typeof zookeeper.age !== 'number'
    || !zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string'
    ? false : true;
}

module.exports = { filterByQuery, findById, createNewZookeeper, validateZookeeper };