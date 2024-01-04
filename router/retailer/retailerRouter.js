//* External imports
const express = require('express');

//* Internal imports
const {getCartInfo} = require('../../controllers/retailer/retailerController'); 

//* Initialize router
const retailerRouter = express.Router();


//* Routes
//! Dummy route
//* /api/retailer/cartInfo
retailerRouter.post('/cartInfo', getCartInfo);


module.exports = retailerRouter;