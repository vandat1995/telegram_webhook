const logger = require('../../config/logger');
const config =  require('../../config/config.json');
const request = require('../utils/HttpRequest');
const URL_SEND_MSG = `${config.botUrl}/sendMessage`;
const URL_SEND_STICKER = `${config.botUrl}/sendSticker`;
const CHAT_ID = 1062380799;

const handler = async (req, h) => {
    try {
        let data = req.payload;
        logger.info(`[${req.method}: ${req.path}] - ${JSON.stringify(data)}`);
      
        let msgReply = data.msg;
        if (msgReply) {
            let payload = JSON.stringify({
                'chat_id': CHAT_ID,
                'text': msgReply
            });
            logger.info(`[SEND_TELE]: ${payload}`);
            let reply = await request(URL_SEND_MSG, {
                headers: {
                    'content-type': 'application/json'
                },
                body: payload
            });
            logger.info(`[RES_TELE]: ${reply}`);
        }
    } catch (e) {
        logger.error(e.toString());
    } 
    return {'error': 0};
};

module.exports = handler;