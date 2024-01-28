//* External imports
const express = require('express');

//* Internal imports
const {retailerLogin, manufacturerLogin, logOut} = require('../../controllers/authentication/authenticationController');


//* Router instance
const authenticationRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Login and Logout related routes
 */

/**
* @swagger
* /api/authentication/retailer:
*   post:
*     tags: [Authentication]
*     description: Login as a retailer and get jwt token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - phoneNumber
*              - password
*            properties: 
*              phoneNumber:
*                type: string
*                example: 01700000000
*              password:
*                type: string
*                example: 12345
*     responses:
*        200:
*          description: Valid user, jwt token generated      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
authenticationRouter.post('/retailer', retailerLogin);



/**
* @swagger
* /api/authentication/manufacturer:
*   post:
*     tags: [Authentication]
*     description: Login as a manufacturer and get jwt token
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
*                example: ruchi@gmail.com
*              password:
*                type: string
*                example: 123456
*     responses:
*        200:
*          description: Valid user, jwt token generated      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
authenticationRouter.post('/manufacturer', manufacturerLogin);


/**
* @swagger
* /api/authentication/logout:
*   post:
*     tags: [Authentication]
*     description: Logout and destroy jwt token
*     responses:
*        200:
*          description: Logout successful, jwt token destroyed      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
authenticationRouter.post('/logout', logOut);


//* Module exports
module.exports = authenticationRouter;
