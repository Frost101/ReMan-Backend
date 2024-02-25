const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addNewInventory(req, res) {

    try {
        // Extracting input parameters from the request body
        const {
            MID,
            InventoryName,
            Capacity,
            InventoryType,
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

        // TODO: Save inventory details to the database or perform other actions
        const user = await prisma.inventory.create({
            data: {
              mid: MID,
              InventoryName: InventoryName,
              Capacity: Capacity,
              Type: InventoryType,
              Image: Image,
              Details: Details,
              EmptyStatus: true,
              RealOwner: MID,
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
            message: 'Inventory created successfully',
        });
    } catch (error) {
        console.error('Error adding inventory:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Inventory with the provided description already exists',
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

function checkInventoryStatus(req, res) {
    let output = {
        empty: false,
        owned: true,
    };

    res.json(output);
}

async function deleteInventory(req, res) {

    const userId = req.body.IID;

    try {
      const user = await prisma.inventory.delete({
        where: {
          iid: userId,
        },
      });
  
      res.status(200).json({success: true,
                             message: 'Inventory removed successfully'});
    } catch (error) {

      if(error.code === 'P2025') {
        res.status(404).json({ error: 'Inventory not found' });
      }
      else{ 
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}

async function getInventoriesList(req, res) {

    const userId = req.body.manufacturerId;

    try {
      const inventories = await prisma.inventory.findMany({
        where: {
          mid: userId,
        },
        select: {
          iid: true,
          InventoryName: true,
          Capacity: true,
          Type: true,
          Image: true,
          Details: true,
          EmptyStatus: true,
          RealOwner: true,
          HouseNumber: true,
          Street: true,
          zip: true,
          Thana: true,
          Division: true,
          AddressDetails: true,
        },
        orderBy: {
          InventoryName: 'asc',
        }
      });
  
      if (inventories) {   
        res.status(200).json({inventories});
      } else {
        res.status(404).json({ error: 'No inventories found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}




async function getInventoryInfo(req, res) {

  const iid = req.body.iid;

  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        iid: iid,
      },
      select: {
        InventoryName: true,
        Capacity: true,
        Type: true,
        Image: true,
        Details: true,
        EmptyStatus: true,
        RealOwner: true,
        HouseNumber: true,
        Street: true,
        zip: true,
        Thana: true,
        Division: true,
        AddressDetails: true,
        mid: true,
        Company: {
          select: {
            Name: true,
            Logo: true,
          }
        },
      }
    });

    if (inventory) {
      inventory.OwnerName = inventory.Company.Name;
      inventory.OwnerLogo = inventory.Company.Logo;
      delete inventory.Company;   
      res.status(200).json({inventory});
    } else {
      res.status(404).json({ error: 'No inventories found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function shiftToInventory(req, res) {

    const {
        fromIID,
        toIID,
        bid,
    } = req.body;

    try {
    
        for(let i = 0; i < bid.length; i++) {
          const user = await prisma.inventoryBatch.update({
            where: {
              bid: bid[i],
            },
            data: {
              iid: toIID,
            },
          });
        }

        const user = await prisma.inventory.update({
            where: {
              iid: toIID,
            },
            data: {
              EmptyStatus: false,
            },
          });

          const fromIIDBatches = await prisma.inventoryBatch.findMany({
            where: {
              iid: fromIID,
            },
          });

          if(fromIIDBatches.length === 0) {
            const user = await prisma.inventory.update({
              where: {
                iid: fromIID,
              },
              data: {
                EmptyStatus: true,
              },
            });
          }
          res.status(200).json({success: true,
                          message: "Batch products shifted"});             
      } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}



module.exports = {
    addNewInventory,
    checkInventoryStatus,
    deleteInventory,
    getInventoriesList,
    getInventoryInfo,
    shiftToInventory,
}