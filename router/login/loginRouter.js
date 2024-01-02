//* External imports
const express = require('express');

//* Internal imports
const { doLogin } = require('../../controllers/login/loginController');


//* Initialize router
const loginRouter = express.Router();


//* Routes
//! Dummy route
//* /api/login/doLogIn
loginRouter.post('/doLogIn', doLogin);


module.exports = loginRouter;