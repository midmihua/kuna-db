const request = require('request-promise-native');

class KunaData {

    constructor() {
        this.url = 'https://kuna.io';
    }

    // Public
    async server_time() {
        try {
            const response = await request(`${this.url}/api/v2/timestamp`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request kuna.io time');
        }
    }

    async order_book(coin) {
        try {
            if (coin === undefined)
                throw new Error('Pair is not provided');
            const response = await request(`${this.url}/api/v2/depth?market=${coin}`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get Order Book data');
        }
    }

    async recent_trades(coin) {
        try {
            if (coin === undefined)
                throw new Error('Pair is not provided');
            const response = await request(`${this.url}/api/v2/trades?market=${coin}`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get Recent Trades data');
        }
    }

    async market_data(coin) {
        try {
            const url = (coin !== undefined) ?
                `${this.url}/api/v2/tickers/${coin}` : `${this.url}/api/v2/tickers`;
            const response = await request(url);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get Recent Market data');
        }
    }

    // Private - tbd

}

module.exports = KunaData;