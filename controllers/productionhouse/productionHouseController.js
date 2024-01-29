const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addNewProductionHouse(req, res) {

    try {
        // Extracting input parameters from the request body
        const {
            MID,
            ProductionHouseName,
            Capacity,
            ProductionHouseType,
            Image,
            Details,
            HouseNumber,
            Street,
            ZIP,
            Thana,
            Division,
            AddressDetails,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save production house details to the database or perform other actions
        const user = await prisma.productionHouse.create({
            data: {
              mid: MID,
              ProductionHouseName: ProductionHouseName,
              Capacity: Capacity,
              Type: ProductionHouseType,
              Image: Image,
              Details: Details,
              HouseNumber: HouseNumber,
              Street: Street,
              zip: ZIP,
              Thana: Thana,
              Division: Division,
              AddressDetails: AddressDetails,
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Production House created successfully',
        });
    } catch (error) {
        console.error('Error adding production house:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Production House with the provided description already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    // let output = {
    //     message: 'adding a new Production House successful'
    // };

    // res.json(output);
}

async function deleteProductionHouse(req, res) {

    const userId = req.body.PHID;

    try {
      const user = await prisma.productionHouse.delete({
        where: {
          phid: userId,
        },
      });
  
      res.status(200).json({success: true,
                             message: 'Production House removed successfully'});
    } catch (error) {
        if(error.code === 'P2025') {
            res.status(404).json({ error: 'Production House not found' });
        }
        else{ 
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // let output = {
    //     message: 'Production House removed successfully'
    // };

    // res.json(output);
}

async function getProductionHousesList(req, res) {

    const userId = req.body.MID;

    try {
      const user = await prisma.productionHouse.findMany({
        where: {
          mid: userId,
        },
        select: {
          phid: true,
          ProductionHouseName: true,
          Capacity: true,
          Type: true,
          Image: true,
          Details: true,
          HouseNumber: true,
          Street: true,
          zip: true,
          Thana: true,
          Division: true,
          AddressDetails: true,
        },
      });
  
      if (user) {   
        res.status(200).json({user});
      } else {
        res.status(404).json({ error: 'No production houses found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    // let output = {
    //     productionHouses: [{
    //     phid: 123412,
    //     productionHouseName: 'Shahi House',
    //     address: '32 Sultan Road, Savar, 6200, Dhaka',
    //     capacity: 230,
    //     productionHouseType: 'cold storage',
    //     image: 'public/images/shahi_house.jpg',
    //     productName: ['potato', 'rice', 'wheat'],
    //     },
    //     {    
    //     phid: 123411,
    //     productionHouseName: 'Khan House',
    //     address: '32 Sultan Khan Road, Savar, 6200, Dhaka',
    //     capacity: 230,
    //     type: 'cold storage',
    //     image: 'public/images/khan_house.jpg',
    //     productName: ['potato', 'rice', 'wheat'],
    //     }
    //     ]
    // };

    // res.json(output);
}

function shiftToInventory(req, res) {
    let output = {
        message: 'Batches shifted to inventory successfully'
    };

    res.json(output);
}

module.exports = {
    addNewProductionHouse,
    deleteProductionHouse,
    getProductionHousesList,
    shiftToInventory,
}