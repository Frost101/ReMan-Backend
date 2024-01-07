//* External imports
const express = require('express');

//* Internal imports
const {addNewProductionHouse, deleteProductionHouse, getProductListAndProductionHouses, shiftToInventory} = require('../../controllers/productionhouse/productionHouseController'); 

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
*              - HouseNumber
*              - Street
*              - ZIP
*              - Thana
*              - Division
*              - AddressDetails
*              - image
*            properties: 
*              MID:
*                type: integer
*                default: 123412
*              ProductionHouseName:
*                type: string
*                default: Shahi House
*              Capacity:
*                type: double
*                default: 2301
*              ProductionHouseType:
*                type: string
*                default: Cold Stoarge
*              HouseNumber:
*                type: integer
*                default: 120
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
*              image:
*                type: string
*                default: public/images/shahi_house.jpg
*     responses:
*        200:
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
*                type: integer
*                default: 123412
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
* /api/productionhouse/productList:
*   post:
*     tags: [Production House]
*     description: Show all the Production Houses and product list of a manufacturer
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
*                default: 123434
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
*                          type: integer
*                          example: 123412
*                        productionHouseName:
*                          type: string
*                          example: Shahi House
*                        address:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        capacity:
*                          type: integer
*                          example: 230
*                        productionHouseType:
*                          type: string
*                          example: cold storage
*                        image:
*                          type: string
*                          example: public/images/shahi_house.jpg
*                        productName:
*                          type: array
*                          example: ['potato', 'rice', 'wheat'] 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productionHouseRouter.post('/productList', getProductListAndProductionHouses);




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
*              - ShiftFromPHID
*              - ShiftToIID
*              - BID
*            properties: 
*              ShiftFromPHID:
*                type: integer
*                default: 123412
*              ShiftToIID:
*                type: integer
*                default: 123411
*              BID:
*                type: array
*                default: [313234, 292931, 131123]
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