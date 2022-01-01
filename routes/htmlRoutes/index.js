const path = require('path');
const router = require('express').Router();

// Get request and getting the response from server via html
router.get('/', (req, res) => {
    //res.sendFile('./public/index.html');
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// Wildcard to return to index if not found, should always come last
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

module.exports = router;