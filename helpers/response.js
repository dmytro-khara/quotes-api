const createResponseFromQuote =  (quotes, code, amount) => {

    let parsedQuote = JSON.parse(quotes);
    let rate = parsedQuote.rates[code];
    let result = amount * rate;

    return {
        exchange_rate: rate.toFixed(3).toString(),
        currency_code: code,
        amount: result.toFixed(0)
    }
};


module.exports = {
    createResponseFromQuote,
};
