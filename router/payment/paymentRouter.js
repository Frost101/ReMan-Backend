//* External imports
const express = require('express');

//* Internal imports
const {getLoanStatus, updatePaymentStatus, updatePayLaterStatus} = require('../../controllers/payment/paymentController');

//* Router instance
const paymentRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment related routes
 */


/**
* @swagger
* /api/payment/getStatus:
*   post:
*     tags: [Payment]
*     description: Get loan status and retail points of a retailer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*            properties: 
*              SID:
*                type: string
*                example: 123456789
*     responses:
*        200:
*          description: get loan status and retail points of a retailer
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    retailPoints:
*                      type: number
*                      example: 1000
*                    availableLoanAmount:
*                      type: number
*                      example: 100000
*                    payWithInDays:
*                      type: number
*                      example: 30      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/getStatus', getLoanStatus);



/**
* @swagger
* /api/payment/updatePayStatus:
*   put:
*     tags: [Payment]
*     description: Updating selected payment method and current payment status
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - orderID
*              - paymentMethod
*              - paymentStatus
*            properties: 
*              orderID:
*                type: string
*                example: 123456789
*              paymentMethod:
*                type: string
*                example: COD
*              paymentStatus:
*                type: string
*                example: unpaid
*     responses:
*        200:
*          description: Updated successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.put('/updatePayStatus', updatePaymentStatus);




/**
* @swagger
* /api/payment/updatePayLaterStatus:
*   put:
*     tags: [Payment]
*     description: Updating pay Later and current payment status
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - orderID
*              - paymentMethod
*              - paymentStatus
*              - paidAmount
*              - dueAmount
*              - payWithInDays
*            properties: 
*              orderID:
*                type: string
*                example: 123456789
*              paymentMethod:
*                type: string
*                example: COD
*              paymentStatus:
*                type: string
*                example: unpaid
*              paidAmount:
*                type: number
*                example: 1000
*              dueAmount:
*                type: number
*                example: 1000
*              payWithInDays:
*                type: number
*                example: 30
*     responses:
*        200:
*          description: Updated successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.put('/updatePayLaterStatus', updatePayLaterStatus);


module.exports = paymentRouter;