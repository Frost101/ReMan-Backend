//* External imports
const express = require('express');

//* Internal imports
const {addNewOrder, updateDeliveryStatus, getRetailerOrders, getManufacturerOrders, getRetailerOrderDetails, getManufacturerOrderDetails} = require('../../controllers/order/orderController'); 

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
*              - SID
*              - OrderDate
*              - TotalPrice
*              - OrderFragments
*            properties: 
*              SID:
*                type: integer
*                default: 123456
*              OrderDate:
*                type: string
*                default: 09/08/2023
*              TotalPrice:
*                type: integer
*                default: 230000
*              OrderFragments:
*                type: array
*                items:
*                  type: object
*                  properties:
*                    MID:
*                     type: integer
*                     example: 123412
*                    RawPrice:
*                     type: integer
*                     example: 230000
*                    DeliveryCharge:
*                     type: integer
*                     example: 500
*                    ReducedAmount:
*                     type: integer
*                     example: 500
*                    FinalPrice:
*                     type: integer
*                     example: 230000
*                    products:
*                     type: array
*                     items:
*                      type: object
*                      properties:
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
*              SID:
*                type: integer
*                default: 123456
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
*                        oid:
*                          type: integer
*                          example: 233412
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
orderRouter.post('/retailer', getRetailerOrders);




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
*              - MID
*            properties: 
*              MID:
*                type: integer
*                default: 123434
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
*              - ShiftFromIID
*              - ShiftToIID
*              - BID
*            properties: 
*              ShiftFromIID:
*                type: integer
*                default: 123412
*              ShiftToIID:
*                type: integer
*                default: 123411
*              BID:
*                type: array
*                default: [313234, 292931, 131123]
*     responses:
*        200:
*          description: Product batches shifted from one inventory to other inventory successfully
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    default: Batches shifted to other inventory successfully   
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
*            properties: 
*              MID:
*                type: integer
*                default: 123434
*     responses:
*        200:
*          description: An array of products' information for each inventory of a manufacturer
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  inventories:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        iid:
*                          type: integer
*                          example: 123412
*                        inventoryName:
*                          type: string
*                          example: Shahi House
*                        address:
*                          type: string
*                          example: 32 Sultan Road, Savar, 6200, Dhaka
*                        capacity:
*                          type: integer
*                          example: 230
*                        inventoryType:
*                          type: string
*                          example: cold storage
*                        empty:
*                          type: boolean
*                          example: false
*                        owned:
*                          type: boolean
*                          example: true
*                        image:
*                          type: string
*                          example: public/images/shahi_house.jpg
*                        productName:
*                          type: array
*                          example: ['potato', 'rice', 'wheat'] 
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

module.exports = orderRouter;