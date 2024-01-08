function getLoanStatus(req, res){
    let output = {
        retailPoints: 1000,
        availableLoanAmount: 100000,
        payWithInDays: 30,
    }

    res.json(output);
}


function updatePaymentStatus(req, res){
    res.status(200).end();
}


function updatePayLaterStatus(req, res){
    res.status(200).end();
}


module.exports = {
    getLoanStatus,
    updatePaymentStatus,
    updatePayLaterStatus,
};