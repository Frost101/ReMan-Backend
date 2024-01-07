function addNewProductionHouse(req, res) {
    let output = {
        message: 'adding a new Production House successful'
    };

    res.json(output);
}

function deleteProductionHouse(req, res) {
    let output = {
        message: 'Production House removed successfully'
    };

    res.json(output);
}

function getProductListAndProductionHouses(req, res) {
    let output = {
        productionHouses: [{
        phid: 123412,
        productionHouseName: 'Shahi House',
        address: '32 Sultan Road, Savar, 6200, Dhaka',
        capacity: 230,
        productionHouseType: 'cold storage',
        image: 'public/images/shahi_house.jpg',
        productName: ['potato', 'rice', 'wheat'],
        },
        {    
        phid: 123411,
        productionHouseName: 'Khan House',
        address: '32 Sultan Khan Road, Savar, 6200, Dhaka',
        capacity: 230,
        type: 'cold storage',
        image: 'public/images/khan_house.jpg',
        productName: ['potato', 'rice', 'wheat'],
        }
        ]
    };

    res.json(output);
}

function shiftToInventory(req, res) {
    let output = {
        message: 'Batches shifted to inventory successfully'
    };

    res.json(output);
}

module.exports = {
    addNewProductionHouse,
    deleteProductionHouse,
    getProductListAndProductionHouses,
    shiftToInventory,
}