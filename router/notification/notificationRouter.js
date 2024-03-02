//* External imports
const express = require('express');

//* Internal imports
const {getAllNotificationsForRetailer, getAllNotificationsForManufacturer, getUnreadNotificationsForRetailer, getUnreadNotificationsForManufacturer, updateNotificationStatus, deleteNotificationForRetailer, deleteNotificationForManufacturer} = require('../../controllers/notification/notificationController'); 

//* Initialize router
const notificationRouter = express.Router();


//* Routes
/**
 * @swagger
 * tags:
 *   - name: Notification
 *     description: Notifications related routes
 */




/**
* @swagger
* /api/notification/allNotificationsRetailer:
*   post:
*     tags: [Notification]
*     description: Get All Notifications for a Retailer
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
*          description: An array of all notifications
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  notifications:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        nid:
*                          type: integer
*                          example: 123456
*                        message:
*                          type: string
*                          example: Your order has been placed
*                        time:
*                          type: string
*                          example: 11:09 pm
*                        date:
*                          type: string
*                          example: 11/12/2022
*                        readStatus:
*                          type: boolean
*                          example: false   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.post('/allNotificationsRetailer', getAllNotificationsForRetailer);




/**
* @swagger
* /api/notification/allNotificationsManufacturer:
*   post:
*     tags: [Notification]
*     description: Get All Notifications for a manufacturer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - mid
*            properties: 
*              mid:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*     responses:
*        200:
*          description: An array of all notifications
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  notifications:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        nid:
*                          type: integer
*                          example: 123456
*                        message:
*                          type: string
*                          example: Your order has been placed
*                        time:
*                          type: string
*                          example: 11:09 pm
*                        date:
*                          type: string
*                          example: 11/12/2022
*                        readStatus:
*                          type: boolean
*                          example: false   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.post('/allNotificationsManufacturer', getAllNotificationsForManufacturer);




/**
* @swagger
* /api/notification/unreadNotificationsRetailer:
*   post:
*     tags: [Notification]
*     description: Get Unread Notifications for a retailer
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
*          description: An array of unread notifications
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  notifications:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        nid:
*                          type: integer
*                          example: 123456
*                        message:
*                          type: string
*                          example: Your order has been placed
*                        time:
*                          type: string
*                          example: 11:09 pm
*                        date:
*                          type: string
*                          example: 11/12/2022
*                        readStatus:
*                          type: boolean
*                          example: false  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.post('/unreadNotificationsRetailer', getUnreadNotificationsForRetailer);




/**
* @swagger
* /api/notification/unreadNotificationsManufacturer:
*   post:
*     tags: [Notification]
*     description: Get Unread Notifications for a manufacturer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - mid
*            properties: 
*              mid:
*                type: string
*                default: 2c397476-c131-4c60-b45a-12bd242ec256
*     responses:
*        200:
*          description: An array of unread notifications
*          response-body:
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  notifications:
*                    type: array
*                    items:
*                      type: object
*                      properties:
*                        nid:
*                          type: integer
*                          example: 123456
*                        message:
*                          type: string
*                          example: Your order has been placed
*                        time:
*                          type: string
*                          example: 11:09 pm
*                        date:
*                          type: string
*                          example: 11/12/2022
*                        readStatus:
*                          type: boolean
*                          example: false  
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.post('/unreadNotificationsManufacturer', getUnreadNotificationsForManufacturer);




/**
* @swagger
* /api/notification/updateNotificationStatus:
*   put:
*     tags: [Notification]
*     description: Update Notification status
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - NID
*            properties: 
*              NID:
*                type: integer
*                default: 123434
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
*                    default: Notification status updated
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.put('/updateNotificationStatus', updateNotificationStatus);




/**
* @swagger
* /api/notification/deleteNotificationRetailer:
*   delete:
*     tags: [Notification]
*     description: Delete Notification for a retailer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - nid
*            properties: 
*              nid:
*                type: string
*                default: 123434
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
*                    default: deleting notification successful   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.delete('/deleteNotificationRetailer', deleteNotificationForRetailer);




/**
* @swagger
* /api/notification/deleteNotificationManufacturer:
*   delete:
*     tags: [Notification]
*     description: Delete Notification for a manufacturer
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - nid
*            properties: 
*              nid:
*                type: string
*                default: 123434
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
*                    default: deleting notification successful   
*        401:
*          description: Unauthorized, Invalid username or password, or user not found
*        403:
*          description: Forbidden route
*        404:
*          description: Invalid route/User not found 
*        default:
*          description: Internal server error
*/
notificationRouter.delete('/deleteNotificationManufacturer', deleteNotificationForManufacturer);

module.exports = notificationRouter;