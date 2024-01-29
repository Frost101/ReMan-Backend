const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getManufacturerInfo(req, res) {

    const userId = req.body.MID;

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
    // let output = {
    //         name: 'Meril',
    //         phoneNumber: ['01988974891', '05776879659'],
    //         image: 'public/images/meril.jpg',
    //         rating: 4.87,
    //         website: 'https://www.meril.com',
    //         email: 'meril@gmail.com',
    //         address: '32 Baker Street, Mymensingh',
    //         tin: 23878931
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

module.exports = {
    getManufacturerInfo,
    getOwnerInfo,
}