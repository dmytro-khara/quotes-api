const createResponseFromQuote =  (quotes, code, amount) => {

    let parsedQuote = JSON.parse(quotes);
    let rate = parsedQuote.rates[code];

    return {
        exchange_rate: rate.toFixed(3).toString(),
        currency_code: code,
        amount: amount * rate
    }
};


module.exports = {
    createResponseFromQuote,
};
