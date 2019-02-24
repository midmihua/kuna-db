const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    coin: { type: String, required: true },
    desc: String,
    hist: [
        {
            at: { type: String, required: true },
            buy: { type: String, required: true },
            sell: { type: String, required: true },
            low: { type: String, required: true },
            high: { type: String, required: true },
            last: { type: String, required: true },
            vol: { type: String, required: true },
            price: { type: String, required: true }
        }
    ]
});

HistorySchema.index({ coin: 1 }, { unique: true });
const HistoryModel = mongoose.model(process.env.MONGO_HISTORY, HistorySchema);

module.exports = HistoryModel;

// Example
// {
//     "at": server time,
//     "ticker": {
//         "buy": BTC price for buy,
//         "sell": BTC price for sale,
//         "low": the lowest price of the trade in 24 hours,
//         "high": the highest price of the trade in 24 hours,
//         "last": price of the last trade,
//         "vol": volume of trading in base currency for 24 hours,
//         "amount": total price of trading in quote currency for 24 hours
//     }
// }
// at	1550958501
// ticker	
// buy	"108438.0"
// sell	"108960.0"
// low	"103730.0"
// high	"110100.0"
// last	"108960.0"
// vol	"29.983811"
// price	"3187868.104619"