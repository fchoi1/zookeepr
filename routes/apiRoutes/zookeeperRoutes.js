const {  filterByQuery,  findById,  createNewZookeeper,  validateZookeeper} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");


// Allows you to dclare routes in any file, complete middleware and routing system
const router = require('express').Router();

// Get request for zookeeper properties (parameter) returns a json object responses
router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Get request for specific iD (parameter) returns a json object response
router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    result ? res.json(result) : res.send(404);
});

// Post request and sending a request of an zookeeper object and getting a response of an zookeeper made
router.post('/zookeepers', (req, res) => {
    req.body.id = zookeepers.length.toString(); // set new id to be new string
    if (!validateZookeeper(req.body)){
        res.status(400).send('The zookeeper is not properly formatted.')
    }else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;