const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function addNewOrder(req, res) {
    let output = {
        message: 'adding a new order successful'
    };

    res.json(output);
}

function updateDeliveryStatus(req, res) {
    let output = {
        message: 'Updating Delivery Status Successful'
    };

    res.json(output);
}

function getRetailerOrders(req, res) {
    let output = {
        orders: [{
        oid: 233412,
        orderDate: '03/08/2023',
        deliveryDate: '17/08/2023',
        totalPrice: 230000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD'
        },
        {    
        oid: 233413,
        orderDate: '03/08/2023',
        deliveryDate: '19/08/2023',
        totalPrice: 250000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'Bkash'
        }
        ]
    };

    res.json(output);
}

async function getManufacturerOrders(req, res) {

    const mid = req.body.manufacturerId;

    try {
      const orders = await prisma.orderFragment.findMany({
        where: {
          mid: mid,
        },
        select: {
          oid: true,
          FinalPrice: true,
          PaidAmount: true,
          PaymentStatus: true,
          DeliveryStatus: true,
          DeliveryDate: true,
          PaymentLastDate: true,
          ShipmentStatus: true,
          Order: {
            select: {
              OrderDate: true,
              PaymentMethod: true,
              sid: true,
              Shop: {
                select: {
                  Name: true,
                  Logo: true,
                  PhoneNumber: true,
                },
              },
            },
          },
        },
      });
  
      if (orders) {
        for(let i = 0; i < orders.length; i++) {
            orders[i].ShopName = orders[i].Order.Shop.Name;
            orders[i].ShopLogo = orders[i].Order.Shop.Logo;
            orders[i].ShopPhoneNumber = orders[i].Order.Shop.PhoneNumber;
            orders[i].OrderDate = orders[i].Order.OrderDate;
            orders[i].PaymentMethod = orders[i].Order.PaymentMethod;
            delete orders[i].Order;

            const products = await prisma.singleProductOrder.findMany({
                where: {
                  oid: orders[i].oid,
                  mid: mid,
                },
                select: {
                  pid: true,
                  Quantity: true,
                  ShippedQuantity: true,
                  ShipmentStatus: true,
                  Price: true,
                  Product: {
                    select: {
                      CategoryName: true,
                      ProductName: true,
                      Image: true,
                      Weight_volume: true,
                      Unit: true,
                      Description: true,
                      UnitPrice: true,
                    },
                  },
                },
            });

            for(let j = 0; j < products.length; j++) {
                products[j].ProductName = products[j].Product.ProductName;
                products[j].Image = products[j].Product.Image;
                products[j].WeightVolume = products[j].Product.Weight_volume;
                products[j].Unit = products[j].Product.Unit;
                products[j].Description = products[j].Product.Description;
                products[j].UnitPrice = products[j].Product.UnitPrice;
                delete products[j].Product;
            }
            orders[i].Products = products;
        }  
        res.status(200).json({orders});
      } else {
        res.status(404).json({ error: 'No orders found' });
      }
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    // let output = {
    //     orders: [{
    //     oid: 233412,
    //     shopName: 'Hatir Store',
    //     shopImage: 'public/images/hatir_store.jpg',
    //     shopPhoneNumber: '01787623092',
    //     orderDate: '03/08/2023',
    //     deliveryDate: '17/08/2023',
    //     totalPrice: 230000,
    //     paymentStatus: 'Paid',
    //     deliveryStatus: 'Delivered',
    //     paymentMethod: 'COD'
    //     },
    //     {    
    //     oid: 233413,
    //     shopName: 'Kulir Store',
    //     shopImage: 'public/images/kulir_store.jpg',
    //     shopPhoneNumber: '01787343092',
    //     orderDate: '03/08/2023',
    //     deliveryDate: '19/08/2023',
    //     totalPrice: 250000,
    //     paymentStatus: 'Paid',
    //     deliveryStatus: 'Delivered',
    //     paymentMethod: 'Bkash'
    //     }
    //     ]
    // };

    // res.json(output);
}


async function getOrderedProductInfo(req, res) {

  const pid = req.body.pid;
  const oid = req.body.oid;
  const mid = req.body.manufacturerId;

  try {
    const productInfo = await prisma.singleProductOrder.findMany({
      where: {
        oid: oid,
        mid: mid,
        pid: pid,
      },
      select: {
        Quantity: true,
        ShippedQuantity: true,
        ShipmentStatus: true,
        Price: true,
        Product: {
          select: {
            ProductName: true,
            CategoryName: true,
            Image: true,
            Weight_volume: true,
            Unit: true,
            UnitPrice: true,
            Description: true,
            Rating: true,
          }  
        }
      }
    });

    productInfo[0].ProductName = productInfo[0].Product.ProductName;
    productInfo[0].CategoryName = productInfo[0].Product.CategoryName;
    productInfo[0].Image = productInfo[0].Product.Image;
    productInfo[0].Weight_volume = productInfo[0].Product.Weight_volume;
    productInfo[0].Unit = productInfo[0].Product.Unit;
    productInfo[0].UnitPrice = productInfo[0].Product.UnitPrice;
    productInfo[0].Description = productInfo[0].Product.Description;
    productInfo[0].Rating = productInfo[0].Product.Rating;
    delete productInfo[0].Product;

    res.status(200).json({productInfo: productInfo[0]});
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


function getRetailerOrderDetails(req, res) {
    let output = {
        orderDate: '03/08/2023',
        totalPrice: 230000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD',
        orderFragments: [{
            manufacturerName: 'Keya',
            manufacturerLogo: 'public/images/keya.jpg',
            deliveryDate: '17/08/2023',
            rawPrice: 115000,
            deliveryCharge: 500,
            reducedAmount: 500,
            finalPrice: 115000,
            paymentStatus: 'Paid',
            deliveryStatus: 'Delivered',
            products: [{
                productName: 'Keya Soap',
                image: 'public/images/keya_soap.jpg',
                quantity: 2000,
                price: 60000
            },{
                productName: 'Keya Shampoo',
                image: 'public/images/keya_shampoo.jpg',
                quantity: 1500,
                price: 55000
            }]
            },
            {    
            manufacturerName: 'Meril',
            manufacturerLogo: 'public/images/meril.jpg',
            deliveryDate: '19/08/2023',
            rawPrice: 115000,
            deliveryCharge: 500,
            reducedAmount: 500,
            finalPrice: 115000,
            paymentStatus: 'Paid',
            deliveryStatus: 'Delivered',
            products: [{
                productName: 'Meril Soap',
                image: 'public/images/meril_soap.jpg',
                quantity: 2000,
                price: 60000
            },{
                productName: 'Meril Shampoo',
                image: 'public/images/meril_shampoo.jpg',
                quantity: 1500,
                price: 55000
            }]
            }
        ]
    };

    res.json(output);
}

function getManufacturerOrderDetails(req, res) {
    let output = {
        shopName: 'Hatir Store',
        shopImage: 'public/images/hatir_store.jpg',
        shopPhoneNumber: '01787623092',
        orderDate: '03/08/2023',
        deliveryDate: '17/08/2023',
        rawPrice: 115000,
        deliveryCharge: 500,
        reducedAmount: 500,
        finalPrice: 115000,
        paymentStatus: 'Paid',
        deliveryStatus: 'Delivered',
        paymentMethod: 'COD',
        products: [{
            productName: 'Keya Soap',
            image: 'public/images/keya_soap.jpg',
            quantity: 2000,
            price: 60000
        },{
            productName: 'Keya Shampoo',
            image: 'public/images/keya_shampoo.jpg',
            quantity: 1500,
            price: 55000
        }]        
    };

    res.json(output);
}

module.exports = {
    addNewOrder,
    updateDeliveryStatus,
    getRetailerOrders,
    getManufacturerOrders,
    getOrderedProductInfo,
    getRetailerOrderDetails,
    getManufacturerOrderDetails
}