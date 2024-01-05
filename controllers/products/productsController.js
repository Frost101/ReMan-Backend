function getOnSaleProducts(req, res) {

    //* Array of products
    res.json({
        products: [{
            PID: 123456,
            MID: 123456,
            productName: 'Mojito',
            price: 10,
            productImage: 'public/images/mojito.jpg',
            batch : [123456, 256457, 256423],
            quantity: 1000,
            saleRate: 50,
            manufacturerName: 'Fresh',
            manufacturerLogo: 'public/images/fresh.jpg',
            weightVolume: 250,
            unit: 'mL',
        },
        {
            PID: 654321,
            MID: 987451,
            productName: 'Chocolate Milk',
            price: 15,
            productImage: 'public/images/chocolateMilk.jpg',
            batch : [123456, 25645],
            quantity: 5000,
            saleRate: 70,
            manufacturerName: 'Aarong',
            manufacturerLogo: 'public/images/aarong.jpg',
            weightVolume: 1,
            unit: 'L',
        }
    ]
    });
}

module.exports = {
    getOnSaleProducts,
}