const express = require('express');
const router = express.Router();
const { fetchAllData } = require('./fetch')
const { getHistMetrics, } = require('../boundary/prepare_data');
const { getSpecificIntervalHist } = require('../boundary/prepare_data');
const { getIntervalNumber } = require('../boundary/prepare_data');

// Get history data - full scope
router.get('/hist', (req, res, next) => {
    fetchAllData(req, next)
        .then(data => {
            res.status(data.status).send(data.response);
        })
        .catch(next);
});

// Get history data on interval
router.get('/hist/:interval', (req, res, next) => {
    if (!getIntervalNumber(req.params.interval)) {
        res.status(200).send({ "Warning": "Wrong interval value is provided" });
    }
    else {
        fetchAllData(req, next)
            .then(data => {
                res.status(data.status).send(getSpecificIntervalHist(data.response, req.params.interval));
            })
            .catch(next);
    }
});

// Get hist data - metrics
router.get('/metrics', (req, res, next) => {
    fetchAllData(req, next)
        .then(data => {
            res.status(data.status).send(getHistMetrics(data.response));
        })
        .catch(next);
});

module.exports = router;