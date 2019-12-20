const request = require('request');

module.exports = (url, options) => {
    return new Promise((resolve, reject) => {
        request(url, options, (err, res, body) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(body);
            }
        });
    });
};