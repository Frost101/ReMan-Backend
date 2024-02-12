const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.Store_ID;
const store_passwd = process.env.Store_Password;
const is_live = false //true for live, false for sandbox



async function paymentOnline(req, res){
      // Get current timestamp
  const timestamp = Date.now();

  // Generate a random string
  const randomString = Math.random().toString(36).substring(2, 10);

  // Concatenate timestamp and random string
  const tran_ID = `${timestamp}-${randomString}`;
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: tran_ID, // use unique tran_id for each api call
        success_url: 'http://localhost:3000/api/payment/onlinePaymentSuccess',
        fail_url: 'http://localhost:3000/api/payment/onlinePaymentFail',
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
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(200).json({TransactionID: tran_ID,
            url: GatewayPageURL});
        console.log('Redirecting to: ', GatewayPageURL);
    });
}



async function onlinePaymentSuccessful(req, res){

    res.status(200).json({success: true,
        message: "Payment Successful"});
    // let output = {
    //     retailPoints: 1000,
    //     availableLoanAmount: 100000,
    //     payWithInDays: 30,
    // }

    // res.json(output);
}



async function onlinePaymentFailed(req, res){

    res.status(200).json({success: false,
        message: "Payment Failed"});
    // let output = {
    //     retailPoints: 1000,
    //     availableLoanAmount: 100000,
    //     payWithInDays: 30,
    // }

    // res.json(output);
}



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
    paymentOnline,
    onlinePaymentSuccessful,
    onlinePaymentFailed,
    getLoanStatus,
    updatePaymentStatus,
    updatePayLaterStatus,
};