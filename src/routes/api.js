const express = require('express');
const ListController = require('../controllers/ListController');
const router = express.Router();

router.get('/List/:pageNo/:perPage/:searchKeyword/:key/:sortVal',ListController.ItemList);

module.exports = router;