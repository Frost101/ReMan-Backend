//* External imports
const express = require('express');

//* Internal imports
const loginRouter = require('./login/loginRouter');
const registrationRouter = require('./registration/registrationRouter');
const logoutRouter = require('./logout/logoutRouter');
const passwordRouter = require('./password/passwordRouter');
const retailerRouter = require('./retailer/retailerRouter');
const manufacturerRouter = require('./manufacturer/manRouter');
const commonRouter = require('./common/commonRouter');
const productsRouter = require('./products/productsRouter');
const cartRouter = require('./cart/cartRouter');
const notificationRouter = require('./notification/notificationRouter');
const inventoryRouter = require('./inventory/inventoryRouter');
const productionHouseRouter = require('./productionhouse/productionHouseRouter');
const batchRouter = require('./batch/batchRouter');
const vouchersRouter = require('./vouchers/vouchersRouter');
const leaseInventoryRouter = require('./leaseInventory/leaseInventoryRouter');


const { requireAuth } = require('../middlewares/common/authMiddleware');




//* Initialize router
const APIrouter = express.Router();


//* Routes
APIrouter.use('/login', loginRouter);

APIrouter.use('/registration', registrationRouter);

APIrouter.use('/logout', logoutRouter);

APIrouter.use('/password', passwordRouter);

APIrouter.use('/retailer', retailerRouter);

APIrouter.use('/manufacturer', manufacturerRouter);

APIrouter.use('/products', productsRouter);

APIrouter.use('/common', commonRouter);

APIrouter.use('/cart', cartRouter);

APIrouter.use('/notification', notificationRouter);

APIrouter.use('/inventory', inventoryRouter);

APIrouter.use('/productionhouse', productionHouseRouter);

APIrouter.use('/batch', batchRouter);

APIrouter.use('/vouchers', vouchersRouter);

APIrouter.use('/leaseInventory', leaseInventoryRouter);

module.exports = APIrouter;