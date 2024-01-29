//* External imports
const express = require('express');

//* Internal imports
const {
        getOnSaleProducts,
        getRecommendedCategories,    
        getAllCategories,
        getProductsByManufacturer,
        updateProductInformation,
        addNewProduct,
        addNewCategory,
        deleteProduct,
        deleteCategory,
        getProductByCategory,
        getProductDetails
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
*          description: Information not found/Invalid route/User not found 
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
*          description: Information not found/Invalid route/User not found 
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
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/recommendedCategories', getRecommendedCategories);





/**
* @swagger
* /api/products/byManufacturer:
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
*              - MID
*            properties: 
*              MID:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
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
*                        pid:
*                          type: string
*                          example: 123456
*                        CategoryName:
*                          type: string
*                          example: Mojito
*                        ProductName:
*                          type: string
*                          example: public/images/mojito.jpg
*                        Image:
*                          type: string
*                          example: 1000
*                        Weight_volume:
*                          type: double
*                          example: 250
*                        Unit:
*                          type: string
*                          example: ml
*                        UnitPrice:
*                          type: double
*                          example: 20
*                        Description:
*                          type: string
*                          example: refreshing
*                        rating:
*                          type: double
*                          example: 4.6
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/byManufacturer', getProductsByManufacturer);





/**
* @swagger
* /api/products/productUpdate:
*   put:
*     tags: [Products]
*     description: Update product information
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - PID
*              - productName
*              - productImage
*              - categoryName
*              - weightVolume
*              - unit
*              - unitPrice
*              - description
*              - minQuantityForSale
*              - minQuantityForDiscount
*              - discountRate
*              - minimumDiscount
*              - maximumDiscount
*              - productQuantityForDiscountRate
*            properties: 
*              PID:
*                type: integer
*                default: 123456
*              productName:
*                type: string
*                default: Mojito
*              productImage:
*                type: string
*                default: public/images/mojito.jpg
*              categoryName:
*                type: string
*                default: Beverage
*              weightVolume:
*                type: integer
*                default: 250
*              unit:
*                type: string
*                default: mL
*              unitPrice:
*                type: integer
*                default: 10
*              description:
*                type: string
*                default: A refreshing drink
*              minQuantityForSale:
*                type: integer
*                default: 100
*              minQuantityForDiscount:
*                type: integer
*                default: 200
*              discountRate:
*                type: double
*                default: 0.1
*              minimumDiscount:
*                type: integer
*                default: 10
*              maximumDiscount:
*                type: integer
*                default: 20
*              productQuantityForDiscountRate:
*                type: integer
*                default: 50
*     responses:
*        200:
*          description: Successfully updated product information   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.put('/productUpdate',updateProductInformation)




/**
* @swagger
* /api/products/newProduct:
*   post:
*     tags: [Products]
*     description: Add new product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*              - CategoryName
*              - ProductName
*              - Image
*              - Weight_Volume
*              - Unit
*              - UnitPrice
*              - Description
*              - MinQuantityForSale
*              - MinQuantityForDiscount
*              - MinimumDiscount
*              - MaximumDiscount
*              - DiscountRate
*              - ProductQuantityForDiscountRate
*            properties: 
*              MID:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*              CategoryName:
*                type: string
*                default: Beverage
*              ProductName:
*                type: string
*                default: Cola
*              Image:
*                type: string
*                default: public/image/ruchi_cola.jpg
*              Weight_Volume:
*                type: double
*                default: 250
*              Unit:
*                type: string
*                default: mL
*              UnitPrice:
*                type: double
*                default: 20
*              Description:
*                type: string
*                default: A refreshing drink
*              MinQuantityForSale:
*                type: integer
*                default: 100
*              MinQuantityForDiscount:
*                type: integer
*                default: 200
*              MinimumDiscount:
*                type: double
*                default: 10
*              MaximumDiscount:
*                type: double
*                default: 20
*              DiscountRate:
*                type: integer
*                default: 0.1
*              ProductQuantityForDiscountRate:
*                type: integer
*                default: 50
*     responses:
*        200:
*          description: Successfully added new product 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/newProduct', addNewProduct);



/**
* @swagger
* /api/products/newCategory:
*   post:
*     tags: [Products]
*     description: Add new product category
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - categoryName
*              - categoryImage
*            properties: 
*              categoryName:
*                type: string
*                default: Beverage
*              categoryImage:
*                type: string
*                default: public/images/beverage.jpg
*     responses:
*        200:
*          description: Successfully added new product category
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/newCategory', addNewCategory);



/**
* @swagger
* /api/products/deleteProduct:
*   delete:
*     tags: [Products]
*     description: Delete a product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - PID
*            properties: 
*              PID:
*                type: integer
*                default: 123456
*     responses:
*        200:
*          description: Successfully deleted product
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.delete('/deleteProduct', deleteProduct);



/**
* @swagger
* /api/products/deleteCategory:
*   delete:
*     tags: [Products]
*     description: Delete a product category
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - categoryName
*            properties: 
*              categoryName:
*                type: string
*                default: Beverage
*     responses:
*        200:
*          description: Successfully deleted the category
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.delete('/deleteCategory', deleteCategory);



/**
* @swagger
* /api/products/productByCategory:
*   post:
*     tags: [Products]
*     description: Get all the products of a category
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - categoryName
*            properties:
*              categoryName:
*                type: string
*                default: Beverage
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
*                        productName:
*                          type: string
*                          example: Mojito
*                        productImage:
*                          type: string
*                          example: public/images/mojito.jpg
*                        batch:
*                          type: array
*                          example: [123456, 256457, 256423]
*                        quantity:
*                          type: integer
*                          example: 1000
*                        discountRate:
*                          type: integer
*                          example: 10
*                        MID:
*                          type: integer
*                          example: 123456
*                        manufacturerName:
*                          type: string
*                          example: Fresh
*                        manufacturerLogo:
*                          type: string
*                          example: public/images/fresh.jpg
*                        unitPrice:
*                          type: integer
*                          example: 10
*                        weightVolume:
*                          type: integer
*                          example: 250
*                        unit:
*                          type: string
*                          example: mL
*                        rating:
*                          type: integer
*                          example: 4           
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/productByCategory', getProductByCategory);




/**
* @swagger
* /api/products/productDetails:
*   post:
*     tags: [Products]
*     description: Get all the details of a product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - PID
*            properties: 
*              PID:
*                type: integer
*                default: 123456
*     responses:
*        200:
*          description: Successfully added new product
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  product:
*                    type: object
*                    properties:
*                      PID:
*                        type: integer
*                        example: 123456
*                      productName:
*                        type: string
*                        example: Mojito
*                      productImages:
*                        type: array
*                        example: [public/images/mojito.jpg, public/images/mojito2.jpg, public/images/mojito3.jpg]
*                      batch:
*                        type: array
*                        example: [123456, 256457, 256423]
*                      quantity:
*                        type: integer
*                        example: 1000
*                      MID:
*                        type: integer
*                        example: 123456
*                      manufacturerName:
*                        type: string
*                        example: Fresh
*                      manufacturerLogo:
*                        type: string
*                        example: public/images/fresh.jpg
*                      unitPrice:
*                        type: integer
*                        example: 10
*                      weightVolume:
*                        type: integer
*                        example: 250
*                      unit:
*                        type: string
*                        example: mL
*                      rating:
*                        type: integer
*                        example: 4
*                      reviews:
*                        type: array
*                        items:
*                          type: object
*                          properties:
*                            username:
*                              type: string
*                              example: user1
*                            review:
*                              type: string
*                              example: This is a good product
*                            rating:
*                              type: integer
*                              example: 4
*                      description:
*                        type: string
*                        example: A refreshing drink
*                      minOrderQuantity:
*                        type: integer
*                        example: 100
*                      minQuantityForDiscount:
*                        type: integer
*                        example: 150
*                      discountRate:
*                        type: double
*                        example: 0.2
*                      minimumDiscount:
*                        type: integer
*                        example: 10
*                      maximumDiscount:
*                        type: integer
*                        example: 16
*                      productQuantityForDiscountRate:
*                        type: integer
*                        example: 50
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/productDetails', getProductDetails);


module.exports = productsRouter;