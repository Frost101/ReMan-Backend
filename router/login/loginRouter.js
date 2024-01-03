//* External imports
const express = require('express');

//* Internal imports
const { doLogin } = require('../../controllers/login/loginController');


//* Initialize router
const loginRouter = express.Router();



//* Routes
/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login related routes
 */

/**
 * @swagger
 * paths:
 *   /api/login/doLogin:
 *     post:
 *       tags : [Login]
 *       summary: User Login
 *       description: Authenticate a user by providing their email and password.
 *       requestBody:
 *         description: User credentials for authentication.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address.
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User's password.
 *                   example: strongPassword123
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: Authentication token for further API requests.
 *               example:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *               example:
 *                 error: Invalid credentials. Please check your email and password.
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *               example:
 *                 error: Server encountered an unexpected issue.
 *       security:
 *         - apiKey: []
 */


loginRouter.post('/doLogIn', doLogin);


module.exports = loginRouter;

/*
Okay listen the route is /api/login/doLogin where client sends his email and password
for login , can u write me the swagger api documentation such that it follows industry
standard, covers necessary HTTP methods, Request Body(JSON preferred), HTTP Response Code,
Response Body(JSON preferred), Comment/Description
*/