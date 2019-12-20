const { createLogger, format } = require('winston');
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

var transport = new DailyRotateFile({
	filename: './logs/%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: false,
	level: 'info',
	//maxSize: '500m'
});

const myFormat = printf((info) => {
	console.log(`${info.timestamp} - ${info.level.toUpperCase()} - ${info.message}`);
	return `${info.timestamp} - ${info.level.toUpperCase()} - ${info.message}`;
});

const logger = createLogger({
	transports: [
		transport
	],
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss.SSS'
		}),
		myFormat
	)
});

module.exports = logger;