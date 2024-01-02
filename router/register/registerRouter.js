//* External imports
const express = require('express');

//* Internal imports
const {doRegistration} = require('../../controllers/register/registerController');


//* Initialize router
const registerRouter = express.Router();


//* Routes
//! Dummy route
//* /api/register/doRegistration
registerRouter.post('/doRegistration', doRegistration);


module.exports = registerRouter;