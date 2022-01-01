// Import other router (using relative paths)
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');
const router = require('express').Router();

router.use(animalRoutes, zookeeperRoutes);

module.exports = router;
