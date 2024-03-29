//* External imports
const express = require('express');

//* Internal imports
const {addNewOrder, updateDeliveryStatus, getRetailerOrders, getManufacturerOrders, getOrderedProductInfo, updateShipmentInfo, getRetailerOrderDetails, getManufacturerOrderDetails, deleteOrder, deliveryStatus, getRetailerOrdersWithDeliveryStatus, addReviewRating} = require('../../controllers/order/orderController'); 

//* Initialize router
const orderRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Order management related routes
 */




/**
* @swagger
* /api/order/addOrder:
*   post:
*     tags: [Order]
*     description: Add a new Order
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - sid
*              - VoucherCode
*              - PaymentMethod
*              - TransactionID
*            properties: 
*              sid:
*                type: string
*                default: 37c86bde-7c02-4bd5-923a-b302efdcf466
*              VoucherCode:
*                type: string
*                default: RUCHIBOGO
*              PaymentMethod:
*                type: string
*                default: Cash On Delivery
*              TransactionID:
*                type: string
*                default: null
*     responses:
*        200:
*          description: Adding a new order successful
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: adding a new order successful     
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/addOrder', addNewOrder);




/**
* @swagger
* /api/order/deliveryStatus:
*   put:
*     tags: [Order]
*     description: Update Delivery Status and select which products to deliver
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - DeliveryStatus
*              - DeliveryDate
*              - OrderID
*              - MID
*              - BatchQuantities
*            properties: 
*              DeliveryStatus:
*                type: string
*                default: delivered
*              DeliveryDate:
*                type: string
*                default: 09/08/2023
*              OrderID:
*                type: integer
*                default: 233412
*              MID:
*                type: integer
*                default: 123412
*              BatchQuantities:
*                type: array
*                items:
*                  type: object
*                  properties:
*                    BID:
*                     type: integer
*                     example: 233412
*                    Quantity:
*                     type: integer
*                     example: 1000
*     responses:
*        200:
*          description: Updating Order Status and Assigning Batches to an Order
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Order Status Update and Assigning Batches Successful 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.put('/deliveryStatus', updateDeliveryStatus);




/**
* @swagger
* /api/order/retailer:
*   post:
*     tags: [Order]
*     description: Get all orders of a retailer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*            properties: 
*              sid:
*                type: string
*                default: ffeca534-d5ac-4e37-a713-883f1f3045da
*     responses:
*        200:
*          description: An array of Orders of a Retailer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  orders:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        mid:
*                          type: string
*                          example: 233412
*                        RawPrice:
*                          type: double
*                          example: 4532
*                        DeliveryCharge:
*                          type: double
*                          example: 34346
*                        VoucherCode:
*                          type: string
*                          example: 230000
*                        ReducedAmount:
*                          type: double
*                          example: 45636
*                        FinalPrice:
*                          type: double
*                          example: 4563634
*                        PaymentStatus:
*                          type: string
*                          example: COD
*                        DeliveryStatus:
*                          type: string
*                          example: COD
*                        DeliveryDate:
*                          type: string
*                          example: COD  
*                        ShipmentStatus:
*                          type: string
*                          example: COD  
*                        ManufacturerName:
*                          type: string
*                          example: COD
*                        ManufacturerLogo:
*                          type: string
*                          example: COD  
*                        OrderDate:
*                          type: string
*                          example: COD  
*                        PaymentMethod:
*                          type: string
*                          example: COD  
*                        oid:
*                          type: string
*                          example: COD  
*                        TransactionID:
*                          type: string
*                          example: COD        
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/retailer', getRetailerOrders);




/**
* @swagger
* /api/order/orderedProductInfo:
*   post:
*     tags: [Order]
*     description: Get information for an order of a product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - manufacturerId
*              - oid
*              - pid
*            properties: 
*              manufacturerId:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*              oid:
*                type: string
*                default: 870fa621-a340-48c5-a382-9bd3be0366d0
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*     responses:
*        200:
*          description: An array of Orders of a Manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  orders:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        oid:
*                          type: integer
*                          example: 233412
*                        shopName:
*                          type: string
*                          example: Hatir Store
*                        shopImage:
*                          type: string
*                          example: public/images/hatir_store.jpg
*                        shopPhoneNumber:
*                          type: string
*                          example: 01787623092
*                        orderDate:
*                          type: string
*                          example: 03/08/2023
*                        deliveryDate:
*                          type: string
*                          example: 17/08/2023
*                        totalPrice:
*                          type: integer
*                          example: 230000
*                        paymentStatus:
*                          type: string
*                          example: Paid
*                        deliveryStatus:
*                          type: string
*                          example: Delivered
*                        paymentMethod:
*                          type: string
*                          example: COD 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/orderedProductInfo', getOrderedProductInfo);




/**
* @swagger
* /api/order/updateShipmentInfo:
*   put:
*     tags: [Order]
*     description: Update Shipment Information of an order
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - manufacturerId
*              - oid
*              - pid
*              - bid
*              - Quantity
*            properties: 
*              manufacturerId:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*              oid:
*                type: string
*                default: 08402709-4821-46bf-954f-3515c0f9c8ba
*              pid:
*                type: string
*                default: 288e0918-67ef-448d-b05d-380543e3ebcc
*              bid:
*                type: string
*                default: 0ed39543-023a-43ec-b634-f99f53814826
*              Quantity:
*                type: integer
*                default: 10
*     responses:
*        200:
*          description: Updating Shipment Status and Assigning Batches to an Order
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Shipment Status Update and Assigning Batches Successful 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.put('/updateShipmentInfo', updateShipmentInfo);




/**
* @swagger
* /api/order/manufacturer:
*   post:
*     tags: [Order]
*     description: Get all the orders of a mnaufacturer
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
*          description: An array of Orders of a Manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  orders:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        oid:
*                          type: integer
*                          example: 233412
*                        shopName:
*                          type: string
*                          example: Hatir Store
*                        shopImage:
*                          type: string
*                          example: public/images/hatir_store.jpg
*                        shopPhoneNumber:
*                          type: string
*                          example: 01787623092
*                        orderDate:
*                          type: string
*                          example: 03/08/2023
*                        deliveryDate:
*                          type: string
*                          example: 17/08/2023
*                        totalPrice:
*                          type: integer
*                          example: 230000
*                        paymentStatus:
*                          type: string
*                          example: Paid
*                        deliveryStatus:
*                          type: string
*                          example: Delivered
*                        paymentMethod:
*                          type: string
*                          example: COD 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/manufacturer', getManufacturerOrders);




/**
* @swagger
* /api/order/retailer/singleOrder:
*   post:
*     tags: [Order]
*     description: Get detailed information of a particular order for a retailer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - oid
*            properties: 
*              oid:
*                type: string
*                default: 8a5a5615-b5de-424c-8faf-df8c50e680aa
*              mid:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*     responses:
*        200:
*          description: Product batches shifted from one inventory to other inventory successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  orderDate:
*                    type: string
*                    default: 03/08/2023
*                  totalPrice:
*                    type: integer
*                    default: 230000
*                  paymentStatus:
*                    type: string
*                    default: Paid
*                  deliveryStatus:
*                    type: string
*                    default: Delivered
*                  paymentMethod:
*                    type: string
*                    default: COD
*                  orderFragments:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        manufacturerName:
*                          type: string
*                          example: Keya
*                        manufacturerLogo:
*                          type: string
*                          example: public/images/keya.jpg
*                        deliveryDate:
*                          type: string
*                          example: 17/08/2023
*                        rawPrice:
*                          type: integer
*                          example: 115000
*                        deliveryCharge:
*                          type: integer
*                          example: 500
*                        reducedAmount:
*                          type: integer
*                          example: 500
*                        finalPrice:
*                          type: integer
*                          example: 115000
*                        paymentStatus:
*                          type: string
*                          example: Paid
*                        deliveryStatus:
*                          type: string
*                          example: Delivered
*                        products:
*                          type: array
*                          items:
*                            type: object
*                            properties:
*                              productName:
*                                type: string
*                                example: Keya Soap
*                              image:
*                                type: string
*                                example: public/images/keya_soap.jpg
*                              quantity:
*                                type: integer
*                                example: 2000
*                              price:
*                                type: integer
*                                example: 60000  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/retailer/singleOrder', getRetailerOrderDetails);




/**
* @swagger
* /api/order/manufacturer/singleOrder:
*   post:
*     tags: [Order]
*     description: Get detailed information of a particular order for a manufacturer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - MID
*              - OrderID
*            properties: 
*              MID:
*                type: integer
*                default: 123434
*              OrderID:
*                type: integer
*                default: 233412
*     responses:
*        200:
*          description: An array of products' information for each inventory of a manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                        shopName:
*                          type: string
*                          example: Hatir Store
*                        shopImage:
*                          type: string
*                          example: public/images/hatir_store.jpg
*                        shopPhoneNumber:
*                          type: string
*                          example: 01787623092
*                        orderDate:
*                          type: string
*                          example: 03/08/2023
*                        deliveryDate:
*                          type: string
*                          example: 17/08/2023
*                        rawPrice:
*                          type: integer
*                          example: 115000
*                        deliveryCharge:
*                          type: integer
*                          example: 500
*                        reducedAmount:
*                          type: integer
*                          example: 500
*                        finalPrice:
*                          type: integer
*                          example: 115000
*                        paymentStatus:
*                          type: string
*                          example: Paid
*                        deliveryStatus:
*                          type: string
*                          example: Delivered
*                        paymentMethod:
*                          type: string
*                          example: COD
*                        products:
*                          type: array
*                          items:
*                            type: object
*                            properties:
*                              productName:
*                                type: string
*                                example: Keya Soap
*                              image:
*                                type: string
*                                example: public/images/keya_soap.jpg
*                              quantity:
*                                type: integer
*                                example: 2000
*                              price:
*                                type: integer
*                                example: 60000 
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/manufacturer/singleOrder', getManufacturerOrderDetails);




/**
* @swagger
* /api/order/deleteOrder:
*   delete:
*     tags: [Order]
*     description: Remove an order
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - oid
*            properties: 
*              oid:
*                type: string
*                default: 35963a39-0a62-4425-90e2-d74b346a5c59
*     responses:
*        200:
*          description: Removing an order successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Order removed successfully  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.delete('/deleteOrder', deleteOrder);


/**
* @swagger
* /api/order/getAllDeliveryStatus:
*   get:
*     tags: [Order]
*     description: Get the delivery status of an order
*     responses:
*        200:
*          description: Removing an order successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Order removed successfully  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.get('/getAllDeliveryStatus', deliveryStatus);


/**
* @swagger
* /api/order/retailerWithDeliveryStatus:
*   post:
*     tags: [Order]
*     description: Get all orders of a retailer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - SID
*            properties: 
*              sid:
*                type: string
*                default: ffeca534-d5ac-4e37-a713-883f1f3045da
*              DeliveryStatus:
*                type: string
*                default: Not Delivered
*     responses:
*        200:
*          description: An array of Orders of a Retailer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  orders:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        mid:
*                          type: string
*                          example: 233412
*                        RawPrice:
*                          type: double
*                          example: 4532
*                        DeliveryCharge:
*                          type: double
*                          example: 34346
*                        VoucherCode:
*                          type: string
*                          example: 230000
*                        ReducedAmount:
*                          type: double
*                          example: 45636
*                        FinalPrice:
*                          type: double
*                          example: 4563634
*                        PaymentStatus:
*                          type: string
*                          example: COD
*                        DeliveryStatus:
*                          type: string
*                          example: COD
*                        DeliveryDate:
*                          type: string
*                          example: COD  
*                        ShipmentStatus:
*                          type: string
*                          example: COD  
*                        ManufacturerName:
*                          type: string
*                          example: COD
*                        ManufacturerLogo:
*                          type: string
*                          example: COD  
*                        OrderDate:
*                          type: string
*                          example: COD  
*                        PaymentMethod:
*                          type: string
*                          example: COD  
*                        oid:
*                          type: string
*                          example: COD  
*                        TransactionID:
*                          type: string
*                          example: COD        
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/retailerWithDeliveryStatus', getRetailerOrdersWithDeliveryStatus);



/**
* @swagger
* /api/order/addReviewRating:
*   post:
*     tags: [Order]
*     description: Add review and rating to a product
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - oid
*              - mid
*              - pid
*              - Rating
*              - Review
*            properties: 
*              oid:
*                type: string
*                default: 762e3548-15cc-4d3b-8161-ec67301ded34
*              mid:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*              pid:
*                type: string
*                default: 4c5cf7b4-ecd5-453a-abd9-2be12291c7c3
*              Rating:
*                type: double
*                default: 5
*              Review:
*                type: string
*                default: Good product
*     responses:
*        200:
*          description: Review and Rating added successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Order removed successfully  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
orderRouter.post('/addReviewRating', addReviewRating);



module.exports = orderRouter;