const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getShopInfo(req, res) {
  const userId = req.body.SID;

  try {
    const user = await prisma.shop.findUnique({
      where: {
        ShopID: userId,
      },
      select: {
        Name: true,
        PhoneNumber: true,
        Logo: true,
        RetailPoints: true,
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
      res.json({
        Name: user.Name,
        PhoneNumber: user.PhoneNumber,
        Logo: user.Logo,
        RetailPoints: user.RetailPoints,
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
    // let output = {
    //         shopName: 'Reja Store',
    //         phoneNumber: ['01988974891', '05776879659'],
    //         shopImage: 'public/images/reja_store.jpg',
    //         retailPoints: 663,
    //         website: 'https://www.reja_store.com',
    //         email: 'reja@gmail.com',
    //         address: '32 Baker Street, Mymensingh',
    // };

    // res.json(output);
}



function getOwnerInfo(req, res) {
    let output = {
        owners: [{
        name: 'Shamim',
        phoneNumber: ['01988344891', '05713879659'],
        image: 'public/images/shamim.jpg',
        email: 'shamim@gmail.com',
        address: '32 Baker Street, Mymensingh',
        },
        {    
        name: 'Talukder',
        phoneNumber: ['01988333891', '05711279659'],
        image: 'public/images/talukder.jpg',
        email: 'talukder@gmail.com',
        address: '34 Baker Street, Mymensingh',
        }
        ]
    };

    res.json(output);
}

module.exports = {
    getShopInfo,
    getOwnerInfo,
}