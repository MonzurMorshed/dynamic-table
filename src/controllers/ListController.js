const ListModel = require('../models/ListModel');

exports.ItemList = async (req,res) => {
    res.status(200).json({
        status: 'success'
    })
}