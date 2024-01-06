function getShopInfo(req, res) {
    let output = {
            shopName: 'Reja Store',
            phoneNumber: ['01988974891', '05776879659'],
            shopImage: 'public/images/reja_store.jpg',
            retailPoints: 663,
            website: 'https://www.reja_store.com',
            email: 'reja@gmail.com',
            address: '32 Baker Street, Mymensingh',
    };

    res.json(output);
}



function getOwnerInfo(req, res) {
    let output = {
        owners: [{
        name: 'Shamim',
        phoneNumber: ['01988344891', '05713879659'],
        image: 'public/images/shamim.jpg',
        email: 'shamim@gmail.com',
        address: '32 Baker Street, Mymensingh',
        },
        {    
        name: 'Talukder',
        phoneNumber: ['01988333891', '05711279659'],
        image: 'public/images/talukder.jpg',
        email: 'talukder@gmail.com',
        address: '34 Baker Street, Mymensingh',
        }
        ]
    };

    res.json(output);
}

module.exports = {
    getShopInfo,
    getOwnerInfo,
}