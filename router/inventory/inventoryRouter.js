//* External imports
const express = require('express');

//* Internal imports
const {addNewInventory, checkInventoryStatus, deleteInventory, getProductListAndInventories, shiftToInventory} = require('../../controllers/inventory/inventoryController'); 

//* Initialize router
const inventoryRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Inventory
 *     description: Inventory management related routes
 */




/**
* @swagger
* /api/inventory/addInventory:
*   post:
*     tags: [Inventory]
*     description: Add a new Inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*              - InventoryName
*              - Capacity
*              - InventoryType
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
*              InventoryName:
*                type: string
*                default: Shahi House
*              Capacity:
*                type: double
*                default: 2301
*              InventoryType:
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
*          description: Adding a new inventory successful
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: adding a new inventory successful     
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
inventoryRouter.post('/addInventory', addNewInventory);




/**
* @swagger
* /api/inventory/status:
*   post:
*     tags: [Inventory]
*     description: Check Inventory Status
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - IID
*            properties: 
*              IID:
*                type: integer
*                default: 123412
*     responses:
*        200:
*          description: Current status of the inventory
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  empty:
*                    type: boolean
*                    default: false 
*                  owned:
*                    type: boolean
*                    default: true 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
inventoryRouter.post('/status', checkInventoryStatus);




/**
* @swagger
* /api/inventory/deleteInventory:
*   delete:
*     tags: [Inventory]
*     description: Remove an inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - IID
*            properties: 
*              IID:
*                type: integer
*                default: 123412
*     responses:
*        200:
*          description: Removing an inventory successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Inventory removed successfully  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
inventoryRouter.delete('/deleteInventory', deleteInventory);




/**
* @swagger
* /api/inventory/productList:
*   post:
*     tags: [Inventory]
*     description: Show all the inventories and product list of a manufacturer
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
*          description: An array of products' information for each inventory of a manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  inventories:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        iid:
*                          type: integer
*                          example: 123412
*                        inventoryName:
*                          type: string
*                          example: Shahi House
*                        address:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        capacity:
*                          type: integer
*                          example: 230
*                        inventoryType:
*                          type: string
*                          example: cold storage
*                        empty:
*                          type: boolean
*                          example: false
*                        owned:
*                          type: boolean
*                          example: true
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
inventoryRouter.post('/productList', getProductListAndInventories);




/**
* @swagger
* /api/inventory/shiftProducts:
*   put:
*     tags: [Inventory]
*     description: Shift Products from one inventory to other
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - ShiftFromIID
*              - ShiftToIID
*              - BID
*            properties: 
*              ShiftFromIID:
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
*          description: Product batches shifted from one inventory to other inventory successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Batches shifted to other inventory successfully   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
inventoryRouter.put('/shiftProducts', shiftToInventory);

module.exports = inventoryRouter;