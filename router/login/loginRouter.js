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
* /api/login/doLogIn:
*   post:
*     tags: [Login]
*     description: Submit Email and Password to login and get JWT token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - email
*              - password
*            properties: 
*              email:
*                type: string
*                default: abc@gmail.com
*              password:
*                type: string
*                default: 122abc@#
*     responses:
*        200:
*          description: A User object
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  dummyMessage:
*                    type: string
*                    default: Dummy Message
*        400:
*          description: Invalid Username or Password
*        404:
*          description: User not found
*        default:
*          description: Internal server error
*/
loginRouter.post('/doLogIn', doLogin);


module.exports = loginRouter;