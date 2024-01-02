//* External imports
const express = require('express');

//* Internal imports
const { getCategoryList } = require('../../controllers/common/commonController');


//* Initialize router
const commonRouter = express.Router();


//* Routes
//! Dummy: Just to test if the router works
commonRouter.post('/getCategoryList', getCategoryList);


module.exports = commonRouter;