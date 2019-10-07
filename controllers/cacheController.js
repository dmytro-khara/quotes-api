'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Cache = require('../database/models').Cache;

module.exports = {
    createCache: async (quote, code) => {

        return new Promise(async (resolve, reject) => {
            Cache.create({
                rates: quote,
                from_currency_code: code
            }).then(function (quote) {
                if (quote) {
                    resolve (quote.dataValues);
                } else {
                    reject('Cache record not inserted');
                }
            });
        });
    },
    findCachedQuote: async (code) => {

        return new Promise(async (resolve, reject) => {
            Cache.findOne({
                where: {
                    from_currency_code: code,
                    created_at: {
                        [Op.lt]: Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '10 minutes'"),
                    },
                }
            }).then(async function (cache_record) {

                if (cache_record) {
                    resolve(cache_record.dataValues);
                } else {
                    resolve(false);
                }
            });
        });
    },
};
