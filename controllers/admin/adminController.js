function banRetailer(req, res){
    res.status(200).end();
}


function unbanRetailer(req, res){
    res.status(200).end();
}


function banManufacturer(req, res){
    res.status(200).end();
}


function unbanManufacturer(req, res){
    res.status(200).end();
}


function getBannedRetailersInfo(req,res){
    let output = {
        retailers: [
            {
                SID: "123456789",
                name: "John Doe",
                phoneNumber: "01700000000",
                email: "abc@gmail.com",
                address: "Dhaka, Bangladesh",
                bannedReason: "Fraud",
            },
        ],
    };
    res.status(200).json(output);
}


function getBannedManufacturersInfo(req,res){
    let output = {
        manufacturers: [
            {
                MID: "123456789",
                name: "John Doe",
                phoneNumber: "01700000000",
                email: "abc@gmail.com",
                address: "Dhaka, Bangladesh",
                bannedReason: "Fraud",
            },
        ],
    };
    res.status(200).json(output);
}


module.exports = {
    banRetailer,
    unbanRetailer,
    banManufacturer,
    unbanManufacturer,
    getBannedRetailersInfo,
    getBannedManufacturersInfo,
};