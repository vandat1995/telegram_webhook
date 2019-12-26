routers = [];

routers.push({
    method: ['POST'],
    path: '/api/telegram',
    handler: require('./handlers/TelegramWebhook')
});

routers.push({
    method: ['POST'],
    path: '/api/telegram2',
    handler: require('./handlers/WebhookBaoNguyen')
});

routers.push({
    method: ['POST'],
    path: '/api/alert',
    handler: require('./handlers/AlertTelegram')
});

routers.push({
    method: ['GET'],
    path: '/api/test',
    handler: (req, h) => {
        return {'error': 0};
    } 
});

module.exports = routers;