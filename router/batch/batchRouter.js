//* External imports
const express = require('express');

//* Internal imports
const {getBatchList, batchScreening, addNewBatch, deleteBatch} = require('../../controllers/batch/batchController'); 

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
* /api/batch/batchList:
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
*              - IID
*              - PID
*            properties: 
*              IID:
*                type: integer
*                default: 123456
*              PID:
*                type: integer
*                default: 123456
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
*                        BID:
*                          type: integer
*                          example: 123456   
*                        manufacturingDate:
*                          type: string
*                          example: 2021-01-01
*                        expiryDate:
*                          type: string
*                          example: 2022-01-01
*                        quantity:
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
batchRouter.post('/batchList', getBatchList);



/**
* @swagger
* /api/batch/batchScreening:
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
batchRouter.put('/batchScreening', batchScreening);



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
*              - PHID
*              - PID
*              - manufacturingDate
*              - expiryDate
*              - quantity
*              - inMarketplace
*              - sale
*            properties: 
*              PHID:
*                type: integer
*                default: 123456
*              PID:
*                type: integer
*                default: 123456
*              manufacturingDate:
*                type: string
*                default: 2021-01-01
*              expiryDate:
*                type: string
*                default: 2022-01-01
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
batchRouter.post('/newBatch', addNewBatch);




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
*              - BID
*            properties: 
*              BID:
*                type: integer
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