//* External imports
const express = require('express');

//* Internal imports
const {getShopInfo, getOwnerInfo} = require('../../controllers/retailer/retailerController'); 

//* Initialize router
const retailerRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Retailer
 *     description: Retailer information related routes
 */




/**
* @swagger
* /api/retailer/shopInfo:
*   post:
*     tags: [Retailer]
*     description: Get Shop Information
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
*                default: 123456
*     responses:
*        200:
*          description: Shop related information
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Name:
*                    type: string
*                    default: Reja Store
*                  PhoneNumber:
*                    type: string
*                    default: '01988974891'
*                  Logo:
*                    type: string
*                    default: public/images/reja_store.jpg
*                  RetailPoints:
*                    type: integer
*                    default: 663
*                  Website:
*                    type: string
*                    default: https://www.reja_store.com
*                  Email:
*                    type: string
*                    default: reja@gmail.com
*                  Address:
*                    type: string
*                    default: 52 Baker Steet           
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
retailerRouter.post('/shopInfo', getShopInfo);




/**
* @swagger
* /api/retailer/ownerInfo:
*   post:
*     tags: [Retailer]
*     description: Get all the owners' information
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
*                type: integer
*                default: 123456
*     responses:
*        200:
*          description: An array of owners' information
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  owners:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        name:
*                          type: string
*                          example: Shamim
*                        phoneNumber:
*                          type: array
*                          example: ['01988344891', '05713879659']
*                        image:
*                          type: string
*                          example: public/images/shamim.jpg
*                        email:
*                          type: string
*                          example: shamim@gmail.com
*                        address:
*                          type: string
*                          example: 32 Baker Street, Mymensingh    
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
retailerRouter.post('/ownerInfo', getOwnerInfo);

module.exports = retailerRouter;