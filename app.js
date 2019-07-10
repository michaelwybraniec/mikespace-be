var bodyParser = require('body-parser');
var express = require('express');
var OAuthServer = require('express-oauth-server');

var Database = require('./src/persisters/database');

var config = require('./config/config.json');
var middlewareError = require('./src/middlewares/errors');

var UserRoutes = require('./src/routes/userRoutes');
var AuthRoutes = require('./src/routes/authRoutes');
var ElasticRoutes = require('./src/routes/elasticRoutes');
// ===== yeoman route import hook =====

// ==============================================================================
// ==================================== LOGS ====================================
// ==============================================================================

const winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: './logs/log',
    datePattern: 'YYYY-MM-dd.',
    prepend: true,
    level: 'info'
});

let logger = winston.createLogger({
    transports: [
        transport,
        //new winston.transports.File({ filename: config.log.LoggerHost }),
        new (winston.transports.Console)(),
        new (winston.transports.Http)({
            host: config.log.LoggerHost,
            port: config.log.LoggerPort,
            'timestamp': function () {
                return "time";
            }
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
});

const chalk = require('chalk');

Database.config();

const MemoryStore = require('./src/models/inMemoryModel.js');
const memoryStore = new MemoryStore();

var app = express();
var cors = require('cors'); // TODO : remove me in production

// When using CORS, one has to expose headers for the FE to receive
app.use(cors({ exposedHeaders: ['jwtToken'] })); // TODO : remove me in production

app.oauth = new OAuthServer({
    // app.oauth has the following methods:  'authenticate', 'authorize', 'constructor', 'token'.
    model: memoryStore, // See https://github.com/oauthjs/node-oauth2-server for specification
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);

// ==============================================================================
// ==================================== ROUTES ==================================
// ==============================================================================

// Returns access token after successful authentication.
app.post('/oauth/token', app.oauth.token());
app.get('/version', function (req, res) { res.json({ "version": config.application.version }); });
app.get('/', (req, res) => { res.status(401).json({ "success": false, "message": "forbidden" }); });

// Next routes need oauth token
app.use(app.oauth.authenticate());

app.use(AuthRoutes);
app.use(UserRoutes);
app.use(ElasticRoutes);
// ===== yeoman route declaration hook =====

// ==============================================================================
// ================================ MIDDLEWARES =================================
// ==============================================================================

app.use(middlewareError.notFound);
app.use(middlewareError.errorHandler);

// ==============================================================================
// ================================= APP START ==================================
// ==============================================================================

console.log(chalk.blue(`[Starting MikeSpace API at ${new Date()}]`));
logger.log('info', '[Starting MikeSpace API at ' + new Date() + ']');
app.listen(config.application.port,
    () => console.log(chalk.green(`Identity server is running on port ${config.application.port}`))
);
