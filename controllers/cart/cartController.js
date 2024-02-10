const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function getCartInfo(req, res) {
    let output = {
        products: [{
        productName: 'Mojo',
        image: 'public/images/mojo.jpg',
        bid: [123456, 256457, 256423],
        pid: 123456,
        mid: 123456,
        weight_volume: 500,
        unit: 'ml',
        unitPrice: 30,
        quantity: 1000,
        minQuantityForSale: 100,
        minQuantityForDiscount: 500,
        minDiscount: 2.5,
        maxDiscount: 8.0,
        discountRate: 0.5,
        productQuantityForDiscountRate: 100,
        },
        {    
        productName: 'RC',
        image: 'public/images/rc.jpg',
        bid: [123456, 256457, 256423],
        pid: 123456,
        mid: 123456,
        weight_volume: '500',
        unit: 'ml',
        unitPrice: 30,
        quantity: 1000,
        minQuantityForSale: 100,
        minQuantityForDiscount: 500,
        minDiscount: 2.5,
        maxDiscount: 8.0,
        discountRate: 0.5,
        productQuantityForDiscountRate: 100,
        }
        ]
    };

    res.json(output);
}



function updateCartInfo(req, res) {
    let output = {
        message: 'updating cart successful'
    };

    res.json(output);
}

async function addToCartInfo(req, res) {
    // let output = {
    //     message: 'adding to cart successful'
    // };

    // res.json(output);
    try {
        // Extracting input parameters from the request body
        const {
            sid,
            pid,
            Quantity,
            Price,
        } = req.body.product;

        const deletePreviousInfo = await prisma.cart.deleteMany({
            where: {
              sid: sid,
              pid: pid,
            },
        });

        const product = await prisma.product.findUnique({
            where: {
              pid: pid,
            },
            select:{
                MinQuantityForSale: true,
                MinimumDeliveryCharge: true,
                DeliveryChargeIncreaseRate: true,
            }
        });

        const deliveryCharge = product.MinimumDeliveryCharge + (Quantity - product.MinQuantityForSale) * product.DeliveryChargeIncreaseRate;

        const user = await prisma.cart.create({
            data: {
              sid: sid,
              pid: pid,
              Quantity: Quantity,
              Price: Price,
              DeliveryCharge: deliveryCharge,
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Adding to cart successful',
        });
    } catch (error) {
        console.error('Error adding new cart info:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Cart with the provided description already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
}

function deleteCartInfo(req, res) {
    let output = {
        message: 'deleting cart successful'
    };

    res.json(output);
}

module.exports = {
    getCartInfo,
    updateCartInfo,
    addToCartInfo,
    deleteCartInfo,
}