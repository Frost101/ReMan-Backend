//* External imports
const express = require('express');

//* Internal imports
const {getInventoryList} = require('../../controllers/manufacturer/manController');

//* Initialize router
const manRouter = express.Router();


//* Routes
//! Dummy route
//* /api/manufacturer/getInventoryList
manRouter.post('/getInventoryList', getInventoryList);


module.exports = manRouter;