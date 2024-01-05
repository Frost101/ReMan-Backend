//* External imports
const express = require('express');

//* Internal imports
const {
        getOnSaleProducts,
        getRecommendedCategories,    
        getAllCategories,
    } = require('../../controllers/products/productsController');


//* Initialize router
const productsRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Products and Categories related routes
 */




/**
* @swagger
* /api/products/onSale:
*   get:
*     tags: [Products]
*     description: Get all the products that are on sale
*     responses:
*        200:
*          description: An array of products
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
*                        PID:
*                          type: integer
*                          example: 123456
*                        MID:
*                          type: integer
*                          example: 123456
*                        productName:
*                          type: string
*                          example: Mojito
*                        price:
*                          type: integer
*                          example: 10
*                        productImage:
*                          type: string
*                          example: public/images/mojito.jpg
*                        batch:
*                          type: array
*                          example: [123456, 256457, 256423]
*                        quantity:
*                          type: integer
*                          example: 1000
*                        saleRate:
*                          type: integer
*                          example: 50
*                        manufacturerName:
*                          type: string
*                          example: Fresh
*                        manufacturerLogo:
*                          type: string
*                          example: public/images/fresh.jpg
*                        weightVolume:
*                          type: integer
*                          example: 250
*                        unit:
*                          type: string
*                          example: mL           
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.get('/onSale', getOnSaleProducts);




/**
* @swagger
* /api/products/allCategories:
*   get:
*     tags: [Products]
*     description: Get all the available product categories and their images
*     responses:
*        200:
*          description: An array of categories
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
*                        categoryName:
*                          type: string
*                          example: Beverage
*                        categoryImage:
*                          type: string
*                          example: public/images/beverage.jpg      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.get('/allCategories', getAllCategories);



/**
* @swagger
* /api/products/recommendedCategories:
*   post:
*     tags: [Products]
*     description: If SID is provided, returns recommended categories for that SHOP/Retailer. If SID is not provided, returns globally popular categories.
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
*          description: An array of categories
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
*                        categoryName:
*                          type: string
*                          example: Beverage
*                        categoryImage:
*                          type: string
*                          example: public/images/beverage.jpg      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/recommendedCategories', getRecommendedCategories);


module.exports = productsRouter;