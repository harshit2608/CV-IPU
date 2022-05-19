const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const messageRouter = require('./routes/chatsystem/messageRoutes');
const conversationRouter = require('./routes/chatsystem/conversationRoutes');

const application = express();

// 1) MIDDLEWARES
application.use(helmet());
if (process.env.NODE_ENV === 'development') {
    application.use(morgan('dev'));
} else {
    application.use(morgan('tiny'));
}

application.set('view engine', 'pug');
application.set('views', path.join(__dirname, 'views'));
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});
application.use('/api', limiter);
application.use(cors());
application.use(express.json());
application.use('/public', express.static(path.join(__dirname, '../uploads')));

//Data sanitization againt NoSQl Query Injection
application.use(mongoSanitize());

//Data sanitization againt XSS
application.use(xss());
application.use(
    hpp({
        whitelist: [],
    })
);

application.use(express.static(`${__dirname}/public`));

application.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
application.use('/api/v1/users', userRouter);
application.use('/api/v1/admin', adminRouter);
application.use('/api/v1/category', categoryRouter);
application.use('/api/v1/product', productRouter);
application.use('/api/v1/messages', messageRouter);
application.use('/api/v1/conversations', conversationRouter);

application.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

application.use(globalErrorHandler);

module.exports = application;
