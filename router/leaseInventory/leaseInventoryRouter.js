const express = require('express');
const leaseInventoryController = require('../../controllers/leaseInventory/leaseInventoryController');
const leaseInventoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: LeaseInventory
 *   description: API operations related to leasing inventory
 */

/**
 * @swagger
 * /api/leaseInventory/emptyInventoryList:
 *   post:
 *     summary: Get a list of empty inventories of a manufacturer
 *     description: Endpoint for listing empty inventories of a manufacturer
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mid:
 *                 type: string
 *                 example: "2c397476-c131-4c60-b45a-12bd242ec256"
 *     responses:
 *       '200':
 *         description: Array of empty inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - iid: "INV001"
 *                 InventoryName: "Warehouse A"
 *                 Capacity: 1000
 *                 Type: "Warehouse"
 *                 Details: "A flavor-packed journey featuring the perfect blend of chips and Chanachur delights."
 *                 HouseNumber: "123"
 *                 Street: "Main Street"
 *                 zip: "12345"
 *                 Thana: "Cityville Thana"
 *                 Division: "Dhaka"
 *                 AddressDetails: "123 Main Street, Cityville"
 *                 Image: "warehouse_image_url.jpg"
 *       '401':
 *         description: Unauthorized - User authentication required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized, User authentication required
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden, Insufficient permissions
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/emptyInventoryList', leaseInventoryController.emptyInventoryList);

/**
 * @swagger
 * /api/leaseInventory/giveLease:
 *   post:
 *     summary: Give lease for an inventory
 *     description: Endpoint for giving lease for an inventory
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               iid:
 *                 type: string
 *                 example: 6b6fd057-bae2-4786-90e4-916ed809baa2
 *               mid:
 *                 type: string
 *                 example: 2c397476-c131-4c60-b45a-12bd242ec256
 *               Duration:
 *                 type: integer
 *                 example: 30  # Lease duration in days
 *               PerDayRent:
 *                 type: double
 *                 example: 100.0  # Payment amount per day
 *               Details:
 *                 type: string
 *                 example: It is for seasonal foods and fresh storage
 *     responses:
 *       '200':
 *         description: Lease given successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Lease given successfully
 *       '401':
 *         description: Unauthorized - User authentication required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized, User authentication required
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden, Insufficient permissions
 *       '404':
 *         description: Not Found - Inventory not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Inventory not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/giveLease', leaseInventoryController.giveLease);

/**
 * @swagger
 * /api/leaseInventory/inventoryMarketplace:
 *   post:
 *     summary: Get inventories currently on lease and not taken of others
 *     description: Endpoint for showing inventories currently on lease and not taken
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mid:
 *                 type: string
 *                 example: e7ea9b52-8ab6-4634-8178-1c38ab0340df
 *     responses:
 *       '200':
 *         description: Array of inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - rid: "RENTAL001"
 *                 iid: "INV001"
 *                 FreeFrom: "MANUFACTURER123"
 *                 FreeTill: 30
 *                 PerDayRent: 10.0
 *                 Details: "Warehouse A"
 *                 InventoryName: 1000
 *                 Capacity: "Warehouse"
 *                 Type: "123"
 *                 HouseNumber: "123"
 *                 Street: "Main Street"
 *                 zip: "12345"
 *                 Thana: "Cityville Thana"
 *                 Division: "Dhaka"
 *                 AddressDetails: "123 Main Street, Cityville"
 *                 Image: "warehouse_image_url.jpg"
 *                 OwnerName: "Ruchi"
 *                 OwnerLogo: "public/ruchi.png"
 *                 OwnerPhoneNumber: "01703486743" 
 *                 OwnerEmail: "ruchi@gmail.com" 
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/inventoryMarketplace', leaseInventoryController.inventoryMarketplace);




/**
 * @swagger
 * /api/leaseInventory/leasedInventoriesNotTaken:
 *   post:
 *     summary: Get inventories currently on lease and not taken
 *     description: Endpoint for showing inventories currently on lease and not taken
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mid:
 *                 type: string
 *                 example: 2c397476-c131-4c60-b45a-12bd242ec256
 *     responses:
 *       '200':
 *         description: Array of inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - rid: "RENTAL001"
 *                 iid: "INV001"
 *                 FreeFrom: "2024-02-22T00:00:00.000Z"
 *                 FreeTill: "2024-04-22T00:00:00.000Z"
 *                 PerDayRent: 200
 *                 Details: "Offering a tantalizing mix of chips and refreshing juices for a snacking experience like no other."
 *                 InventoryName: "Warehouse A"
 *                 Capacity: 1000
 *                 Type: "Warehouse"
 *                 HouseNumber: "123"
 *                 Street: "Main Street"
 *                 zip: "12345"
 *                 Thana: "Cityville Thana"
 *                 Division: "Dhaka"
 *                 AddressDetails: "123 Main Street, Cityville"
 *                 Image: "warehouse_image_url.jpg"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/leasedInventoriesNotTaken', leaseInventoryController.leasedInventoriesNotTaken);




/**
 * @swagger
 * /api/leaseInventory/leasedInventoriesTaken:
 *   post:
 *     summary: Get inventories currently on lease and taken
 *     description: Endpoint for showing inventories currently on lease and taken
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mid:
 *                 type: string
 *                 example: 2c397476-c131-4c60-b45a-12bd242ec256
 *     responses:
 *       '200':
 *         description: Array of inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - rid: "d3fcff83-d7bd-4058-ac87-cd11dc000c5b"
 *                 iid: "6b6fd057-bae2-4786-90e4-916ed809baa2"
 *                 FreeFrom: "2024-02-22T00:00:00.000Z"
 *                 FreeTill: "2024-03-23T00:00:00.000Z"
 *                 PerDayRent: 100
 *                 Details: "Fresh Food Storage"
 *                 OccupiedFrom: "2024-02-22T00:00:00.000Z"
 *                 OccupiedTill: "2024-03-19T00:00:00.000Z"
 *                 OwnedToID: "e7ea9b52-8ab6-4634-8178-1c38ab0340df"
 *                 InventoryName: "Inventory8"
 *                 Capacity: 2200
 *                 Type: "Cold Stoarge"
 *                 HouseNumber: "D-120"
 *                 Street: "Dholabari Street"
 *                 zip: 6100
 *                 Thana: "Karampur"
 *                 Division: "Tangail"
 *                 AddressDetails: "Near the jame mosjid"
 *                 Image: "public/images/Inventory8.jpg"
 *                 CompanyName: "Pran"
 *                 CompanyLogo: "public/pran.png"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/leasedInventoriesTaken', leaseInventoryController.leasedInventoriesTaken);




/**
 * @swagger
 * /api/leaseInventory/ownLeasedInventories:
 *   post:
 *     summary: Get inventories currently on lease and taken by ownself
 *     description: Endpoint for showing inventories currently on lease and taken by ownself
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mid:
 *                 type: string
 *                 example: e7ea9b52-8ab6-4634-8178-1c38ab0340df
 *     responses:
 *       '200':
 *         description: Array of inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - rid: "d3fcff83-d7bd-4058-ac87-cd11dc000c5b"
 *                 iid: "6b6fd057-bae2-4786-90e4-916ed809baa2"
 *                 FreeFrom: "2024-02-22T00:00:00.000Z"
 *                 FreeTill: "2024-03-23T00:00:00.000Z"
 *                 PerDayRent: 100
 *                 Details: "Fresh Food Storage"
 *                 OccupiedFrom: "2024-02-22T00:00:00.000Z"
 *                 OccupiedTill: "2024-03-19T00:00:00.000Z"
 *                 OwnerID: "2c397476-c131-4c60-b45a-12bd242ec256"
 *                 InventoryName: "Inventory8"
 *                 Capacity: 2200
 *                 Type: "Cold Stoarge"
 *                 HouseNumber: "D-120"
 *                 Street: "Dholabari Street"
 *                 zip: 6100
 *                 Thana: "Karampur"
 *                 Division: "Tangail"
 *                 AddressDetails: "Near the jame mosjid"
 *                 Image: "public/images/Inventory8.jpg"
 *                 CompanyName: "Ruchi"
 *                 CompanyLogo: "public/ruchi.png"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.post('/ownLeasedInventories', leaseInventoryController.ownLeasedInventories);

/**
 * @swagger
 * /api/leaseInventory/takeLease:
 *   put:
 *     summary: Take lease from the inventory marketplace
 *     description: Endpoint for taking lease from the inventory marketplace
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *       '200':
 *         description: Lease taken successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Lease taken successfully
 *       '401':
 *         description: Unauthorized - User authentication required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized, User authentication required
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden, Insufficient permissions
 *       '404':
 *         description: Not Found - Inventory not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Inventory not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.put('/takeLease', leaseInventoryController.takeLease);




/**
 * @swagger
 * /api/leaseInventory/extendLease:
 *   put:
 *     summary: Extend Lease of an inventory
 *     description: Endpoint for extending lease of an inventory
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rid:
 *                 type: string
 *                 example: d3fcff83-d7bd-4058-ac87-cd11dc000c5b
 *               OccupiedTill:
 *                 type: string
 *                 example: 2024-03-18
 *     responses:
 *       '200':
 *         description: Lease taken successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Lease taken successfully
 *       '401':
 *         description: Unauthorized - User authentication required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized, User authentication required
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden, Insufficient permissions
 *       '404':
 *         description: Not Found - Inventory not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Inventory not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.put('/extendLease', leaseInventoryController.extendLease);



/**
 * @swagger
 * /api/leaseInventory/deleteFromRental:
 *   delete:
 *     summary: Remove inventory from rental
 *     description: Endpoint for removing inventory from rental
 *     tags: [LeaseInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rid:
 *                 type: string
 *                 example: d92e31e0-3b5b-4a30-96f4-025c21e91f30
 *     responses:
 *       '200':
 *         description: Inventory removed from rental successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Inventory removed from rental successfully
 *       '401':
 *         description: Unauthorized - User authentication required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized, User authentication required
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden, Insufficient permissions
 *       '404':
 *         description: Not Found - Inventory not found in rental
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Inventory not found in rental
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
leaseInventoryRouter.delete('/deleteFromRental', leaseInventoryController.deleteFromRental);



module.exports = leaseInventoryRouter;