function getCartInfo(req, res) {
    let output = {
        products: [{
        productName: 'Mojo',
        image: 'public/images/mojo.jpg',
        bid: [123456, 256457, 256423],
        pid: 123456,
        mid: 123456,
        weight_volume: 500,
        unit: 'ml',
        unitPrice: 30,
        quantity: 1000,
        minQuantityForSale: 100,
        minQuantityForDiscount: 500,
        minDiscount: 2.5,
        maxDiscount: 8.0,
        discountRate: 0.5,
        productQuantityForDiscountRate: 100,
        },
        {    
        productName: 'RC',
        image: 'public/images/rc.jpg',
        bid: [123456, 256457, 256423],
        pid: 123456,
        mid: 123456,
        weight_volume: '500',
        unit: 'ml',
        unitPrice: 30,
        quantity: 1000,
        minQuantityForSale: 100,
        minQuantityForDiscount: 500,
        minDiscount: 2.5,
        maxDiscount: 8.0,
        discountRate: 0.5,
        productQuantityForDiscountRate: 100,
        }
        ]
    };

    res.json(output);
}



function updateCartInfo(req, res) {
    let output = {
        message: 'updating cart successful'
    };

    res.json(output);
}

function addToCartInfo(req, res) {
    let output = {
        message: 'adding to cart successful'
    };

    res.json(output);
}

function deleteCartInfo(req, res) {
    let output = {
        message: 'deleting cart successful'
    };

    res.json(output);
}

module.exports = {
    getCartInfo,
    updateCartInfo,
    addToCartInfo,
    deleteCartInfo,
}