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
 *                 example: "VOUCHER123"
 *               manufacturerId:
 *                 type: string
 *                 example: "MANUFACTURER123"
 *               VoucherDetails:
 *                 type: string
 *                 example: "Discount Voucher"
 *               VoucherPercentage:
 *                 type: double
 *                 example: 10.0
 *               Validity:
 *                 type: string
 *                 example: "2024-12-31"
 *               MinPurchase:
 *                 type: integer
 *                 example: 50.0
 *               MaxUsage:
 *                 type: integer
 *                 example: 100
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
 *               voucherCode:
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
 *               SID:
 *                 type: string
 *                 example: "RETAILER123"
 *               MID:
 *                 type: array
 *                 example:
 *                  - "MANUFACTURER123"
 *                  - "MANUFACTURER456"
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
 *               voucherCode:
 *                 type: string
 *                 example: "VOUCHER123"
 *               voucherName:
 *                 type: string
 *                 example: "Discount Voucher"
 *               MID:
 *                 type: string
 *                 example: "MANUFACTURER123"
 *               voucherAmount:
 *                 type: number
 *                 example: 10.0
 *               validity:
 *                 type: string
 *                 example: "2024-12-31"
 *               minPurchase:
 *                 type: number
 *                 example: 50.0
 *               maxUsage:
 *                 type: number
 *                 example: 100
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