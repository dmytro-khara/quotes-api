const https = require('https');
const quote_api_url = process.env.QUOTE_API_URL || 'https://api.exchangeratesapi.io/latest?base=';

const getQuotes = async (code) => {

    return new Promise(async (resolve, reject) => {
        https.get(quote_api_url + code, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject (err);
        });
    });
};

module.exports = {
    getQuotes,
};
