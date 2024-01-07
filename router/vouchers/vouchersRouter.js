const express = require('express');
const vouchersController = require('../../controllers/vouchers/vouchersController');
const vouchersRouter = express.Router();


vouchersRouter.post('/addVoucher', vouchersController.addVoucher);

module.exports = {
    vouchersRouter,
}