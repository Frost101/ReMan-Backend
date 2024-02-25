//* External imports
const express = require('express');

//* Internal imports
const {addNewInventory, checkInventoryStatus, deleteInventory, getInventoriesList, getInventoryInfo, shiftToInventory} = require('../../controllers/inventory/inventoryController'); 

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
*              InventoryName:
*                type: string
*                default: Shahi House
*              Capacity:
*                type: double
*                default: 2301
*              InventoryType:
*                type: string
*                default: Cold Stoarge
*              Image:
*                type: string
*                default: public/images/shahi_house.jpg
*              Details:
*                type: string
*                default: Fresh Food Storage
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
*                type: string
*                default: 35963a39-0a62-4425-90e2-d74b346a5c59
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
* /api/inventory/inventoryList:
*   post:
*     tags: [Inventory]
*     description: Show all the inventories list of a manufacturer
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
*                          type: string
*                          example: 123412
*                        InventoryName:
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
*                        EmptyStatus:
*                          type: boolean
*                          example: true
*                        RealOwner:
*                          type: string
*                          example: true
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
inventoryRouter.post('/inventoryList', getInventoriesList);




/**
* @swagger
* /api/inventory/inventoryInfo:
*   post:
*     tags: [Inventory]
*     description: Show the information of a specific inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - manufacturerId
*            properties: 
*              iid:
*                type: string
*                default: 8b4753af-39a0-458a-88ae-182875e0ec3b
*     responses:
*        200:
*          description: Inventory information of a specific inventory
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
*                        mid:
*                          type: string
*                          example: 123412
*                        InventoryName:
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
*                        EmptyStatus:
*                          type: boolean
*                          example: true
*                        RealOwner:
*                          type: string
*                          example: true
*                        HouseNumber:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        Street:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        zip:
*                          type: integer
*                          example: 3200
*                        Thana:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        Division:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        AddressDetails:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        OwnerName:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        OwnerLogo:
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
inventoryRouter.post('/inventoryInfo', getInventoryInfo);




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
*              - bid
*            properties: 
*              fromIID:
*                type: string
*                default: ec77df68-7ad2-4bf3-aa25-04f5a95e4bfd
*              toIID:
*                type: string
*                default: 26c89f94-e98b-4378-8d7f-3961a766cb77
*              bid:
*                type: array
*                default: ['62634e68-822a-4c22-8682-e620b0391b3d', '559eab95-f7f1-471a-b04b-65a861451398']
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