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
 *               - IID: "INV001"
 *                 InventoryName: "Warehouse A"
 *                 Address: "123 Main Street, Cityville"
 *                 Capacity: 1000
 *                 Type: "Warehouse"
 *                 Image: "warehouse_image_url.jpg"
 *               - IID: "INV002"
 *                 InventoryName: "Storage Facility B"
 *                 Address: "456 Oak Avenue, Townsville"
 *                 Capacity: 500
 *                 Type: "Storage"
 *                 Image: "storage_image_url.jpg"
 *               # Add more empty inventory objects as needed
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
 *                 example: e7ea9b52-8ab6-4634-8178-1c38ab0340df
 *     responses:
 *       '200':
 *         description: Array of inventories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - RID: "RENTAL001"
 *                 IID: "INV001"
 *                 MID: "MANUFACTURER123"
 *                 Duration: 30
 *                 PaymentPerDay: 10.0
 *                 InventoryName: "Warehouse A"
 *                 Capacity: 1000
 *                 Type: "Warehouse"
 *                 HouseNumber: "123"
 *                 Street: "Main Street"
 *                 ZIP: "12345"
 *                 Thana: "Cityville Thana"
 *                 Division: "Dhaka"
 *                 AddressDetails: "123 Main Street, Cityville"
 *                 Image: "warehouse_image_url.jpg"
 *               - RID: "RENTAL002"
 *                 IID: "INV002"
 *                 MID: "MANUFACTURER456"
 *                 Duration: 15
 *                 PaymentPerDay: 8.0
 *                 InventoryName: "Storage Facility B"
 *                 Capacity: 500
 *                 Type: "Storage"
 *                 HouseNumber: "456"
 *                 Street: "Oak Avenue"
 *                 ZIP: "67890"
 *                 Thana: "Townsville Thana"
 *                 Division: "Chittagong"
 *                 AddressDetails: "456 Oak Avenue, Townsville"
 *                 Image: "storage_image_url.jpg"
 *               # Add more inventory objects as needed
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
 *               RID:
 *                 type: string
 *                 example: "RENTAL123"
 *               IID:
 *                 type: string
 *                 example: "INV001"
 *               LeaseFromMID:
 *                 type: string
 *                 example: "MANUFACTURER456"
 *               LeaseToMID:
 *                 type: string
 *                 example: "RENTAL123"
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
 *               RID:
 *                 type: string
 *                 example: "RENTAL123"
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