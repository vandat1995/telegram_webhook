const { exec } = require('child_process');
const logger = require('../../config/logger');
const config =  require('../../config/config.json');
const request = require('../utils/HttpRequest');
const urlSendMessage = `${config.botUrl}/sendMessage`;
const urlSendSticker = `${config.botUrl}/sendSticker`;


const execShell = command => {
    return new Promise(resolve => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                logger.error(err.toString());
                return resolve(err.toString());
            }
            return resolve(stdout);
        });
    });
};

const handler = async (req, h) => {
    try {
        let data = req.payload;
        logger.info(`[${req.method}: ${req.path}] - ${JSON.stringify(data)}`);
        if (data.channel_post) {
            const reqMsg = data.channel_post.text;
            const chatId = data.channel_post.chat.id;
            if (reqMsg == 'show') {
                const command = 'ps -ef';
                let stdout = await execShell(command);
                await request(urlSendMessage, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'chat_id': chatId,
                        'text': stdout
                    })
                });
            } else {
                await request(urlSendSticker, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'chat_id': chatId,
                        'sticker': 'CAADAgADNyYAAktqAwAB5H3UcHKUmlQWBA'
                    })
                });
            }
        }
    } catch (e) {
        logger.error(e.stack);
    }
    return {'error': 0};
};

module.exports = handler;