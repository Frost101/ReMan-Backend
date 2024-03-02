const express = require('express');
const vouchersController = require('../../controllers/vouchers/vouchersController');
const vouchersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: API operations related to vouchers
 */

/**
 * @swagger
 * /api/vouchers/addVoucher:
 *   post:
 *     summary: Add a new voucher
 *     description: Endpoint for adding a new voucher by a manufacturer or admin
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               VoucherCode:
 *                 type: string
 *                 example: RUCHIBOGO
 *               manufacturerId:
 *                 type: string
 *                 example: 2c397476-c131-4c60-b45a-12bd242ec256
 *               VoucherDetails:
 *                 type: string
 *                 example: Apply this to get 2.5% discount on all products
 *               VoucherPercentage:
 *                 type: double
 *                 example: 2.5
 *               Validity:
 *                 type: string
 *                 example: 2024-12-31
 *               MinPurchase:
 *                 type: double
 *                 example: 10000.0
 *               MaxUsage:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       '201':
 *         description: Voucher created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Voucher added successfully
 *       '400':
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request, Invalid input data
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
vouchersRouter.post('/addVoucher', vouchersController.addVoucher);


/**
 * @swagger
 * /api/vouchers/deleteVoucher:
 *   delete:
 *     summary: Delete an existing voucher
 *     description: Endpoint for deleting an existing voucher by a manufacturer or admin
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               VoucherCode:
 *                 type: string
 *                 example: "VOUCHER123"
 *     responses:
 *       '200':
 *         description: Voucher deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Voucher deleted successfully
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
 *         description: Not Found - Voucher not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Voucher not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
vouchersRouter.delete('/deleteVoucher', vouchersController.deleteVoucher);

/**
 * @swagger
 * /api/vouchers/fetchVouchers:
 *   post:
 *     summary: Fetch vouchers for a retailer
 *     description: Endpoint for fetching vouchers for a retailer
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sid:
 *                 type: string
 *                 example: 37c86bde-7c02-4bd5-923a-b302efdcf466
 *     responses:
 *       '200':
 *         description: Array of vouchers fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - voucherCode: "VOUCHER123"
 *                 voucherName: "Discount Voucher"
 *                 MID: "MANUFACTURER123"
 *                 voucherAmount: 10.0
 *                 validity: "2024-12-31"
 *                 minPurchase: 50.0
 *                 maxUsage: 100
 *               - voucherCode: "VOUCHER456"
 *                 voucherName: "Special Offer"
 *                 MID: "MANUFACTURER456"
 *                 voucherAmount: 15.0
 *                 validity: "2024-11-30"
 *                 minPurchase: 60.0
 *                 maxUsage: 200
 *               # Add more voucher objects as needed
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
vouchersRouter.post('/fetchVouchers', vouchersController.fetchVouchers);



/**
 * @swagger
 * /api/vouchers/fetchVouchersByManufacturer:
 *   post:
 *     summary: Fetch vouchers for a Manufacturer
 *     description: Endpoint for fetching vouchers for a Manufacturer
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               manufacturerId:
 *                 type: string
 *                 example: 2c397476-c131-4c60-b45a-12bd242ec256
 *     responses:
 *       '200':
 *         description: Array of vouchers fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - voucherCode: "VOUCHER123"
 *                 voucherName: "Discount Voucher"
 *                 MID: "MANUFACTURER123"
 *                 voucherAmount: 10.0
 *                 validity: "2024-12-31"
 *                 minPurchase: 50.0
 *                 maxUsage: 100
 *               - voucherCode: "VOUCHER456"
 *                 voucherName: "Special Offer"
 *                 MID: "MANUFACTURER456"
 *                 voucherAmount: 15.0
 *                 validity: "2024-11-30"
 *                 minPurchase: 60.0
 *                 maxUsage: 200
 *               # Add more voucher objects as needed
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
vouchersRouter.post('/fetchVouchersByManufacturer', vouchersController.fetchVouchersByManufacturer);



/**
 * @swagger
 * /api/vouchers/updateVoucher:
 *   put:
 *     summary: Update an existing voucher
 *     description: Endpoint for updating an existing voucher by a manufacturer or admin
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               VoucherCode:
 *                 type: string
 *                 example: RUCHIBOGO
 *               VoucherDetails:
 *                 type: string
 *                 example: Apply this to get 3.5% discount on all products
 *               VoucherPercentage:
 *                 type: double
 *                 example: 3.5
 *               Validity:
 *                 type: string
 *                 example: 2024-12-31
 *               MinPurchase:
 *                 type: double
 *                 example: 10000.0
 *               MaxUsage:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       '200':
 *         description: Voucher updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Voucher updated successfully
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
 *         description: Not Found - Voucher not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Voucher not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
vouchersRouter.put('/updateVoucher', vouchersController.updateVoucher);


/**
 * @swagger
 * /api/vouchers/updateVoucherUsage:
 *   put:
 *     summary: Update the usage of a voucher by a retailer
 *     description: Endpoint for updating the usage of a voucher by a retailer
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voucherCode:
 *                 type: string
 *                 example: "VOUCHER123"
 *               SID:
 *                 type: string
 *                 example: "RETAILER123"
 *     responses:
 *       '200':
 *         description: Voucher usage updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Voucher usage updated successfully
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
 *         description: Not Found - Voucher not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not Found, Voucher not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
vouchersRouter.put('/updateVoucherUsage', vouchersController.updateVoucherUsage);


module.exports = vouchersRouter;