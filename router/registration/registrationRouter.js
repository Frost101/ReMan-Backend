//* External imports
const express = require('express');

//* Internal imports
const registrationController = require('../../controllers/registration/registrationController');


//* Initialize router
const registrationRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: API operations related to user registration
 */

/**
 * @swagger
 * /api/registration/addRetailer:
 *   post:
 *     summary: Add a new retailer
 *     description: Endpoint for adding a new retailer
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ShopPhoneNumber:
 *                 type: string
 *                 example: "01234567890"
 *               TIN:
 *                 type: string
 *                 example: "TIN123456"
 *               ShopName:
 *                 type: string
 *                 example: "ABC Electronics"
 *               ShopType:
 *                 type: string
 *                 example: "Electronics"
 *               Website:
 *                 type: string
 *                 example: "www.abcelectronics.com"
 *               ShopEmail:
 *                 type: string
 *                 example: "info@abcelectronics.com"
 *               Password:
 *                 type: string
 *                 example: "12345"
 *               ShopImage:
 *                 type: string
 *                 example: "shop_image_url.jpg"
 *               HouseNumber:
 *                 type: string
 *                 example: "123"
 *               Street:
 *                 type: string
 *                 example: "Main Street"
 *               ZIP:
 *                 type: integer
 *                 example: 6200
 *               Thana:
 *                 type: string
 *                 example: "Cityville Thana"
 *               Division:
 *                 type: string
 *                 example: "Dhaka"
 *               AddressDetails:
 *                 type: string
 *                 example: "123 Main Street, Cityville"
 *               OwnerName:
 *                 type: string
 *                 example: "John Doe"
 *               OwnerDateOfBirth:
 *                 type: string
 *                 example: "1990-01-01"
 *               OwnerImage:
 *                 type: string
 *                 example: "owner_image_url.jpg"
 *               OwnerNID:
 *                 type: string
 *                 example: "NID123456789"
 *     responses:
 *       '201':
 *         description: Retailer created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Retailer created successfully
 *       '400':
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request, Invalid input data
 *       '409':
 *         description: Conflict - Retailer with the provided data already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Conflict, Retailer with the provided data already exists
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
registrationRouter.post('/addRetailer', registrationController.addRetailer);


/**
 * @swagger
 * /api/registration/addCompany:
 *   post:
 *     summary: Add a new manufacturing company
 *     description: Endpoint for adding a new manufacturing company
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PhoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               TIN:
 *                 type: string
 *                 example: "TIN123456"
 *               Name:
 *                 type: string
 *                 example: "ABC Manufacturing"
 *               Type:
 *                 type: string
 *                 example: "Electronics"
 *               Website:
 *                 type: string
 *                 example: "www.abcmfg.com"
 *               Email:
 *                 type: string
 *                 example: "info@abcmfg.com"
 *               Password:
 *                 type: string
 *                 example: "securepassword"
 *               Logo:
 *                 type: string
 *                 example: "company_logo_url.jpg"
 *               HouseNumber:
 *                 type: string
 *                 example: "123"
 *               Street:
 *                 type: string
 *                 example: "Main Street"
 *               ZIP:
 *                 type: string
 *                 example: "12345"
 *               Thana:
 *                 type: string
 *                 example: "Cityville Thana"
 *               Division:
 *                 type: string
 *                 example: "Dhaka"
 *               AddressDetails:
 *                 type: string
 *                 example: "123 Main Street, Cityville"
 *     responses:
 *       '201':
 *         description: Manufacturing company created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Manufacturing company created successfully
 *       '400':
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request, Invalid input data
 *       '409':
 *         description: Conflict - Company with the provided data already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Conflict, Company with the provided data already exists
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
registrationRouter.post('/addCompany', registrationController.addCompany);

/**
 * @swagger
 * /api/registration/addManufacturingCompanyOwner:
 *   post:
 *     summary: Add a new owner under a manufacturing company
 *     description: Endpoint for adding a new owner under a manufacturing company
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MID:
 *                 type: string
 *                 example: "MANUFACTURER123"
 *               OwnerName:
 *                 type: string
 *                 example: "John Doe"
 *               OwnerDateOfBirth:
 *                 type: string
 *                 example: "1990-01-01"
 *               OwnerImage:
 *                 type: string
 *                 example: "owner_image_url.jpg"
 *               OwnerEmail:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               OwnerPhone:
 *                 type: string
 *                 example: "1234567890"
 *               OwnerNID:
 *                 type: string
 *                 example: "NID123456789"
 *     responses:
 *       '201':
 *         description: Owner created successfully under the manufacturing company
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Owner created successfully under the manufacturing company
 *       '400':
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request, Invalid input data
 *       '409':
 *         description: Conflict - Owner with the provided data already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Conflict, Owner with the provided data already exists
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
registrationRouter.post('/addManufacturingCompanyOwner', registrationController.addManufacturingCompanyOwner);

module.exports = registrationRouter;