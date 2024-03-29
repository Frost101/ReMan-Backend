const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.Store_ID;
const store_passwd = process.env.Store_Password;
const is_live = false //true for live, false for sandbox



async function paymentOnline(req, res) {

    try{
    // Get current timestamp
    const timestamp = Date.now();

    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 10);

    // Concatenate timestamp and random string
    const tran_ID = `${timestamp}-${randomString}`;
    const data = {
        total_amount: req.body.TotalAmount,
        currency: 'BDT',
        tran_id: tran_ID, // use unique tran_id for each api call
        success_url: 'https://reman-backend-8eli.onrender.com/api/payment/onlinePaymentSuccess',
        fail_url: 'https://reman-backend-8eli.onrender.com/api/payment/onlinePaymentFail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        value_a: req.body.sid,
        value_b: req.body.VoucherCode,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(200).json({
            // TransactionID: tran_ID,
            url: GatewayPageURL
        });
        console.log('Redirecting to: ', GatewayPageURL);
    });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function paymentOnlineForTakingLease(req, res) {


    try{
    const { rid, iid, OwnerID, OwnedToID, Duration } = req.body;
    // Get current timestamp
    const timestamp = Date.now();

    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 10);

    // Concatenate timestamp and random string
    const tran_ID = `${timestamp}-${randomString}`;
    const data = {
        total_amount: Duration,
        currency: 'BDT',
        tran_id: tran_ID, // use unique tran_id for each api call
        success_url: 'https://reman-backend-v9rf.onrender.com/api/payment/onlinePaymentSuccessForTakingLease',
        fail_url: 'https://reman-backend-v9rf.onrender.com/api/payment/onlinePaymentFailForTakingLease',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        value_a: rid,
        value_b: iid,
        value_c: Duration,
        value_d: OwnedToID,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        // console.log(apiResponse);
        res.status(200).json({
            // TransactionID: tran_ID,
            url: GatewayPageURL
        });
        console.log('Redirecting to: ', GatewayPageURL);
    });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }    
}




async function paymentOnlineForExtendingLease(req, res) {


    try{
    const { rid, OccupiedTill } = req.body;
    // Get current timestamp
    const timestamp = Date.now();

    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 10);

    // Concatenate timestamp and random string
    const tran_ID = `${timestamp}-${randomString}`;
    const data = {
        total_amount: 1000,
        currency: 'BDT',
        tran_id: tran_ID, // use unique tran_id for each api call
        success_url: 'https://reman-backend-v9rf.onrender.com/api/payment/onlinePaymentSuccessForExtendingLease',
        fail_url: 'https://reman-backend-v9rf.onrender.com/api/payment/onlinePaymentFailForExtendingLease',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        value_a: rid,
        value_b: OccupiedTill,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        // console.log(apiResponse);
        res.status(200).json({
            // TransactionID: tran_ID,
            url: GatewayPageURL
        });
        console.log('Redirecting to: ', GatewayPageURL);
    });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }    
}



async function onlinePaymentSuccessful(req, res) {

    const postData = {
        sid: req.body.value_a,
        VoucherCode: req.body.value_b,
        PaymentMethod: "Online Payment",
        TransactionID: req.body.tran_id
    };

    try {
        const response = await axios.post('https://reman-backend-8eli.onrender.com/api/order/addOrder', postData);
        console.log('Order Added: ', response.data);
        res.redirect('https://reman-retailer.vercel.app/payment/success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Successful: ', TransactionID);

    // try {
    //     const ShopID = await prisma.order.findMany({
    //         where: {
    //             TransactionID: TransactionID,
    //         },
    //         select: {
    //             sid: true,
    //         },
    //     });

    //     const deleteCart = await prisma.cart.deleteMany({
    //         where: {
    //             sid: ShopID[0].sid,
    //         }
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    // res.redirect('https://reman-retailer.vercel.app/payment/success');
}




async function onlinePaymentSuccessfulForTakingLease(req, res) {

    const postData = {
        rid: req.body.value_a,
        iid: req.body.value_b,
        OwnedToID: req.body.value_d,
        Duration: req.body.value_c,
        TransactionID: req.body.tran_id
    };

    try {
        const response = await axios.put('http://reman-backend-v9rf.onrender.com/api/leaseInventory/takeLease', postData);
        // console.log('Take Lease Successful: ', response.data);
        res.redirect('https://reman-manufacturer.vercel.app/man/leaseManagement/inventoryMarketPlace/inventoryDetails/success1');
        // res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Successful: ', TransactionID);

    // try {
    //     const ShopID = await prisma.order.findMany({
    //         where: {
    //             TransactionID: TransactionID,
    //         },
    //         select: {
    //             sid: true,
    //         },
    //     });

    //     const deleteCart = await prisma.cart.deleteMany({
    //         where: {
    //             sid: ShopID[0].sid,
    //         }
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    // res.redirect('https://reman-retailer.vercel.app/payment/success');
}




async function onlinePaymentSuccessfulForExtendingLease(req, res) {

    const postData = {
        rid: req.body.value_a,
        OccupiedTill: req.body.value_b,
        TransactionID: req.body.tran_id
    };

    try {
        const response = await axios.put('http://reman-backend-v9rf.onrender.com/api/leaseInventory/extendLease', postData);
        // console.log('Take Lease Successful: ', response.data);
        res.redirect('https://reman-manufacturer.vercel.app/man/leaseManagement/inventoryMarketPlace/inventoryDetails/success1');
        // res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Successful: ', TransactionID);

    // try {
    //     const ShopID = await prisma.order.findMany({
    //         where: {
    //             TransactionID: TransactionID,
    //         },
    //         select: {
    //             sid: true,
    //         },
    //     });

    //     const deleteCart = await prisma.cart.deleteMany({
    //         where: {
    //             sid: ShopID[0].sid,
    //         }
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    // res.redirect('https://reman-retailer.vercel.app/payment/success');
}



async function onlinePaymentFailed(req, res) {
    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Failed: ', TransactionID);

    // const oid = await prisma.order.findMany({
    //     where: {
    //         TransactionID: TransactionID,
    //     },
    //     select: {
    //         oid: true,
    //     },
    // });

    // try {
    //     const user = await prisma.singleProductOrder.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user1 = await prisma.orderFragment.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user2 = await prisma.order.delete({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    res.redirect('https://reman-retailer.vercel.app/payment/fail');
}




async function onlinePaymentFailedForTakingLease(req, res) {
    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Failed: ', TransactionID);

    // const oid = await prisma.order.findMany({
    //     where: {
    //         TransactionID: TransactionID,
    //     },
    //     select: {
    //         oid: true,
    //     },
    // });

    // try {
    //     const user = await prisma.singleProductOrder.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user1 = await prisma.orderFragment.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user2 = await prisma.order.delete({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    res.redirect('https://reman-manufacturer.vercel.app/man/leaseManagement/inventoryMarketPlace/inventoryDetails/failed1');
    // res.status(200).json({ message: "Payment Failed" });
}



async function onlinePaymentFailedForExtendingLease(req, res) {
    // const TransactionID = req.body.tran_id;
    // console.log('Transaction Failed: ', TransactionID);

    // const oid = await prisma.order.findMany({
    //     where: {
    //         TransactionID: TransactionID,
    //     },
    //     select: {
    //         oid: true,
    //     },
    // });

    // try {
    //     const user = await prisma.singleProductOrder.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user1 = await prisma.orderFragment.deleteMany({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });

    //     const user2 = await prisma.order.delete({
    //         where: {
    //             oid: oid[0].oid,
    //         },
    //     });
    // } catch (error) {
    //     console.error('Error retrieving user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }

    res.redirect('https://reman-manufacturer.vercel.app/man/leaseManagement/inventoryMarketPlace/inventoryDetails/failed1');
    // res.status(200).json({ message: "Payment Failed" });
}



function getLoanStatus(req, res) {
    let output = {
        retailPoints: 1000,
        availableLoanAmount: 100000,
        payWithInDays: 30,
    }

    res.json(output);
}


function updatePaymentStatus(req, res) {
    res.status(200).end();
}


function updatePayLaterStatus(req, res) {
    res.status(200).end();
}


module.exports = {
    paymentOnline,
    paymentOnlineForTakingLease,
    paymentOnlineForExtendingLease,
    onlinePaymentSuccessful,
    onlinePaymentSuccessfulForTakingLease,
    onlinePaymentSuccessfulForExtendingLease,
    onlinePaymentFailed,
    onlinePaymentFailedForTakingLease,
    onlinePaymentFailedForExtendingLease,
    getLoanStatus,
    updatePaymentStatus,
    updatePayLaterStatus,
};
