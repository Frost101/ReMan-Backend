//* External imports
const express = require('express');

//* Internal imports
const loginRouter = require('./login/loginRouter');
const registerRouter = require('./register/registerRouter');
const logoutRouter = require('./logout/logoutRouter');
const passwordRouter = require('./password/passwordRouter');
const retailerRouter = require('./retailer/retailerRouter');
const manufacturerRouter = require('./manufacturer/manRouter');
const commonRouter = require('./common/commonRouter');
const productsRouter = require('./products/productsRouter');
const cartRouter = require('./cart/cartRouter');
const notificationRouter = require('./notification/notificationRouter');
const batchRouter = require('./batch/batchRouter');
const { requireAuth } = require('../middlewares/common/authMiddleware');




//* Initialize router
const APIrouter = express.Router();


//* Routes
APIrouter.use('/login', loginRouter);

APIrouter.use('/register', registerRouter);

APIrouter.use('/logout', logoutRouter);

APIrouter.use('/password', passwordRouter);

APIrouter.use('/retailer', retailerRouter);

APIrouter.use('/manufacturer', manufacturerRouter);

APIrouter.use('/products', productsRouter);

APIrouter.use('/common', commonRouter);

APIrouter.use('/cart', cartRouter);

APIrouter.use('/notification', notificationRouter);

APIrouter.use('/batch', batchRouter);


module.exports = APIrouter;