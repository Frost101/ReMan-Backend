const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCartInfo(req, res) {

    const sid = req.body.sid;

    try{
    const manufacturerInfo = await prisma.cart.findMany({
        where: {
          sid: sid,
        },
        distinct: ['mid'],
        select: {
            mid: true,
            Company: {
                select: {
                    Name: true,
                    Logo: true,
                }
            }
        },
    });

    for(let i = 0; i < manufacturerInfo.length; i++) {
        manufacturerInfo[i].ManufacturerName = manufacturerInfo[i].Company.Name;
        manufacturerInfo[i].ManufacturerLogo = manufacturerInfo[i].Company.Logo;
        delete manufacturerInfo[i].Company;

        const totalDeliveryCharge = await prisma.cart.groupBy({
            by: ['mid'],
            where: {
                sid: sid,
                mid: manufacturerInfo[i].mid,
            },
            _sum: {
                DeliveryCharge: true,
                Price: true,
            }
        });

        manufacturerInfo[i].totalDeliveryCharge = totalDeliveryCharge[0]._sum.DeliveryCharge;
        manufacturerInfo[i].totalPrice = totalDeliveryCharge[0]._sum.Price;

        const products = await prisma.cart.findMany({
            where: {
                sid: sid,
                mid: manufacturerInfo[i].mid,
            },
            select: {
                pid: true,
                Quantity: true,
                Price: true,
                Product: {
                    select: {
                        CategoryName: true,
                        ProductName: true,
                        Image: true,
                        Weight_volume: true,
                        Unit: true,
                        UnitPrice: true,
                    }
                }
            }
        });

        for(let j = 0; j < products.length; j++) {
            products[j].CategoryName = products[j].Product.CategoryName;
            products[j].ProductName = products[j].Product.ProductName;
            products[j].Image = products[j].Product.Image;
            products[j].Weight_volume = products[j].Product.Weight_volume;
            products[j].Unit = products[j].Product.Unit;
            products[j].UnitPrice = products[j].Product.UnitPrice;
            delete products[j].Product;
        }

        manufacturerInfo[i].products = products;
    }
    res.status(200).json({manufacturerInfo});
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    // let output = {
    //     products: [{
    //     productName: 'Mojo',
    //     image: 'public/images/mojo.jpg',
    //     bid: [123456, 256457, 256423],
    //     pid: 123456,
    //     mid: 123456,
    //     weight_volume: 500,
    //     unit: 'ml',
    //     unitPrice: 30,
    //     quantity: 1000,
    //     minQuantityForSale: 100,
    //     minQuantityForDiscount: 500,
    //     minDiscount: 2.5,
    //     maxDiscount: 8.0,
    //     discountRate: 0.5,
    //     productQuantityForDiscountRate: 100,
    //     },
    //     {    
    //     productName: 'RC',
    //     image: 'public/images/rc.jpg',
    //     bid: [123456, 256457, 256423],
    //     pid: 123456,
    //     mid: 123456,
    //     weight_volume: '500',
    //     unit: 'ml',
    //     unitPrice: 30,
    //     quantity: 1000,
    //     minQuantityForSale: 100,
    //     minQuantityForDiscount: 500,
    //     minDiscount: 2.5,
    //     maxDiscount: 8.0,
    //     discountRate: 0.5,
    //     productQuantityForDiscountRate: 100,
    //     }
    //     ]
    // };

    // res.json(output);
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



function updateCartInfo(req, res) {
    let output = {
        message: 'updating cart successful'
    };

    res.json(output);
}

async function deleteCartProductInfo(req, res) {

    try {
        // Extracting input parameters from the request body
        const {
            sid,
            pid,
        } = req.body;

        const deleteInfo = await prisma.cart.deleteMany({
            where: {
              sid: sid,
              pid: pid,
            },
        });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'deleting from cart successful',
        });
    } catch (error) {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
}

module.exports = {
    getCartInfo,
    updateCartInfo,
    addToCartInfo,
    deleteCartInfo,
    deleteCartProductInfo,
}