//* External imports
const express = require('express');

//* Internal imports
const { doLogout } = require('../../controllers/logout/logoutController');

//* Initialize router
const logoutRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Log Out
 *     description: Log Out related routes
 */

/**
 * @swagger
 * paths:
 *   /api/logout/doLogOut:
 *     post:
 *       tags: [Log Out]
 *       summary: User Logout
 *       description: Log out a user, terminating their current session.
 *       requestBody:
 *         description: User information for logging out.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: User's unique identifier.
 *                   example: 123456
 *                 sessionToken:
 *                   type: string
 *                   description: User's current session token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       responses:
 *         '200':
 *           description: Successful logout
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Confirmation message.
 *               example:
 *                 message: User successfully logged out.
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
 *                 error: Unauthorized. Invalid user or session token.
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



logoutRouter.post('/doLogOut', doLogout);


module.exports = logoutRouter;

/*
Okay listen the route is /api/logout/doLogOut where client logs out,
can u write me the swagger api documentation such that it follows industry
standard, covers necessary HTTP methods, Request Body(JSON preferred), HTTP Response Code,
Response Body(JSON preferred), Comment/Description
*/