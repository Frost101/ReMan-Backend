function addNewOrder(req, res) {
    let output = {
        message: 'adding a new order successful'
    };

    res.json(output);
}

function updateDeliveryStatus(req, res) {
    let output = {
        message: 'Updating Delivery Status Successful'
    };

    res.json(output);
}

function getRetailerOrders(req, res) {
    let output = {
        orders: [{
        oid: 233412,
        orderDate: '03/08/2023',
        deliveryDate: '17/08/2023',
        totalPrice: 230000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD'
        },
        {    
        oid: 233413,
        orderDate: '03/08/2023',
        deliveryDate: '19/08/2023',
        totalPrice: 250000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'Bkash'
        }
        ]
    };

    res.json(output);
}

function getManufacturerOrders(req, res) {
    let output = {
        orders: [{
        oid: 233412,
        shopName: 'Hatir Store',
        shopImage: 'public/images/hatir_store.jpg',
        shopPhoneNumber: '01787623092',
        orderDate: '03/08/2023',
        deliveryDate: '17/08/2023',
        totalPrice: 230000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD'
        },
        {    
        oid: 233413,
        shopName: 'Kulir Store',
        shopImage: 'public/images/kulir_store.jpg',
        shopPhoneNumber: '01787343092',
        orderDate: '03/08/2023',
        deliveryDate: '19/08/2023',
        totalPrice: 250000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'Bkash'
        }
        ]
    };

    res.json(output);
}

function getRetailerOrderDetails(req, res) {
    let output = {
        orderDate: '03/08/2023',
        totalPrice: 230000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD',
        orderFragments: [{
            manufacturerName: 'Keya',
            manufacturerLogo: 'public/images/keya.jpg',
            deliveryDate: '17/08/2023',
            rawPrice: 115000,
            deliveryCharge: 500,
            reducedAmount: 500,
            finalPrice: 115000,
            paymentStatus: 'Paid',
            deliveryStatus: 'Delivered',
            products: [{
                productName: 'Keya Soap',
                image: 'public/images/keya_soap.jpg',
                quantity: 2000,
                price: 60000
            },{
                productName: 'Keya Shampoo',
                image: 'public/images/keya_shampoo.jpg',
                quantity: 1500,
                price: 55000
            }]
            },
            {    
            manufacturerName: 'Meril',
            manufacturerLogo: 'public/images/meril.jpg',
            deliveryDate: '19/08/2023',
            rawPrice: 115000,
            deliveryCharge: 500,
            reducedAmount: 500,
            finalPrice: 115000,
            paymentStatus: 'Paid',
            deliveryStatus: 'Delivered',
            products: [{
                productName: 'Meril Soap',
                image: 'public/images/meril_soap.jpg',
                quantity: 2000,
                price: 60000
            },{
                productName: 'Meril Shampoo',
                image: 'public/images/meril_shampoo.jpg',
                quantity: 1500,
                price: 55000
            }]
            }
        ]
    };

    res.json(output);
}

function getManufacturerOrderDetails(req, res) {
    let output = {
        shopName: 'Hatir Store',
        shopImage: 'public/images/hatir_store.jpg',
        shopPhoneNumber: '01787623092',
        orderDate: '03/08/2023',
        deliveryDate: '17/08/2023',
        rawPrice: 115000,
        deliveryCharge: 500,
        reducedAmount: 500,
        finalPrice: 115000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD',
        products: [{
            productName: 'Keya Soap',
            image: 'public/images/keya_soap.jpg',
            quantity: 2000,
            price: 60000
        },{
            productName: 'Keya Shampoo',
            image: 'public/images/keya_shampoo.jpg',
            quantity: 1500,
            price: 55000
        }]        
    };

    res.json(output);
}

module.exports = {
    addNewOrder,
    updateDeliveryStatus,
    getRetailerOrders,
    getManufacturerOrders,
    getRetailerOrderDetails,
    getManufacturerOrderDetails
}