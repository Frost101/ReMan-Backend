const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getManufacturerInfo(req, res) {

    const userId = req.body.manufacturerId;

    try {
      const user = await prisma.company.findUnique({
        where: {
          mid: userId,
        },
        select: {
          Name: true,
          PhoneNumber: true,
          tin: true,
          Logo: true,
          Rating: true,
          Website: true,
          Email: true,
          HouseNumber: true,
          Street: true,
          zip: true,
          Thana: true,
          Division: true,
          AddressDetails: true,
        },
      });
  
      if (user) {   
        const formattedAddresses = `${user.AddressDetails}, ${user.HouseNumber}, ${user.Street}, ${user.zip}, ${user.Thana}, ${user.Division}`;  
        res.status(200).json({
          Name: user.Name,
          PhoneNumber: user.PhoneNumber,
          tin: user.tin,
          Image: user.Logo,
          Rating: user.Rating,
          Website: user.Website,
          Email: user.Email,
          Address: formattedAddresses,
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}



function getOwnerInfo(req, res) {
    let output = {
        owners: [{
        name: 'Shamim',
        phoneNumber: ['01988344891', '05713879659'],
        image: 'public/images/shamim.jpg',
        email: 'shamim@gmail.com',
        dob: '03/09/1978',
        nid: 83302034
        },
        {    
        name: 'Talukder',
        phoneNumber: ['01988333891', '05711279659'],
        image: 'public/images/talukder.jpg',
        email: 'talukder@gmail.com',
        dob: '09/02/1988',
        nid: 83303534
        }
        ]
    };

    res.json(output);
}



async function getManufacturerCountInfo(req, res) {

  const manufacturerId = req.body.manufacturerId;

  try {
    const inventoryCount = await prisma.inventory.count({
      where: {
        mid: manufacturerId,
      },
    });

    const productionHouseCount = await prisma.productionHouse.count({
      where: {
        mid: manufacturerId,
      },
    });

    const categories = await prisma.product.findMany({
      where: {
        mid: manufacturerId,
      },
      distinct: ['CategoryName'],
    });

    const categoryCount = categories.length;

    const products = await prisma.product.findMany({
      where: {
        mid: manufacturerId,
      },
      select: {
        pid: true,
      },
    });

    const distinctProductCount = products.length;

    let batchCount = 0, totalProductCount = 0;

    const totalInventoryProductCount = await prisma.inventoryBatch.groupBy({
      by: ['pid'],
      _sum: {
        Quantity: true,
      },
      _count: {
        bid: true,
      },
      where: {
        pid: { in: products.map((product) => product.pid) },
      },
    });

    const totalProductionHouseProductCount = await prisma.productionHouseBatch.groupBy({
      by: ['pid'],
      _sum: {
        Quantity: true,
      },
      _count: {
        bid: true,
      },
      where: {
        pid: { in: products.map((product) => product.pid) },
      },
    });

    for (let i = 0; i < totalInventoryProductCount.length; i++) {
      totalProductCount += totalInventoryProductCount[i]._sum.Quantity;
      batchCount += totalInventoryProductCount[i]._count.bid;
    }

    for (let i = 0; i < totalProductionHouseProductCount.length; i++) {
      totalProductCount += totalProductionHouseProductCount[i]._sum.Quantity;
      batchCount += totalProductionHouseProductCount[i]._count.bid;
    }

    // Total Order Count
    const totalOrderCount = await prisma.orderFragment.count({
      where: {
        mid: manufacturerId,
      },
    });
    // console.log(totalOrderCount);

    // Today's Income
    const today = new Date();
    const todayOrders = await prisma.order.findMany({
      where: {
        OrderDate: {
          gte: today,
        },
      },
      select: {
        oid: true,
      }
    });

    let todayIncome = 0;
    for(let i = 0; i < todayOrders.length; i++) {
      const orderDetails = await prisma.orderFragment.findMany({
        where: {
          oid: todayOrders[i].oid,
          mid: manufacturerId,
        },
        select: {
          FinalPrice: true,
        }
      });
      if(orderDetails.length > 0){
        todayIncome += orderDetails[0].FinalPrice;
      }
    }


    res.status(200).json({
      InventoryCount: inventoryCount,
      ProductionHouseCount: productionHouseCount,
      DistinctProductCount: distinctProductCount,
      BatchCount: batchCount,
      CategoryCount: categoryCount,
      TotalProductCount: totalProductCount,
      TotalOrderCount: totalOrderCount,
      TodayIncome: todayIncome,
    });

  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    getManufacturerInfo,
    getOwnerInfo,
    getManufacturerCountInfo
}