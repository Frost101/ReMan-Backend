//* External imports
const express = require('express');

//* Internal imports
const {getCartInfo,getAllNotifications, getProductListOnSale} = require('../../controllers/retailer/retailerController');

//* Initialize router
const retailerRouter = express.Router();


//* Routes
//! Dummy route
//* /api/retailer/cartInfo
retailerRouter.post('/cartInfo', getCartInfo);

/**
 * @swagger
 * paths:
 *   /api/retailer/notifications:
 *     get:
 *       summary: Get Retailer Notifications
 *       description: Retrieve all notifications for a retailer client.
 *       tags:
 *         - Retailer
 *       parameters:
 *         - name: retailerId
 *           in: query
 *           description: Retailer's unique identifier.
 *           required: true
 *           schema:
 *             type: string
 *             example: 123456
 *       responses:
 *         '200':
 *           description: Successful retrieval of notifications
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Notification's unique identifier.
 *                       example: abc123
 *                     message:
 *                       type: string
 *                       description: Notification message.
 *                       example: New order received.
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of the notification.
 *                       example: 2022-01-01T12:34:56Z
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *               example:
 *                 error: Missing or invalid retailerId parameter.
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
 *                 error: Unauthorized. RetailerId does not match the authenticated user.
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

retailerRouter.get('/notifications', getAllNotifications);

/**
 * @swagger
 * paths:
 *   /api/retailer/productsOnSale:
 *     get:
 *       summary: Get Products on Sale
 *       description: Retrieve all products listed on sale by a retailer client.
 *       tags:
 *         - Retailer
 *       parameters:
 *         - name: retailerId
 *           in: query
 *           description: Retailer's unique identifier.
 *           required: true
 *           schema:
 *             type: string
 *             example: 123456
 *       responses:
 *         '200':
 *           description: Successful retrieval of products on sale
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: Product's unique identifier.
 *                       example: abc123
 *                     productName:
 *                       type: string
 *                       description: Name of the product.
 *                       example: Widget XYZ
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Sale price of the product.
 *                       example: 19.99
 *                     discountPercentage:
 *                       type: number
 *                       format: float
 *                       description: Discount percentage applied to the product.
 *                       example: 10
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *               example:
 *                 error: Missing or invalid retailerId parameter.
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
 *                 error: Unauthorized. RetailerId does not match the authenticated user.
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

retailerRouter.get('/productsOnSale', getProductListOnSale);

module.exports = retailerRouter;