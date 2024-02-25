const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addNewOrder(req, res) {
  const sid = req.body.sid;
  const VoucherCode = req.body.VoucherCode;
  const PaymentMethod = req.body.PaymentMethod;
  const TransactionID = req.body.TransactionID;
  let PaymentStatus = 'Paid';
  if(PaymentMethod === 'Cash On Delivery') {
      PaymentStatus = 'Not Paid';
  }
  let PaymentLastDate = null;
  if(PaymentStatus === 'Paid'){
      PaymentLastDate = new Date();
  }  

  try{
  const manufacturerInfo = await prisma.cart.findMany({
      where: {
        sid: sid,
      },
      distinct: ['mid'],
      select: {
          mid: true,
      },
  });

  let totalPriceOfOrder = 0;

  for(let i = 0; i < manufacturerInfo.length; i++) {

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

      manufacturerInfo[i].DeliveryCharge = totalDeliveryCharge[0]._sum.DeliveryCharge;
      manufacturerInfo[i].RawPrice = totalDeliveryCharge[0]._sum.Price;
      manufacturerInfo[i].VoucherCode = 'ZERO';
      manufacturerInfo[i].ReducedAmount = 0;
      manufacturerInfo[i].FinalPrice = manufacturerInfo[i].RawPrice + manufacturerInfo[i].DeliveryCharge;

      if(VoucherCode != null && VoucherCode != "") {
          const voucher = await prisma.voucher.findUnique({
              where: {
                  VoucherCode: VoucherCode,
              },
              select: {
                  mid: true,
                  VoucherPercentage: true,
              }
          });
          if(voucher.mid === manufacturerInfo[i].mid) {
              manufacturerInfo[i].VoucherCode = VoucherCode;
              manufacturerInfo[i].ReducedAmount = (manufacturerInfo[i].RawPrice * voucher.VoucherPercentage) / 100.0;
              manufacturerInfo[i].FinalPrice = manufacturerInfo[i].RawPrice + manufacturerInfo[i].DeliveryCharge - manufacturerInfo[i].ReducedAmount;
          }
      }
      totalPriceOfOrder += manufacturerInfo[i].FinalPrice;

      const products = await prisma.cart.findMany({
          where: {
              sid: sid,
              mid: manufacturerInfo[i].mid,
          },
          select: {
              pid: true,
              Quantity: true,
              Price: true,
          }
      });
      manufacturerInfo[i].products = products;
  }
  const today = new Date();
  let PaidAmount = 0;
  if(PaymentStatus === 'Paid') {
      PaidAmount = totalPriceOfOrder;
  }

  const newOrder = await prisma.order.create({
      data: {
          sid: sid,
          OrderDate: today,
          TotalPrice: totalPriceOfOrder,
          PaidAmount: PaidAmount,
          PaymentStatus: PaymentStatus,
          DeliveryStatus: 'Not Delivered',
          PaymentMethod: PaymentMethod,
          PaymentLastDate: PaymentLastDate,
          TransactionID: TransactionID,
      }
  });

  const oid = newOrder.oid;
  // console.log(oid);

  for(let i = 0; i < manufacturerInfo.length; i++) {
      if(PaymentStatus === 'Paid') {
        PaidAmount = manufacturerInfo[i].FinalPrice;
      }
      const newOrderFragment = await prisma.orderFragment.create({
          data: {
              oid: oid,
              mid: manufacturerInfo[i].mid,
              RawPrice: manufacturerInfo[i].RawPrice,
              DeliveryCharge: manufacturerInfo[i].DeliveryCharge,
              VoucherCode: manufacturerInfo[i].VoucherCode,
              ReducedAmount: manufacturerInfo[i].ReducedAmount,
              FinalPrice: manufacturerInfo[i].FinalPrice,
              PaidAmount: PaidAmount,
              PaymentStatus: PaymentStatus,
              DeliveryStatus: 'Not Delivered',
              PaymentLastDate: PaymentLastDate,
              ShipmentStatus: 'Not Shipped',
          }
      });

      for(let j = 0; j < manufacturerInfo[i].products.length; j++) {
          const newSingleProductOrder = await prisma.singleProductOrder.create({
              data: {
                  oid: oid,
                  mid: manufacturerInfo[i].mid,
                  pid: manufacturerInfo[i].products[j].pid,
                  Quantity: manufacturerInfo[i].products[j].Quantity,
                  ShippedQuantity: 0,
                  ShipmentStatus: 'Not Shipped',
                  Price: manufacturerInfo[i].products[j].Price,
              }
          });
      }
  }

  if(VoucherCode != null && VoucherCode != "") {
  const voucherCount = await prisma.voucherUsage.findMany({
      where: {
          VoucherCode: VoucherCode,
          sid: sid,
      },
      select: {
          Usage: true,
      }
  });

  if(voucherCount.length === 0) {
      const newVoucherUsage = await prisma.voucherUsage.create({
          data: {
              VoucherCode: VoucherCode,
              sid: sid,
              Usage: 1,
          }
      });
  }
  else{
    const newVoucherUsage = await prisma.voucherUsage.updateMany({
        where: {
            VoucherCode: VoucherCode,
            sid: sid,
        },
        data: {
            Usage: {
                increment: 1,
            },
        },
    });
  }
}  
  
  if(PaymentMethod === 'Cash On Delivery' || PaymentMethod === 'Online Payment') {
  const deleteCart = await prisma.cart.deleteMany({
      where: {
          sid: sid,
      }
  });
}

  res.status(201).json({success: true,
                      message: 'Order Added Successfully'});


  const shopName = await prisma.shop.findUnique({
      where: {
          ShopID: sid,
      },
      select: {
          Name: true,
      }
  });
  
  for(let i = 0; i < manufacturerInfo.length; i++) {
    const notification = await prisma.companyNotification.create({
        data: {
            mid: manufacturerInfo[i].mid,
            Message: shopName.Name + ' has placed an order',
            DateAndTime: new Date(),
            ReadStatus: false,
            Priority: 'Mid',
        }
    });
  }

  } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

function updateDeliveryStatus(req, res) {
    let output = {
        message: 'Updating Delivery Status Successful'
    };

    res.json(output);
}

async function getRetailerOrders(req, res) {

  try{
    const sid = req.body.sid;
    let orders = [];
    const orderIDs = await prisma.order.findMany({
      where: {
        sid: sid,
      },
      select: {
        oid: true,
        OrderDate: true,
        PaymentMethod: true,
        TransactionID: true,
      },
    });

    for(let i = 0; i < orderIDs.length; i++) {
      const orderFragments = await prisma.orderFragment.findMany({
        where: {
          oid: orderIDs[i].oid,
        },
        select: {
          mid: true,
          RawPrice: true,
          DeliveryCharge: true,
          VoucherCode: true,
          ReducedAmount: true,
          FinalPrice: true,
          PaymentStatus: true,
          DeliveryStatus: true,
          DeliveryDate: true,
          ShipmentStatus: true,
          Company: {
            select: {
              Name: true,
              Logo: true,
            }  
          }
        },
      });

      if(orderFragments.length !== 0) {
        for(let j = 0; j < orderFragments.length; j++) {
          orderFragments[j].ManufacturerName = orderFragments[j].Company.Name;
          orderFragments[j].ManufacturerLogo = orderFragments[j].Company.Logo;
          delete orderFragments[j].Company;

          if(orderFragments[j].VoucherCode === 'ZERO') {
            orderFragments[j].VoucherCode = null;
          }  

          orderFragments[j].OrderDate = orderIDs[i].OrderDate;
          orderFragments[j].PaymentMethod = orderIDs[i].PaymentMethod;
          orderFragments[j].oid = orderIDs[i].oid;
          orderFragments[j].TransactionID = orderIDs[i].TransactionID;
          orders.push(orderFragments[j]);
        }
      }
    }
    if(orders){
      orders.sort((a, b) => {
        return new Date(b.OrderDate) - new Date(a.OrderDate);
      });
    }
    res.status(200).json({orders});
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

        orders.sort((a, b) => {
          return new Date(b.Order.OrderDate) - new Date(a.Order.OrderDate);
        });
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
                products[j].CategoryName = products[j].Product.CategoryName;
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



async function updateShipmentInfo(req, res) {

  const pid = req.body.pid;
  const oid = req.body.oid;
  const mid = req.body.manufacturerId;
  const bid = req.body.bid;
  const Quantity = req.body.Quantity;

  try {
    const updateBatch = await prisma.inventoryBatch.update({
      where: {
        bid: bid,
      },
      data: {
        Quantity: {
          decrement: Quantity,
        },
      },
    });

    const deleteBatch = await prisma.inventoryBatch.delete({
      where: {
        bid: bid,
        Quantity: 0,
      },
    });

    if(deleteBatch.length !== 0) {
    const fromIIDBatches = await prisma.inventoryBatch.findMany({
      where: {
        iid: deleteBatch.iid,
      },
    });

    if(fromIIDBatches.length === 0) {
      const user = await prisma.inventory.update({
        where: {
          iid: deleteBatch.iid,
        },
        data: {
          EmptyStatus: true,
        },
      });
    }
  }

    const updateShippedProduct = await prisma.singleProductOrder.updateMany({
      where: {
        oid: oid,
        mid: mid,
        pid: pid,
      },
      data: {
        ShippedQuantity: {
          increment: Quantity,
        },
      },
    });

    const getShippedProductAndQuantity = await prisma.singleProductOrder.findMany({
      where: {
        oid: oid,
        mid: mid,
        pid: pid,
      },
      select: {
        ShippedQuantity: true,
        Quantity: true,
      },
    });

    let status = 'Partially Shipped';
    if(getShippedProductAndQuantity[0].ShippedQuantity == getShippedProductAndQuantity[0].Quantity) {
      status = 'Shipped';
    }  

    const updateShipmentStatus = await prisma.singleProductOrder.updateMany({
      where: {
        oid: oid,
        mid: mid,
        pid: pid,
      },
      data: {
        ShipmentStatus: status,
      },
    });

    const shipmentStatus = await prisma.singleProductOrder.findMany({
      where: {
        oid: oid,
        mid: mid,
      },
      select: {
        ShipmentStatus: true,
      },
    });

    status = 'Shipped';

    for(let i = 0; i < shipmentStatus.length; i++) {
      if(shipmentStatus[i].ShipmentStatus != 'Shipped') {
        status = 'Partially Shipped';
        break;
      }
    }

    const updateOrderFragmentShipmentStatus = await prisma.orderFragment.updateMany({
      where: {
        oid: oid,
        mid: mid,
      },
      data: {
        ShipmentStatus: status,
      },
    });

    res.status(200).json({message: "Shipment Info Updated"});
    if(status === 'Shipped'){
      setTimeout(async () => {
        await orderDelivered(oid, mid);
      }, 60000);
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function orderDelivered(oid, mid) {
  try {
    const paymentStatus = await prisma.orderFragment.findMany({
      where: {
        oid: oid,
        mid: mid,
      },
      select: {
        PaymentStatus: true,
        FinalPrice: true,
      }
    });

    const updateDeliveryStatus = await prisma.orderFragment.updateMany({
      where: {
        oid: oid,
        mid: mid,
      },
      data: {
        DeliveryStatus: 'Delivered',
        DeliveryDate: new Date(),
      },
    });

    if(paymentStatus[0].PaymentStatus !== 'Paid'){
      const updateDeliveryStatus = await prisma.orderFragment.updateMany({
        where: {
          oid: oid,
          mid: mid,
        },
        data: {
          PaymentStatus: 'Paid',
          PaymentLastDate: new Date(),
          PaidAmount: paymentStatus[0].FinalPrice,
        },
      });
    }

  } catch (error) {
    console.error('Error retrieving user:', error);
  }
}



async function getRetailerOrderDetails(req, res) {
  try{
    const oid = req.body.oid;
    const mid = req.body.mid;

      const orderDetailedInfo = await prisma.orderFragment.findMany({
        where: {
          oid: oid,
          mid: mid,
        },
        select: {
          mid: true,
          RawPrice: true,
          DeliveryCharge: true,
          VoucherCode: true,
          ReducedAmount: true,
          FinalPrice: true,
          PaymentStatus: true,
          DeliveryStatus: true,
          DeliveryDate: true,
          ShipmentStatus: true,
          Company: {
            select: {
              Name: true,
              Logo: true,
            }  
          },
          Order: {
            select: {
              OrderDate: true,
              PaymentMethod: true,
              TransactionID: true,
            }
          },
        },
      });

      if(orderDetailedInfo.length !== 0) {
          orderDetailedInfo[0].ManufacturerName = orderDetailedInfo[0].Company.Name;
          orderDetailedInfo[0].ManufacturerLogo = orderDetailedInfo[0].Company.Logo;
          delete orderDetailedInfo[0].Company;

          if(orderDetailedInfo[0].VoucherCode === 'ZERO') {
            orderDetailedInfo[0].VoucherCode = null;
          }  

          orderDetailedInfo[0].OrderDate = orderDetailedInfo[0].Order.OrderDate;
          orderDetailedInfo[0].PaymentMethod = orderDetailedInfo[0].Order.PaymentMethod;
          orderDetailedInfo[0].TransactionID = orderDetailedInfo[0].Order.TransactionID;
          delete orderDetailedInfo[0].Order;

          const products = await prisma.singleProductOrder.findMany({
              where: {
                oid: oid,
                mid: mid,
              },
              select: {
                pid: true,
                Quantity: true,
                Price: true,
                Product: {
                  select: {
                    ProductName: true,
                    Image: true,
                  },
                },
              },
          });
          for(let j = 0; j < products.length; j++) {
              products[j].ProductName = products[j].Product.ProductName;
              products[j].Image = products[j].Product.Image;
              delete products[j].Product;
          }
          orderDetailedInfo[0].Products = products;
      }
    // const orderInfo = orderDetailedInfo[0];  
    res.status(200).json(orderDetailedInfo[0]);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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




async function deleteOrder(req, res) {

  const oid = req.body.oid;

  try {
    const user = await prisma.singleProductOrder.deleteMany({
      where: {
        oid: oid,
      },
    });

    const user1 = await prisma.orderFragment.deleteMany({
      where: {
        oid: oid,
      },
    });

    const user2 = await prisma.order.delete({
      where: {
        oid: oid,
      },
    });

    res.status(200).json({success: true,
                           message: 'Order removed successfully'});
  } catch (error) {
      if(error.code === 'P2025') {
          res.status(404).json({ error: 'Order not found' });
      }
      else{ 
          console.error('Error retrieving user:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
}

module.exports = {
    addNewOrder,
    updateDeliveryStatus,
    getRetailerOrders,
    getManufacturerOrders,
    getOrderedProductInfo,
    updateShipmentInfo,
    getRetailerOrderDetails,
    getManufacturerOrderDetails,
    deleteOrder,
}
