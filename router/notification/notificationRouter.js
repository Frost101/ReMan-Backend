//* External imports
const express = require('express');

//* Internal imports
const {getAllNotifications, getUnreadNotifications, updateNotificationStatus, deleteNotification} = require('../../controllers/notification/notificationController'); 

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
* /api/notification/allNotifications:
*   post:
*     tags: [Notification]
*     description: Get All Notifications
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
notificationRouter.post('/allNotifications', getAllNotifications);




/**
* @swagger
* /api/notification/unreadNotifications:
*   post:
*     tags: [Notification]
*     description: Get Unread Notifications
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
notificationRouter.post('/unreadNotifications', getUnreadNotifications);




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
* /api/notification/deleteNotification:
*   delete:
*     tags: [Notification]
*     description: Delete Notification
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
notificationRouter.delete('/deleteNotification', deleteNotification);

module.exports = notificationRouter;