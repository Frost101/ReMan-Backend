function addNewInventory(req, res) {
    let output = {
        message: 'adding a new inventory successful'
    };

    res.json(output);
}

function checkInventoryStatus(req, res) {
    let output = {
        empty: false,
        owned: true,
    };

    res.json(output);
}

function deleteInventory(req, res) {
    let output = {
        message: 'Inventory removed successfully'
    };

    res.json(output);
}

function getProductListAndInventories(req, res) {
    let output = {
        inventories: [{
        iid: 123412,
        inventoryName: 'Shahi House',
        address: '32 Sultan Road, Savar, 6200, Dhaka',
        capacity: 230,
        inventoryType: 'cold storage',
        empty: false,
        owned: true,
        image: 'public/images/shahi_house.jpg',
        productName: ['potato', 'rice', 'wheat'],
        },
        {    
        iid: 123411,
        inventoryName: 'Khan House',
        address: '32 Sultan Khan Road, Savar, 6200, Dhaka',
        capacity: 230,
        type: 'cold storage',
        empty: false,
        owned: true,
        image: 'public/images/khan_house.jpg',
        productName: ['potato', 'rice', 'wheat'],
        }
        ]
    };

    res.json(output);
}

function shiftToInventory(req, res) {
    let output = {
        message: 'Batches shifted to other inventory successfully'
    };

    res.json(output);
}

module.exports = {
    addNewInventory,
    checkInventoryStatus,
    deleteInventory,
    getProductListAndInventories,
    shiftToInventory,
}