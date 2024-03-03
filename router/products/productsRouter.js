//* External imports
const express = require('express');

//* Internal imports
const {
        getOnSaleProducts,
        getRecommendedCategories,    
        getAllCategories,
        getProductsByManufacturer,
        getProductsByInventory,
        getInventoriesByProduct,
        getProductsByProductionHouse,
        getCategoriesByManufacturer,
        updateProductInformation,
        addNewProduct,
        addNewCategory,
        deleteProduct,
        deleteCategory,
        getProductByCategory,
        getProductInfo,
        getProductDetails,
        getProductRatingByManufacturer,
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
*     description: Get all the products of a manufacturer
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
* /api/products/byInventory:
*   post:
*     tags: [Products]
*     description: Get all the products of an inventory
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - iid
*            properties: 
*              iid:
*                type: string
*                default: 8b4753af-39a0-458a-88ae-182875e0ec3b
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
*                        Rating:
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
productsRouter.post('/byInventory', getProductsByInventory);




/**
* @swagger
* /api/products/getInventories:
*   post:
*     tags: [Products]
*     description: Get all inventories for a product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - pid
*            properties: 
*              pid:
*                type: string
*                default: 4c5cf7b4-ecd5-453a-abd9-2be12291c7c3
*     responses:
*        200:
*          description: An array of inventories
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                 inventories:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        iid:
*                          type: string
*                          example: 123456
*                        InventoryName:
*                          type: string
*                          example: Mojito
*                        Image:
*                          type: string
*                          example: public/images/mojito.jpg
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/getInventories', getInventoriesByProduct);





/**
* @swagger
* /api/products/byProductionHouse:
*   post:
*     tags: [Products]
*     description: Get all the products of a production house
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - phid
*            properties: 
*              phid:
*                type: string
*                default: a5e62d0b-be4d-4516-8334-2576df8b8282
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
*                        Rating:
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
productsRouter.post('/byProductionHouse', getProductsByProductionHouse);





/**
* @swagger
* /api/products/manufacturerCategories:
*   post:
*     tags: [Products]
*     description: Get all the categories of a manufacturer
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
*          description: An array of categories
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  categories:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        CategoryName:
*                          type: string
*                          example: Juice
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/manufacturerCategories', getCategoriesByManufacturer);





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
*              - MinimumDeliveryCharge
*              - DeliveryChargeIncreaseRate
*            properties: 
*              PID:
*                type: string
*                default: e7ea9b52-8ab6-4634-8178-1c38ab0340df
*              MID:
*                type: string
*                default: e7ea9b52-8ab6-4634-8178-1c38ab0340df
*              CategoryName:
*                type: string
*                default: Chanachur
*              ProductName:
*                type: string
*                default: pran_spicy_chanachur
*              Image:
*                type: array
*                default: ['public/image/pran_spicy_chanachur1.jpg', 'public/image/pran_spicy_chanachur2.jpg', 'public/image/pran_spicy_chanachur3.jpg']
*              Weight_Volume:
*                type: double
*                default: 250
*              Unit:
*                type: string
*                default: g
*              UnitPrice:
*                type: double
*                default: 20
*              Description:
*                type: string
*                default: A spicy chanachur to spice up your life
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
*              MinimumDeliveryCharge:
*                type: double
*                default: 100
*              DeliveryChargeIncreaseRate:
*                type: double
*                default: 1.0
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
*              - MinimumDeliveryCharge
*              - DeliveryChargeIncreaseRate
*            properties: 
*              MID:
*                type: string
*                default: e7ea9b52-8ab6-4634-8178-1c38ab0340df
*              CategoryName:
*                type: string
*                default: Chanachur
*              ProductName:
*                type: string
*                default: pran_spicy_chanachur
*              Image:
*                type: array
*                default: ['public/image/pran_spicy_chanachur1.jpg', 'public/image/pran_spicy_chanachur2.jpg', 'public/image/pran_spicy_chanachur3.jpg']
*              Weight_Volume:
*                type: double
*                default: 250
*              Unit:
*                type: string
*                default: g
*              UnitPrice:
*                type: double
*                default: 20
*              Description:
*                type: string
*                default: A spicy chanachur to spice up your life
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
*              MinimumDeliveryCharge:
*                type: double
*                default: 100
*              DeliveryChargeIncreaseRate:
*                type: double
*                default: 1.0
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
*                type: string
*                default: d5003c4f-862f-496e-b0d8-83030b409869
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
*              - CategoryName
*            properties: 
*              CategoryName:
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
*              - CategoryName
*            properties:
*              CategoryName:
*                type: string
*                default: Juice
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
*                        ProductName:
*                          type: string
*                          example: Mojito
*                        Image:
*                          type: string
*                          example: public/images/mojito.jpg
*                        Weight_volume:
*                          type: double
*                          example: 120
*                        Unit:
*                          type: string
*                          example: 1000
*                        UnitPrice:
*                          type: double
*                          example: 10
*                        Description:
*                          type: string
*                          example: 123456
*                        Rating:
*                          type: double
*                          example: 4.7
*                        mid:
*                          type: string
*                          example: 435465
*                        ManufacturerName:
*                          type: string
*                          example: Mojo
*                        ManufacturerLogo:
*                          type: string
*                          example: public/images/mojito.jpg      
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
* /api/products/productInfo:
*   post:
*     tags: [Products]
*     description: Get product info of a specific product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - pid
*            properties:
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: An array of products
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  productInfo:
*                      type: object
*                      properties:
*                        CategoryName:
*                          type: string
*                          example: Juice
*                        ProductName:
*                          type: string
*                          example: Mojito
*                        Image:
*                          type: string
*                          example: public/images/mojito.jpg
*                        Weight_volume:
*                          type: double
*                          example: 120
*                        Unit:
*                          type: string
*                          example: 1000
*                        UnitPrice:
*                          type: double
*                          example: 10
*                        Description:
*                          type: string
*                          example: 123456
*                        Rating:
*                          type: double
*                          example: 4.7
*                        MinQuantityForSale:
*                          type: integer
*                          example: 100
*                        MinQuantityForDiscount:
*                          type: integer
*                          example: 200
*                        MinimumDiscount:
*                          type: double
*                          example: 5
*                        MaximumDiscount:
*                          type: double
*                          example: 20
*                        DiscountRate:
*                          type: double
*                          example: 0.2
*                        ProductQuantityForDiscountRate:
*                          type: integer
*                          example: 30
*                        mid:
*                          type: string
*                          example: 435465
*                        ManufacturerName:
*                          type: string
*                          example: Mojo
*                        ManufacturerLogo:
*                          type: string
*                          example: public/images/mojito.jpg
*                        TotalQuantity:
*                          type: integer
*                          example: 1000      
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Information not found/Invalid route/User not found 
*        default:
*          description: Internal server error
*/
productsRouter.post('/productInfo', getProductInfo);




/**
* @swagger
* /api/products/productDetails:
*   post:
*     tags: [Products]
*     description: Get product info of a specific product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - pid
*            properties:
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: Product Description of a single product
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  productInfo:
*                      type: object
*                      properties:
*                        CategoryName:
*                          type: string
*                          example: Juice
*                        ProductName:
*                          type: string
*                          example: Mojito
*                        Image:
*                          type: string
*                          example: public/images/mojito.jpg
*                        Weight_volume:
*                          type: double
*                          example: 120
*                        Unit:
*                          type: string
*                          example: 1000
*                        UnitPrice:
*                          type: double
*                          example: 10
*                        Description:
*                          type: string
*                          example: 123456
*                        Rating:
*                          type: double
*                          example: 4.7
*                        MinQuantityForSale:
*                          type: integer
*                          example: 100
*                        MinQuantityForDiscount:
*                          type: integer
*                          example: 200
*                        MinimumDiscount:
*                          type: double
*                          example: 5
*                        MaximumDiscount:
*                          type: double
*                          example: 20
*                        DiscountRate:
*                          type: double
*                          example: 0.2
*                        ProductQuantityForDiscountRate:
*                          type: integer
*                          example: 30
*                        mid:
*                          type: string
*                          example: 435465
*                        ManufacturerName:
*                          type: string
*                          example: Mojo
*                        ManufacturerLogo:
*                          type: string
*                          example: public/images/mojito.jpg
*                        TotalQuantity:
*                          type: integer
*                          example: 1000
*                        OtherImages:
*                          type: array
*                          example: ['public/images/mojito1.jpg', 'public/images/mojito2.jpg', 'public/images/mojito3.jpg']      
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




/**
* @swagger
* /api/products/ProductRatingbyManufacturer:
*   post:
*     tags: [Products]
*     description: Get all the products and their Ratings of a manufacturer
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
*          description: An array of products and ratings
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
*                        ProductName:
*                          type: string
*                          example: Juice
*                        Rating:
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
productsRouter.post('/ProductRatingbyManufacturer', getProductRatingByManufacturer);


module.exports = productsRouter;