//* External imports
const express = require('express');

//* Internal imports
const {resetPassword} = require('../../controllers/password/passwordController');

//* Initialize router
const passwordRouter = express.Router();


//* Routes
//! Dummy route
//* /api/password/reset
passwordRouter.post('/reset', resetPassword);


module.exports = passwordRouter;