"use strict";
let router = require("express").Router();
const { check, validationResult } = require("express-validator");
const cacheController = require("../controllers/cacheController");
const quotesHelper = require("../helpers/quotes");
const responseHelper = require("../helpers/response");


// api Routes
router.get(
    "/quote",
    [
        check("from_currency_code")
            .not()
            .isEmpty()
            .isString(),
        check("to_currency_code")
            .not()
            .isEmpty()
            .isString(),
        check("amount")
            .not()
            .isEmpty()
            .isInt()
    ],
    (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    cacheController
        .findCachedQuote(req.query.from_currency_code)
        .then(async quote => {
            if(quote) {
                return res.json(responseHelper.createResponseFromQuote(quote, req.query.to_currency_code, req.query.amount));
            } else {
                let quote = await quotesHelper.getQuotes(req.query.from_currency_code);

                if(quote.error) {
                    return res.status(422).json({ errors: quote.error });
                }

                cacheController.createCache(quote, req.query.from_currency_code);
                return res.json(responseHelper.createResponseFromQuote(quote, req.query.to_currency_code, req.query.amount));
            }
        })
        .catch(async function(e) {
            let quote = await quotesHelper.getQuotes(req.query.from_currency_code);

            if(quote.error) {
                return res.status(422).json({ errors: quote.error });
            }
            return res.json(responseHelper.createResponseFromQuote(quote, req.query.to_currency_code, req.query.amount));
        });
    }
);

module.exports = router;
