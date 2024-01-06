//* External imports
const express = require('express');

//* Internal imports
const { doLogin } = require('../../controllers/login/loginController');
const { log } = require('console');


//* Initialize router
const loginRouter = express.Router();



//* Routes

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: jwt
 */

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
*     security: []
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
*          headers:
*            Set-Cookie:
*              schema:
*                type: string
*                example: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWF0IjoxNjI5MjU0NjY3LCJleHAi; Path=/; Expires=Thu, 19 Aug 2021 12:27:47 GMT; HttpOnly
*        400:
*          description: Invalid Username or Password
*        404:
*          description: User not found
*        default:
*          description: Internal server error
*/
loginRouter.post('/doLogIn', doLogin);


module.exports = loginRouter;