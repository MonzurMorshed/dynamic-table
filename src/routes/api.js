const express = require('express');
const ListController = require('../controllers/ListController');
const router = express.Router();

router.get('/List/:pageNo/:perPage/:searchKeyword',ListController.ItemList);

module.exports = router;