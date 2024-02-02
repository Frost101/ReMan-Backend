const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getBatchList(req, res){

    const iid = req.body.iid;
    const pid = req.body.pid;

    try {
      const batches = await prisma.inventoryBatch.findMany({
        where: {
          iid: iid,
          pid: pid,
        },
        select: {
          bid: true,
          ManufacturingDate: true,
          ExpiryDate: true,
          Quantity: true,
          MarketStatus: true,
          Sale: true,
        },
      });
  
      if (batches) {   
        res.status(200).json({batches});
      } else {
        res.status(404).json({ error: 'No batches found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    // let output = {
    //     batches: [
    //         {
    //             BID: 123456,
    //             manufacturingDate: '2021-01-01',
    //             expiryDate: '2022-01-01',
    //             quantity: 1000,
    //         },
    //         {
    //             BID: 555556,
    //             manufacturingDate: '2022-01-01',
    //             expiryDate: '2023-01-01',
    //             quantity: 1000,
    //         },
    //         {
    //             BID: 777756,
    //             manufacturingDate: '2022-01-01',
    //             expiryDate: '2024-01-01',
    //             quantity: 1000,
    //         },
            
    //     ],
    // };
    // res.status(200).json(output);
}




function batchScreening(req, res){
    res.status(200).end();
}


async function addNewBatch(req, res){
    try {
        // Extracting input parameters from the request body
        const phid = req.body.phid;
        const pid = req.body.pid;
        const manufacturingDate = new Date(req.body.manufacturingDate);
        const expiryDate = new Date(req.body.expiryDate);
        const quantity = req.body.quantity;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save new batch details to the database or perform other actions
        const user = await prisma.productionHouseBatch.create({
            data: {
              phid: phid,
              pid: pid,
              ManufacturingDate: manufacturingDate,
              ExpiryDate: expiryDate,
              Quantity: quantity,
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Production House Batch created successfully',
        });
    } catch (error) {
        console.error('Error adding batch:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Production House Batch with the provided description already exists',
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


async function addNewBatch1(req, res) {
    try {
        // Extracting input parameters from the request body
        const iid = req.body.iid;
        const pid = req.body.pid;
        const manufacturingDate = new Date(req.body.manufacturingDate);
        const expiryDate = new Date(req.body.expiryDate);
        const quantity = req.body.quantity;
        const inMarketplace = req.body.inMarketplace;
        const sale = req.body.sale;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save inventory details to the database or perform other actions
        const user = await prisma.inventoryBatch.create({
            data: {
              iid: iid,
              pid: pid,
              ManufacturingDate: manufacturingDate,
              ExpiryDate: expiryDate,
              Quantity: quantity,
              MarketStatus: inMarketplace,
              Sale: sale,
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Inventory Batch created successfully',
        });
    } catch (error) {
        console.error('Error adding batch:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Inventory Batch with the provided description already exists',
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


function deleteBatch(req, res){
    res.status(200).end();
}

module.exports = {
    getBatchList,
    batchScreening,
    addNewBatch,
    addNewBatch1,
    deleteBatch,
};