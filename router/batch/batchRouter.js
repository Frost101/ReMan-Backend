//* External imports
const express = require('express');

//* Internal imports
const {getInventoryBatchList, getInventoryBatchListInMarketWithoutSale, getProductionHouseBatchList, batchScreening, addNewBatch, addNewBatch1,  deleteBatch} = require('../../controllers/batch/batchController'); 

//* Initialize router
const batchRouter = express.Router();


//* Router
/**
 * @swagger
 * tags:
 *   - name: Batch
 *     description: Batch information related routes
 */


/**
* @swagger
* /api/batch/inventoryBatchList:
*   post:
*     tags: [Batch]
*     description: If PID(product ID) and (IID) inventory ID is provided, it will return the batch list of that product which is in that inventory.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - iid
*              - pid
*            properties: 
*              iid:
*                type: string
*                default: 8b4753af-39a0-458a-88ae-182875e0ec3b
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: An array of batches
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  batches:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        bid:
*                          type: integer
*                          example: 123456   
*                        ManufacturingDate:
*                          type: string
*                          example: 2021-01-01
*                        ExpiryDate:
*                          type: string
*                          example: 2022-01-01
*                        Quantity:
*                          type: integer
*                          example: 1000
*                        MarketStatus:
*                          type: boolean
*                          example: true
*                        Sale:
*                          type: double
*                          example: 0.0
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.post('/inventoryBatchList', getInventoryBatchList);





/**
* @swagger
* /api/batch/inventoryBatchListWithoutSale:
*   post:
*     tags: [Batch]
*     description: If PID(product ID) and (IID) inventory ID is provided, it will return the batch list of that product which is in that inventory, in marketplace and does not have any sale.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - iid
*              - pid
*            properties: 
*              iid:
*                type: string
*                default: 8b4753af-39a0-458a-88ae-182875e0ec3b
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: An array of batches
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  batches:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        bid:
*                          type: integer
*                          example: 123456   
*                        ManufacturingDate:
*                          type: string
*                          example: 2021-01-01
*                        ExpiryDate:
*                          type: string
*                          example: 2022-01-01
*                        Quantity:
*                          type: integer
*                          example: 1000
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.post('/inventoryBatchListWithoutSale', getInventoryBatchListInMarketWithoutSale);





/**
* @swagger
* /api/batch/productionHouseBatchList:
*   post:
*     tags: [Batch]
*     description: If PID(Product ID) and PHID(Production House ID) is provided, it will return the batch list of that product which is in that production house.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - phid
*              - pid
*            properties: 
*              phid:
*                type: string
*                default: a5e62d0b-be4d-4516-8334-2576df8b8282
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: An array of batches
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  batches:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        bid:
*                          type: integer
*                          example: 123456   
*                        ManufacturingDate:
*                          type: string
*                          example: 2021-01-01
*                        ExpiryDate:
*                          type: string
*                          example: 2022-01-01
*                        Quantity:
*                          type: integer
*                          example: 1000
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.post('/productionHouseBatchList', getProductionHouseBatchList);



/**
* @swagger
* /api/batch/inventoryBatchScreening:
*   put:
*     tags: [Batch]
*     description: Change the sale information of a batch or add or remove from marketlace
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - BID
*              - InMarketplace
*              - Sale
*            properties: 
*              BID:
*                type: integer
*                default: 123456
*              InMarketplace:
*                type: boolean
*                default: true
*              Sale:
*                type: double
*                default: 0
*     responses:
*        200:
*          description: Successfully updated
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.put('/inventoryBatchScreening', batchScreening);



/**
* @swagger
* /api/batch/newBatch:
*   post:
*     tags: [Batch]
*     description: Add a new batch in a production house
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - phid
*              - pid
*              - manufacturingDate
*              - expiryDate
*              - quantity
*            properties: 
*              phid:
*                type: string
*                default: a5e62d0b-be4d-4516-8334-2576df8b8282
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*              manufacturingDate:
*                type: string
*                default: 2021-01-01
*              expiryDate:
*                type: string
*                default: 2022-01-01
*              quantity:
*                type: integer
*                default: 1000
*     responses:
*        200:
*          description: Successfully added
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.post('/newBatch', addNewBatch);



/**
* @swagger
* /api/batch/newBatchInventory:
*   post:
*     tags: [Batch]
*     description: Add a new batch in an Inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - iid
*              - pid
*              - manufacturingDate
*              - expiryDate
*              - quantity
*              - inMarketplace
*              - sale
*            properties: 
*              iid:
*                type: string
*                default: 8b4753af-39a0-458a-88ae-182875e0ec3b
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*              manufacturingDate:
*                type: string
*                format: date
*                default: 2021-01-01
*              expiryDate:
*                type: string
*                format: date
*                default: 2021-01-01
*              quantity:
*                type: integer
*                default: 1000
*              inMarketplace:
*                type: boolean
*                default: true
*              sale:
*                type: double
*                default: 0
*     responses:
*        200:
*          description: Successfully added
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.post('/newBatchInventory', addNewBatch1);




/**
* @swagger
* /api/batch/deleteBatch:
*   delete:
*     tags: [Batch]
*     description: Remove a batch
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - bid
*            properties: 
*              bid:
*                type: string
*                default: 123456
*     responses:
*        200:
*          description: Successfully removed
*        401:
*          description: Unauthorized, Invalid username or password
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
batchRouter.delete('/deleteBatch', deleteBatch);


module.exports = batchRouter;