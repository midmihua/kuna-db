const db = require('../models/kunaModel');

function fetchAllData(req, next) {
    let find = JSON.stringify(req.query) === '{}' ? db.find() : db.find(dynamicQuery(req.query));
    return new Promise(resolve => {
        find.then((records) => {
            let toRespond = (records === null || records === undefined || records.length <= 0) ?
                { response: { warning: "Requested data was not found" } } : { response: records };
            toRespond.status = 200;
            resolve(toRespond);
        }).catch(next);
    });
}

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

module.exports = {
    fetchAllData
}