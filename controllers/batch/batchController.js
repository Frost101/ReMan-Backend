function getBatchList(req, res){
    let output = {
        batches: [
            {
                BID: 123456,
                manufacturingDate: '2021-01-01',
                expiryDate: '2022-01-01',
                quantity: 1000,
            },
            {
                BID: 555556,
                manufacturingDate: '2022-01-01',
                expiryDate: '2023-01-01',
                quantity: 1000,
            },
            {
                BID: 777756,
                manufacturingDate: '2022-01-01',
                expiryDate: '2024-01-01',
                quantity: 1000,
            },
            
        ],
    };
    res.status(200).json(output);
}




function batchScreening(req, res){
    res.status(200).end();
}


function addNewBatch(req, res){
    res.status(200).end();
}


function deleteBatch(req, res){
    res.status(200).end();
}

module.exports = {
    getBatchList,
    batchScreening,
    addNewBatch,
    deleteBatch,
};