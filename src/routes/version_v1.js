const express = require('express');
const router = express.Router();
const db = require('../models/kunaModel');

// Get history data
router.get('/hist', (req, res, next) => {
    if (JSON.stringify(req.query) === '{}') {
        db.find().then((records) => {
            if (records === null || records === undefined)
                res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
    else {
        db.find(dynamicQuery(req.query)).then((records) => {
            if (records === null || records === undefined || records.length == 0)
                res.send({ result: 'Requested data was not found' });
            else
                res.status(200).send(records);
        }).catch(next);
    }
});

function dynamicQuery(data) {
    let query = {};
    Object.keys(data).forEach(function (key) {
        if (key.toLocaleLowerCase() === 'coin')
            query['coin'] = data[key];
        else if (key.toLocaleLowerCase() === 'id')
            query['_id'] = { $in: data[key] };
        else if (key.toLocaleLowerCase() === 'desc')
            query['desc'] = { $regex: '.*' + data[key] + '.*' };
    });
    return query;
}

module.exports = router;