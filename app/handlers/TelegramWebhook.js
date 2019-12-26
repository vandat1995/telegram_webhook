const { exec } = require('child_process');
const logger = require('../../config/logger');
const config = require('../../config/config.json');
const request = require('../utils/HttpRequest');
const urlSendMessage = `${config.botUrl}/sendMessage`;
const urlSendSticker = `${config.botUrl}/sendSticker`;

const YASUO = {
    "exciter": {
        "pattern": /exciter/i,
        "reply": [
            "mày tính trộm chó hay gì [IMG]https://i.imgur.com/4RJD3gO.png[/IMG]",
        ],
        "title": true
    },
    "winner": {
        "pattern": /winner/i,
        "and": {
            "pattern": /mua/i,
            "title": true
        },
        "reply": [
            "mua exciter đi bạn [IMG]https://i.imgur.com/v1fmMDd.gif[/IMG]",
        ],
        "title": true
    },
    "hoi_ngu": {
        "pattern": /hỏi ngu|hoi ngu/i,
        "reply": [
            "ngu thì đừng có hỏi [IMG]https://i.imgur.com/QwJ0V0V.png[/IMG]",
            "google đi mai fen [IMG]https://i.imgur.com/Pa3C9kE.png[/IMG]",
            "có thế cũng hỏi đúng ngu thiệt [IMG]https://i.imgur.com/Q8sGcLO.png[/IMG]",
            "[IMG]https://i.imgur.com/vp47msF.jpg[/IMG]"
        ],
        "title": true
    },
    "hoi": {
        "pattern": /hỏi|hỏi về/i,
        "reply": [
            "[IMG]https://i.imgur.com/vp47msF.jpg[/IMG]"
        ],
        "title": true
    },
    "no_sex": {
        "pattern": /no.?s.?e.?x/i,
        "reply": [
            "no sex ko phải là chuyện để mày đem ra đùa [IMG]https://i.imgur.com/JZ8i4rM.gif[/IMG",
            "no sex để mày tuỳ tiện dùng thế ak [IMG]https://i.imgur.com/8kNEyvT.png[/IMG]"
        ],
        "title": true
    },
    "co_hinh": {
        "pattern": /co.?hinh|có.?hình/i,
        "andNot": {
            "pattern": /img/i,
            "content": true
        },
        "reply": [
            "hình đâu tml [IMG]https://i.imgur.com/ghXpJrI.png[/IMG]"
        ],
        "title": true
    },
    "ngu": {
        "pattern": /ngủ/i,
        "reply": [
            "chúc bé ngủ ngon",
            "bé ơi ngủ đi đêm đã khuya rồi"
        ],
        "title": true
    },
    "hoc": {
        "pattern": /học/i,
        "reply": [
            "The more you learn, the more you know, the more you know, and the more you forget. The more you forget, the less you know. So why bother to learn [IMG]https://i.imgur.com/wEqlboB.png[/IMG] "
        ],
        "title": true
    },
    "o_dau": {
        "pattern": /ở đâu/i,
        "reply": [
            "ở đâu còn lâu mới nói [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]",
            "gần ngay trước mặt xa tận chân trời :badsmell:"
        ],
        "title": true
    },
    "noi_thang": {
        "pattern": /nói thẳng/i,
        "reply": [
            "nói thẳng thằng này chuyên lập thread nhảm :sogood:",
            "mày thẳng hơi nhiều rồi đấy :sogood:"
        ],
        "title": true
    },
    "tu_van": {
        "pattern": /tư vấn/i,
        "reply": [
            //"card đây rồi tư vấn [IMG]https://i.imgur.com/1BW9Wj4.png[/IMG]",
            "[IMG]https://i.imgur.com/vp47msF.jpg[/IMG]",
            "#3 tư vấn hộ [IMG]https://i.imgur.com/zFNuZTA.png[/IMG]",
            "chả biết tư vấn gì nữa [IMG]https://i.imgur.com/1BW9Wj4.png[/IMG]"
        ],
        "title": true
    },
    "thang_ban": {
        "pattern": /thằng bạn/i,
        "reply": [
            //"card đây rồi tư vấn [IMG]https://i.imgur.com/1BW9Wj4.png[/IMG]",
            "thực ra không có thằng bạn nào ở đây cả :look_down::look_down:"
        ],
        "title": true
    },
    "thit_cho": {
        "pattern": /thịt/i,
        "and": {
            "pattern": /chó/i,
            "title": true
        },
        "reply": [
            "chó là bạn [IMG]https://i.imgur.com/ltQT8F9.gif[/IMG]",
            "chó là bạn :canny:",
            "đã báo hội chó quyền [IMG]https://i.imgur.com/QwJ0V0V.png[/IMG]"
        ],
        "title": true
    },
    "thit_cho2": {
        "pattern": /thịt/i,
        "and": {
            "pattern": /chó/i,
            "content": true
        },
        "reply": [
            "chó là bạn [IMG]https://i.imgur.com/ltQT8F9.gif[/IMG]",
            "chó là bạn :canny:",
            "đã báo hội chó quyền [IMG]https://i.imgur.com/QwJ0V0V.png[/IMG]"
        ],
        "content": true
    },
    "test_bot": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "and": {
            "pattern": /t.?e.?s.?t|t.?3.?s.?t/i,
            "title": true
        },
        "reply": [
            //"muốn test thì nổ card viettel vào in bóc trước nhé [IMG]https://i.imgur.com/TWtHg3c.gif[/IMG]",

            "tao không phải là trò để bọn mày test [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]",
            "làm ơn đừng test tao nữa [IMG]https://i.imgur.com/4gmOAMB.png[/IMG]",
            "tao không phải là trò để bọn mày test :angry:",
            "đây không phải là trò đùa :angry:"
        ],
        "title": true
    },
    "bot_ngu": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "and": {
            "pattern": /n.?g.?u/i,
            "title": true
        },
        "reply": [
            "mày ngu thì có [IMG]https://i.imgur.com/lhuVlcm.png[/IMG]",

            "coi chừng tao [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]"
        ],
        "title": true
    },
    "bot_ngu2": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "and": {
            "pattern": /n.?g.?u/i,
            "content": true
        },
        "reply": [
            "mày ngu thì có [IMG]https://i.imgur.com/lhuVlcm.png[/IMG]",

            "coi chừng tao [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]"
        ],
        "content": true
    },
    "bot_shit": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "and": {
            "pattern": /s.?h.?i.?t|c.?ứ.?t/i,
            "content": true
        },
        "reply": [

            "coi chừng tao [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]",
            "ăn nói như thằng vô học vậy [IMG]https://i.imgur.com/4RJD3gO.png[/IMG][IMG]https://i.imgur.com/KgmQHtR.png[/IMG]"
        ],
        "content": true
    },
    "bot_shit2": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "and": {
            "pattern": /s.?h.?i.?t|c.?ứ.?t/i,
            "title": true
        },
        "reply": [

            "ăn nói như thằng vô học vậy [IMG]https://i.imgur.com/4RJD3gO.png[/IMG][IMG]https://i.imgur.com/KgmQHtR.png[/IMG]",
            "coi chừng tao [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]"
        ],
        "title": true
    },
    "bot": {
        "pattern": /b.?o.?t|b.?0.?t/i,
        "reply": [
            "gọi tao có chuyện gì thế mai fen :canny:",
            "gọi tao có chuyện gì thế mai phen [IMG]https://i.imgur.com/osCpCsi.png[/IMG]",
            "tính làm gì tao :canny:",
            "gì vậy ?",
            "mày post nhảm hơi nhiều rồi đấy [IMG]https://i.imgur.com/KgmQHtR.png[/IMG]"
        ],
        "title": true
    },
    "bot2": {
        "pattern": /bot.ơi/i,
        "reply": [
            "gì vậy mai phen?",
            "can i help you?",
            "có gì hot"
        ],
        "title": true
    },
    "biet_khong": {
        "pattern": /biết.không/i,
        "reply": [
            "không nha."
        ],
        "title": true
    },
    "vietllot": {
        "pattern": /vietlot/i,
        "reply": [
            "không trúng đâu đừng mua 😂",
            "mua đề con 09 đi 😂"
        ],
        "title": true
    },
    "tuc_qua": {
        "pattern": /tức.quá/i,
        "reply": [
            "chuyện gì kể nghe chơi 😳"
        ],
        "title": true
    },
}

function detectContentV2(title, content) {
    title = title.toLowerCase().replace(/\.| +\./g, '');
    content = content.toLowerCase().replace(/\.| +\./g, '');
    for (let [key, val] of Object.entries(YASUO)) {
        if (val['title'] && val['content'] && val['pattern'].test(title) && val['pattern'].test(content)) {
            if (val['and']) {
                if (val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(title) && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['and']['title'] && !val['and']['content'] && val['and']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else if (val['andNot']) {
                if (val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(title) && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['andNot']['title'] && !val['andNot']['content'] && !val['andNot']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else {
                return val['reply'][Math.floor(Math.random() * val['reply'].length)];
            }
        }
        if (val['title'] && !val['content'] && val['pattern'].test(title)) {
            if (val['and']) {
                if (val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(title) && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['and']['title'] && !val['and']['content'] && val['and']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else if (val['andNot']) {
                if (val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(title) && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['andNot']['title'] && !val['andNot']['content'] && !val['andNot']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else {
                return val['reply'][Math.floor(Math.random() * val['reply'].length)];
            }

        }
        if (!val['title'] && val['content'] && val['pattern'].test(content)) {
            if (val['and']) {
                if (val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(title) && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['and']['title'] && !val['and']['content'] && val['and']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['and']['title'] && val['and']['content'] && val['and']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else if (val['andNot']) {
                if (val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(title) && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (val['andNot']['title'] && !val['andNot']['content'] && !val['andNot']['pattern'].test(title)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
                if (!val['andNot']['title'] && val['andNot']['content'] && !val['andNot']['pattern'].test(content)) {
                    return val['reply'][Math.floor(Math.random() * val['reply'].length)];
                }
            } else {
                return val['reply'][Math.floor(Math.random() * val['reply'].length)];
            }
        }
    }
    return '';
}

async function isPhoneNumber(msg) {
    if (/^(\d{10,11},*.?)+$/.test(msg)) {
        let url = `http://vntelecom.vnta.gov.vn:10245/apps/api/checkNumber?phone_number=${msg}`;
        let res = await request(url, {
            headers: {
                'content-type': 'application/json'
            }
        });
        logger.info(`[RES_CHECK_TELCO]: ${res}`);
        res = JSON.parse(res);
        return res.origin_telco ? `${msg} => ${(res.dst_telco && `${res.dst_telco} | Mạng cũ => ${res.origin_telco}`) || res.origin_telco}` : '';
    }
    return '';
}

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

        const reqMsg = data.message.text;
        const chatId = data.message.chat.id;
        const username = data.message.from.username;
        const fromName = `${data.message.from.first_name} ${data.message.from.last_name}`;
        if (reqMsg == '/show') {
            const command = 'ps -ef | grep node';
            let stdout = await execShell(command);
            logger.info(stdout);
            let reply = await request(urlSendMessage, {
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    'chat_id': chatId,
                    'text': stdout
                })
            });
            logger.info(`[RES_TELE]: ${reply}`);
        } else if (username == 'datyasuo2' && reqMsg == '/bot') {
            let payload = JSON.stringify({
                'chat_id': chatId,
                'text': 'Dạ đại ca gọi em có chuyện gì vậy.'
            });
            logger.info(`[SEND_TELE]: ${payload}`);
            let reply = await request(urlSendMessage, {
                headers: {
                    'content-type': 'application/json'
                },
                body: payload
            });
            logger.info(`[RES_TELE]: ${reply}`);
        } else {
            if (data.message.sticker) {
                let payload = JSON.stringify({
                    'chat_id': chatId,
                    'sticker': 'CAADAgADNyYAAktqAwAB5H3UcHKUmlQWBA'
                });
                logger.info(`[SEND_TELE]: ${payload}`);
                let reply = await request(urlSendSticker, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: payload
                });
                logger.info(`[RES_TELE]: ${reply}`);
            } else {
                let msgReply = (reqMsg && await isPhoneNumber(reqMsg)) || detectContentV2(reqMsg, reqMsg);
                msgReply = msgReply.replace(/\[IMG\]/g, '');
                msgReply = msgReply.replace(/\[\/IMG\]/g, '');
                msgReply = msgReply || `Sai cú pháp nhé ${fromName}`;
                let payload = JSON.stringify({
                    'chat_id': chatId,
                    'text': msgReply
                });
                logger.info(`[SEND_TELE]: ${payload}`);
                let reply = await request(urlSendMessage, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: payload
                });
                logger.info(`[RES_TELE]: ${reply}`);
            }
        }
    } catch (e) {
        logger.error(e.stack);
    }
    return { 'error': 0 };
};

module.exports = handler;