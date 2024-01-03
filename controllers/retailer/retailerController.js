function getCartInfo(req, res) {
    res.json({
        dummyMessage: 'Get cart info'
    });
}

function getAllNotifications(req, res) {

    const notifications = [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
    ];

    res.json({
        notifications
    });
}

function getProductListOnSale(req, res) {
    // response should be an array of product objects
    // each object should have the following fields:
    // id, name, price, discount, image
    // discount should be in percentage
    // image should be the url of the image
    // example response:
    const products = [
        {
            id: 1,
            name: 'Product 1',
            price: 100,
            discount: 10,
            image: 'https://example.com/image1.png',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 200,
            discount: 20,
            image: 'https://example.com/image2.png',
        },
    ];

    res.json({
        products
    });

}

module.exports = {
    getCartInfo,
    getAllNotifications,
    getProductListOnSale,

}