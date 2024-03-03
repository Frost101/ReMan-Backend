//* External imports
const express = require('express');

//* Internal imports
const {paymentOnline, paymentOnlineForTakingLease, paymentOnlineForExtendingLease, onlinePaymentSuccessful, onlinePaymentSuccessfulForTakingLease, onlinePaymentSuccessfulForExtendingLease, onlinePaymentFailed, onlinePaymentFailedForTakingLease, onlinePaymentFailedForExtendingLease, getLoanStatus, updatePaymentStatus, updatePayLaterStatus} = require('../../controllers/payment/paymentController');

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
* /api/payment/paymentOnline:
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
*              - sid
*              - TotalAmount
*              - VoucherCode
*            properties: 
*              sid:
*                type: string
*                example: 123456789
*              TotalAmount:
*                type: integer
*                example: 123456789
*              VoucherCode:
*                type: string
*                example: 123456789
*     responses:
*        200:
*          description: get url to make payment
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    url:
*                      type: string
*                      example: 1000
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/paymentOnline', paymentOnline);




/**
* @swagger
* /api/payment/paymentOnlineForTakingLease:
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
*              - rid
*              - iid
*              - OwnerID
*              - OwnedToID
*              - Duration
*            properties: 
*               rid:
*                 type: string
*                 example: d3fcff83-d7bd-4058-ac87-cd11dc000c5b
*               iid:
*                 type: string
*                 example: 6b6fd057-bae2-4786-90e4-916ed809baa2
*               OwnerID:
*                 type: string
*                 example: 2c397476-c131-4c60-b45a-12bd242ec256
*               OwnedToID:
*                 type: string
*                 example: e7ea9b52-8ab6-4634-8178-1c38ab0340df
*               Duration:
*                 type: integer
*                 example: 20
*     responses:
*        200:
*          description: get url to make payment
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    url:
*                      type: string
*                      example: 1000
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/paymentOnlineForTakingLease', paymentOnlineForTakingLease);




/**
* @swagger
* /api/payment/paymentOnlineForExtendingLease:
*   post:
*     tags: [Payment]
*     description: Payment Online for extending lease
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - rid
*              - OccupiedTill
*            properties: 
*               rid:
*                 type: string
*                 example: 97c990c2-a4f6-48a5-b741-31a3417dd1d0
*               OccupiedTill:
*                 type: string
*                 example: 2024-03-25
*     responses:
*        200:
*          description: get url to make payment
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    url:
*                      type: string
*                      example: 1000
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/paymentOnlineForExtendingLease', paymentOnlineForExtendingLease);





/**
* @swagger
* /api/payment/onlinePaymentSuccess:
*   post:
*     tags: [Payment]
*     description: Return status of online payment successful
*     responses:
*        200:
*          description: payment successful
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment successful
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentSuccess', onlinePaymentSuccessful);





/**
* @swagger
* /api/payment/onlinePaymentSuccessForTakingLease:
*   post:
*     tags: [Payment]
*     description: Return status of online payment successful
*     responses:
*        200:
*          description: payment successful
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment successful
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentSuccessForTakingLease', onlinePaymentSuccessfulForTakingLease);




/**
* @swagger
* /api/payment/onlinePaymentSuccessForExtendingLease:
*   post:
*     tags: [Payment]
*     description: Return status of online payment successful
*     responses:
*        200:
*          description: payment successful
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment successful
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentSuccessForExtendingLease', onlinePaymentSuccessfulForExtendingLease);





/**
* @swagger
* /api/payment/onlinePaymentFail:
*   post:
*     tags: [Payment]
*     description: Return status of online payment failed
*     responses:
*        200:
*          description: payment failed
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment failed
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentFail', onlinePaymentFailed);





/**
* @swagger
* /api/payment/onlinePaymentFailForExtendingLease:
*   post:
*     tags: [Payment]
*     description: Return status of online payment failed
*     responses:
*        200:
*          description: payment failed
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment failed
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentFailForTakingLease', onlinePaymentFailedForTakingLease);




/**
* @swagger
* /api/payment/onlinePaymentFailForExtendingLease:
*   post:
*     tags: [Payment]
*     description: Return status of online payment failed
*     responses:
*        200:
*          description: payment failed
*          response-body:
*            content:
*              application/json:
*                schema:
*                  type: object
*                  properties:
*                    message:
*                      type: string
*                      example: payment failed
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
paymentRouter.post('/onlinePaymentFailForExtendingLease', onlinePaymentFailedForExtendingLease);




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