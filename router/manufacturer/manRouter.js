//* External imports
const express = require('express');

//* Internal imports
const {getManufacturerInfo, getOwnerInfo} = require('../../controllers/manufacturer/manController'); 

//* Initialize router
const manufacturerRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Manufacturer
 *     description: Manufacturer information related routes
 */




/**
* @swagger
* /api/manufacturer/info:
*   post:
*     tags: [Manufacturer]
*     description: Get Manufacturer Information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*            properties: 
*              MID:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*     responses:
*        200:
*          description: Manufacturer related information
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  name:
*                    type: string
*                    default: Meril
*                  phoneNumber:
*                    type: array
*                    default: ['01988974891', '05776879659']
*                  image:
*                    type: string
*                    default: public/images/meril.jpg
*                  rating:
*                    type: double
*                    default: 4.87
*                  website:
*                    type: string
*                    default: https://www.meril.com
*                  email:
*                    type: string
*                    default: meril@gmail.com
*                  address:
*                    type: string
*                    default: 32 Baker Street, Mymensingh
*                  tin:
*                    type: string
*                    default: 23878931          
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
manufacturerRouter.post('/info', getManufacturerInfo);




/**
* @swagger
* /api/manufacturer/ownerInfo:
*   post:
*     tags: [Manufacturer]
*     description: Get all the owners' information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*            properties: 
*              MID:
*                type: integer
*                default: 123412
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
*                        dob:
*                          type: string
*                          example: 03/09/1978
*                        nid:
*                          type: integer
*                          example: 83302034    
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
manufacturerRouter.post('/ownerInfo', getOwnerInfo);

module.exports = manufacturerRouter;