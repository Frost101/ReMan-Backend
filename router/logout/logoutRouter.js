//* External imports
const express = require('express');

//* Internal imports
const { doLogout } = require('../../controllers/logout/logoutController');

//* Initialize router
const logoutRouter = express.Router();


//* Routes
//! Dummy route
//* /api/logout/doLogOut
logoutRouter.delete('/doLogOut', doLogout);


module.exports = logoutRouter;