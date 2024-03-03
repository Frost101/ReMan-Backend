const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function getAllNotificationsForRetailer(req, res) {

    const sid = req.body.sid;

    try {
        const notifications = await prisma.shopNotification.findMany({
            where: {
                sid: sid
            },
            select: {
                nid: true,
                Message: true,
                DateAndTime: true,
                ReadStatus: true,
                Priority: true
            },
            orderBy: {
                DateAndTime: 'desc'
            },
        });

        res.status(200).json({notifications});

        const updateNotifications = await prisma.shopNotification.updateMany({
            where: {
                sid: sid
            },
            data: {
                ReadStatus: true
            }
        });
    }
    catch (error) {
        console.error('Error retrieving notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}




async function getAllNotificationsForManufacturer(req, res) {

    const mid = req.body.mid;

    try {
        const notifications = await prisma.companyNotification.findMany({
            where: {
                mid: mid
            },
            select: {
                nid: true,
                Message: true,
                DateAndTime: true,
                ReadStatus: true,
                Priority: true
            },
            orderBy: {
                DateAndTime: 'desc'
            },
        });

        res.status(200).json({notifications});
    }
    catch (error) {
        console.error('Error retrieving notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function getUnreadNotificationsForRetailer(req, res) {

    const sid = req.body.sid;

    try {
        const notifications = await prisma.shopNotification.findMany({
            where: {
                sid: sid,
                ReadStatus: false,
            },
            select: {
                nid: true,
                Message: true,
                DateAndTime: true,
                Priority: true
            },
            orderBy: {
                DateAndTime: 'desc'
            },
        });

        res.status(200).json({notifications});

        const updateNotifications = await prisma.shopNotification.updateMany({
            where: {
                sid: sid
            },
            data: {
                ReadStatus: true
            }
        });
    }
    catch (error) {
        console.error('Error retrieving notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function getUnreadNotificationsForManufacturer(req, res) {

    const mid = req.body.mid;

    try {
        const notifications = await prisma.companyNotification.findMany({
            where: {
                mid: mid,
                ReadStatus: false,
            },
            select: {
                nid: true,
                Message: true,
                DateAndTime: true,
                Priority: true
            },
            orderBy: {
                DateAndTime: 'desc'
            },
        });

        res.status(200).json({notifications});
    }
    catch (error) {
        console.error('Error retrieving notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function updateNotificationStatusManufacturer (req, res) {
    const mid = req.body.mid;
    try{
        const updateNotifications = await prisma.companyNotification.updateMany({
            where: {
                mid: mid
            },
            data: {
                ReadStatus: true
            }
        });

        res.status(200).json({success: true,
             message: 'Notifications updated successfully'});
    
    }
    catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function deleteNotificationForRetailer(req, res) {
    const nid = req.body.nid;

    try {
        const deleteNotification = await prisma.shopNotification.delete({
            where: {
                nid: nid
            }
        });

        res.status(200).json({success: true,
             message: 'Notification deleted successfully'});
    }
    catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function deleteNotificationForManufacturer(req, res) {
    const nid = req.body.nid;

    try {
        const deleteNotification = await prisma.companyNotification.delete({
            where: {
                nid: nid
            }
        });

        res.status(200).json({success: true,
             message: 'Notification deleted successfully'});
    }
    catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllNotificationsForRetailer,
    getAllNotificationsForManufacturer,
    getUnreadNotificationsForRetailer,
    getUnreadNotificationsForManufacturer,
    updateNotificationStatusManufacturer,
    deleteNotificationForRetailer,
    deleteNotificationForManufacturer
}