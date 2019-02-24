const db = require('../models/kunaModel');
const KunaData = require('./kuna_api');

async function addHistSlice() {
    // Init KubaData instance
    const kuna = new KunaData();
    // Get hist data
    kuna.market_data()
        .then(jsonResponse => {
            for (let key in jsonResponse) {
                // Current history slice
                const current_data = {
                    'at': jsonResponse[key].at,
                    'buy': jsonResponse[key].ticker.buy,
                    'sell': jsonResponse[key].ticker.sell,
                    'low': jsonResponse[key].ticker.low,
                    'high': jsonResponse[key].ticker.high,
                    'last': jsonResponse[key].ticker.last,
                    'vol': jsonResponse[key].ticker.vol,
                    'price': jsonResponse[key].ticker.price
                };
                // Create or update hist data
                db.updateOne({ coin: key }, { $push: { hist: current_data } }, { upsert: true }, (err) => {
                    if (err) {
                        // logger should be here
                        console.log('Error while saving/updaing addHistSlice data : ', err);
                        return;
                    }
                    // logger should be here
                    // console.log('New addHistSlice raw has been saved');
                });
            }
        })
        .catch(err => {
            // logger should be here
            console.log('Error while updating addHistSlice data: ', err);
        });
}

module.exports = {
    'addHistSlice': addHistSlice
};