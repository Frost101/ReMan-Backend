function getManufacturerInfo(req, res) {
    let output = {
            name: 'Meril',
            phoneNumber: ['01988974891', '05776879659'],
            image: 'public/images/meril.jpg',
            rating: 4.87,
            website: 'https://www.meril.com',
            email: 'meril@gmail.com',
            address: '32 Baker Street, Mymensingh',
            tin: 23878931
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
        dob: '03/09/1978',
        nid: 83302034
        },
        {    
        name: 'Talukder',
        phoneNumber: ['01988333891', '05711279659'],
        image: 'public/images/talukder.jpg',
        email: 'talukder@gmail.com',
        dob: '09/02/1988',
        nid: 83303534
        }
        ]
    };

    res.json(output);
}

module.exports = {
    getManufacturerInfo,
    getOwnerInfo,
}