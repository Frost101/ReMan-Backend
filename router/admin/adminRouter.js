//* External imports
const express = require('express');

//* Internal imports
const {banManufacturer, banRetailer, unbanManufacturer, unbanRetailer, getBannedManufacturersInfo, getBannedRetailersInfo} = require('../../controllers/admin/adminController');


//* Router instance
const adminRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin related routes
 */


/**
* @swagger
* /api/admin/banRetailer:
*   post:
*     tags: [Admin]
*     description: Restrict a retailer. Only admin can access this route
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*              - reason
*            properties: 
*              SID:
*                type: string
*                example: 123456789
*              reason:
*                type: string
*                example: Fraud
*     responses:
*        200:
*          description: Retailer restricted successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
adminRouter.post('/banRetailer', banRetailer);


/**
* @swagger
* /api/admin/unbanRetailer:
*   post:
*     tags: [Admin]
*     description: Remove restriction of a retailer. Only admin can access this route
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
*          description: Retailer restriction removed successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
adminRouter.post('/unbanRetailer', unbanRetailer);


/**
* @swagger
* /api/admin/banManufacturer:
*   post:
*     tags: [Admin]
*     description: Restrict a manufacturer. Only admin can access this route
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*              - reason
*            properties: 
*              SID:
*                type: string
*                example: 123456789
*              reason:
*                type: string
*                example: Fraud
*     responses:
*        200:
*          description: Manufacturer restricted successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
adminRouter.post('/banManufacturer', banManufacturer);


/**
* @swagger
* /api/admin/unbanManufacturer:
*   post:
*     tags: [Admin]
*     description: Remove restriction of a manufacturer. Only admin can access this route
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
*          description: Manufacturer restriction removed successfully
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route
*        default:
*          description: Internal server error
*/
adminRouter.post('/unbanManufacturer', unbanManufacturer);



/**
* @swagger
* /api/admin/bannedManufacturersInfo:
*   get:
*     tags: [Admin]
*     description: Get information of all banned manufacturers. Only admin can access this route
*     responses:
*        200:
*          description: An array of all banned manufacturers' information
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  manufacturers:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        MID:
*                          type: string
*                          example: 123456789
*                        name:
*                          type: string
*                          example: John Doe
*                        phoneNumber:
*                          type: string
*                          example: 01700000000
*                        email:
*                          type: string
*                          example:
*                        address:
*                          type: string
*                          example: Dhaka, Bangladesh
*                        bannedReason:
*                          type: string
*                          example: Fraud        
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
adminRouter.get('/bannedManufacturersInfo', getBannedManufacturersInfo);





/**
* @swagger
* /api/admin/bannedRetailersInfo:
*   get:
*     tags: [Admin]
*     description: Get information of all banned retailers. Only admin can access this route
*     responses:
*        200:
*          description: An array of all banned retailers' information
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  manufacturers:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        SID:
*                          type: string
*                          example: 123456789
*                        name:
*                          type: string
*                          example: John Doe
*                        phoneNumber:
*                          type: string
*                          example: 01700000000
*                        email:
*                          type: string
*                          example:
*                        address:
*                          type: string
*                          example: Dhaka, Bangladesh
*                        bannedReason:
*                          type: string
*                          example: Fraud        
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route, only admin can access this route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
adminRouter.get('/bannedRetailersInfo', getBannedRetailersInfo);



module.exports = adminRouter;