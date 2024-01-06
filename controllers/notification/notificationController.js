function getAllNotifications(req, res) {
    let output = {
        notifications: [{
        nid: 123456,    
        message: 'Your order has been placed',
        time: '11:09 pm',
        date: '11/12/2022',
        readStatus: false,
        },
        {    
        nid: 123434,    
        message: 'Your order has been placed',
        time: '11:19 pm',
        date: '11/12/2023',
        readStatus: false,
        }
        ]
    };

    res.json(output);
}



function getUnreadNotifications(req, res) {
    let output = {
        notifications: [{
        nid: 123456,    
        message: 'Your order has been placed',
        time: '11:09 pm',
        date: '11/12/2022',
        readStatus: false,
        },
        {    
        nid: 123434,    
        message: 'Your order has been placed',
        time: '11:19 pm',
        date: '11/12/2023',
        readStatus: false,
        }
        ]
    };

    res.json(output);
}

function updateNotificationStatus(req, res) {
    let output = {
        message: 'Notification status updated'
    };

    res.json(output);
}

function deleteNotification(req, res) {
    let output = {
        message: 'Notification deleted'
    };

    res.json(output);
}

module.exports = {
    getAllNotifications,
    getUnreadNotifications,
    updateNotificationStatus,
    deleteNotification,
}