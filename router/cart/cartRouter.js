//* External imports
const express = require('express');

//* Internal imports
const {getCartInfo, updateCartInfo, addToCartInfo, deleteCartInfo} = require('../../controllers/cart/cartController'); 

//* Initialize router
const cartRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart information and update related routes
 */




/**
* @swagger
* /api/cart/cartInfo:
*   post:
*     tags: [Cart]
*     description: Get Cart Information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - sid
*            properties: 
*              sid:
*                type: string
*                default: 37c86bde-7c02-4bd5-923a-b302efdcf466
*     responses:
*        200:
*          description: An array of products' information in the cart
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  products:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        productName:
*                          type: string
*                          example: Mojo
*                        image:
*                          type: string
*                          example: public/images/mojo.jpg
*                        bid:
*                          type: array
*                          example: [123456, 256457, 256423]
*                        pid:
*                          type: integer
*                          example: 123456
*                        mid:
*                          type: integer
*                          example: 123456
*                        weight_volume:
*                          type: integer
*                          example: 500
*                        unit:
*                          type: string
*                          example: ml
*                        unitPrice:
*                          type: integer
*                          example: 30
*                        quantity:
*                          type: integer
*                          example: 1000
*                        minQuantityForSale:
*                          type: integer
*                          example: 100
*                        minQuantityForDiscount:
*                          type: integer
*                          example: 500
*                        minDiscount:
*                          type: double
*                          example: 2.5
*                        maxDiscount:
*                          type: double
*                          example: 8.0
*                        discountRate:
*                          type: double
*                          example: 0.5
*                        productQuantityForDiscountRate:
*                          type: integer
*                          example: 100    
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
cartRouter.post('/cartInfo', getCartInfo);




/**
* @swagger
* /api/cart/updateCart:
*   put:
*     tags: [Cart]
*     description: Update cart information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - products
*            properties: 
*                  products:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        sid:
*                          type: integer
*                          example: 123456
*                        pid:
*                          type: integer
*                          example: 423456
*                        quantity:
*                          type: integer
*                          example: 1000
*                        price:
*                          type: integer
*                          example: 30000
*     responses:
*        200:
*          description: Success message
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: updating cart successful  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
cartRouter.put('/updateCart', updateCartInfo);




/**
* @swagger
* /api/cart/addToCart:
*   post:
*     tags: [Cart]
*     description: Add to cart information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - product
*            properties: 
*                  product:
*                      type: object
*                      properties:
*                        sid:
*                          type: string
*                          example: 37c86bde-7c02-4bd5-923a-b302efdcf466
*                        pid:
*                          type: string
*                          example: 288e0918-67ef-448d-b05d-380543e3ebcc
*                        Quantity:
*                          type: integer
*                          example: 1000
*                        Price:
*                          type: double
*                          example: 15000
*     responses:
*        200:
*          description: Success message
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: adding to cart successful  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
cartRouter.post('/addToCart', addToCartInfo);




/**
* @swagger
* /api/cart/deleteCart:
*   delete:
*     tags: [Cart]
*     description: Delete Cart Information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*            properties: 
*              SID:
*                type: integer
*                default: 123456
*     responses:
*        200:
*          description: Success message
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: deleting cart successful   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
cartRouter.delete('/deleteCart', deleteCartInfo);

module.exports = cartRouter;