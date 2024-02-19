//* External imports
const express = require('express');

//* Internal imports
const {addNewProductionHouse, deleteProductionHouse, getProductionHousesList, shiftToInventory} = require('../../controllers/productionhouse/productionHouseController'); 

//* Initialize router
const productionHouseRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Production House
 *     description: Production House management related routes
 */




/**
* @swagger
* /api/productionhouse/addProductionHouse:
*   post:
*     tags: [Production House]
*     description: Add a new Production House
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*              - ProductionHouseName
*              - Capacity
*              - ProductionHouseType
*              - Image
*              - Details
*              - HouseNumber
*              - Street
*              - ZIP
*              - Thana
*              - Division
*              - AddressDetails
*              - image
*            properties: 
*              MID:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*              ProductionHouseName:
*                type: string
*                default: ProductionHouse1
*              Capacity:
*                type: double
*                default: 2301
*              ProductionHouseType:
*                type: string
*                default: Cold Stoarge
*              Image:
*                type: string
*                default: public/images/ruchi_prod1.jpg
*              Details:
*                type: string
*                default: Fresh Food Stoarge
*              HouseNumber:
*                type: string
*                default: A-120
*              Street:
*                type: string
*                default: Rankin Street
*              ZIP:
*                type: integer
*                default: 6200
*              Thana:
*                type: string
*                default: Tikatuli
*              Division:
*                type: string
*                default: Dhaka
*              AddressDetails:
*                type: string
*                default: Near the jame mosjid
*     responses:
*        201:
*          description: Adding a new Production House successful
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: adding a new Production House successful     
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productionHouseRouter.post('/addProductionHouse', addNewProductionHouse);




/**
* @swagger
* /api/productionhouse/deleteProductionHouse:
*   delete:
*     tags: [Production House]
*     description: Remove a Production House
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - PHID
*            properties: 
*              PHID:
*                type: string
*                default: 5c204b23-c65e-4dd0-b0a1-9514b1fc532f
*     responses:
*        200:
*          description: Removing an Production House successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Production House removed successfully  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productionHouseRouter.delete('/deleteProductionHouse', deleteProductionHouse);




/**
* @swagger
* /api/productionhouse/productionHouseList:
*   post:
*     tags: [Production House]
*     description: Show all the Production Houses of a manufacturer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - manufacturerId
*            properties: 
*              manufacturerId:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*     responses:
*        200:
*          description: An array of products' information for each Production House of a manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  productionHouses:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        phid:
*                          type: string
*                          example: 123412
*                        ProductionHouseName:
*                          type: string
*                          example: Shahi House
*                        Capacity:
*                          type: double
*                          example: 230
*                        Type:
*                          type: string
*                          example: cold storage
*                        Image:
*                          type: string
*                          example: public/images/shahi_house.jpg
*                        Details:
*                          type: string
*                          example: Fresh Food Storage
*                        Address:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productionHouseRouter.post('/productionHouseList', getProductionHousesList);




/**
* @swagger
* /api/productionhouse/shiftProducts:
*   put:
*     tags: [Production House]
*     description: Shift Products from a Production House to an inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - fromPHID
*              - toIID
*              - bid
*            properties: 
*              fromPHID:
*                type: string
*                default: a5e62d0b-be4d-4516-8334-2576df8b8282
*              toIID:
*                type: string
*                default: cd2f7a02-aa2d-4c30-9127-b00bf574f974
*              bid:
*                type: array
*                default: ['0f923034-673f-4b73-b517-2f2a65940c6f', 'b5a66dc1-228b-4d9e-a425-8f012ad17cfe']
*     responses:
*        200:
*          description: Product batches shifted from one Production House to an inventory successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Batches shifted to inventory successfully   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productionHouseRouter.put('/shiftProducts', shiftToInventory);

module.exports = productionHouseRouter;