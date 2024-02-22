const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.emptyInventoryList = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { mid } = req.body;

        // Example empty inventories data
        const emptyInventories = await prisma.inventory.findMany({
            where: {
                mid: mid,
                RealOwner: mid,
                EmptyStatus: true,
            },
            select: {
                iid: true,
                InventoryName: true,
                Capacity: true,
                Type: true,
                Details: true,
                HouseNumber: true,
                Street: true,
                zip: true,
                Thana: true,
                Division: true,
                AddressDetails: true,
                Image: true,
            }
        });    

        // Responding with success and the array of empty inventories
        res.status(200).json(emptyInventories);
    } catch (error) {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};

module.exports.giveLease = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { iid, mid, Duration, PerDayRent, Details } = req.body;
        const FreeFromDate = new Date();
        const FreeTillDate = new Date();
        FreeTillDate.setDate(FreeFromDate.getDate() + Duration);

        const rentedInventory = await prisma.rental.create({
            data: {
                iid: iid,
                OwnerID: mid,
                OwnedToID: mid,
                FreeFrom: FreeFromDate,
                FreeTill: FreeTillDate,
                PerDayRent: PerDayRent,
                Details: Details,
                RentalStatus: 'Not Rented',
            },
        });

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease given successfully',
        });
    } catch (error) {
            console.error('Error giving lease:', error);
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};

module.exports.inventoryMarketplace = async (req, res) => {
    const mid = req.body.mid;
    try {

        const inventoryMarketplaceData = await prisma.rental.findMany({
            where: {
                NOT: {
                    OwnerID: mid,
                },
                RentalStatus: 'Not Rented',
            },
            select: {
                rid: true,
                iid: true,
                FreeFrom: true,
                FreeTill: true,
                PerDayRent: true,
                Details: true,
                Inventory: {
                    select: {
                        InventoryName: true,
                        Capacity: true,
                        Type: true,
                        Details: true,
                        HouseNumber: true,
                        Street: true,
                        zip: true,
                        Thana: true,
                        Division: true,
                        AddressDetails: true,
                        Image: true,
                    }
                }
            }
        });

        for(let i = 0; i < inventoryMarketplaceData.length; i++) {
            inventoryMarketplaceData[i].InventoryName = inventoryMarketplaceData[i].Inventory.InventoryName;
            inventoryMarketplaceData[i].Capacity = inventoryMarketplaceData[i].Inventory.Capacity;
            inventoryMarketplaceData[i].Type = inventoryMarketplaceData[i].Inventory.Type;
            inventoryMarketplaceData[i].Details = inventoryMarketplaceData[i].Inventory.Details;
            inventoryMarketplaceData[i].HouseNumber = inventoryMarketplaceData[i].Inventory.HouseNumber;
            inventoryMarketplaceData[i].Street = inventoryMarketplaceData[i].Inventory.Street;
            inventoryMarketplaceData[i].zip = inventoryMarketplaceData[i].Inventory.zip;
            inventoryMarketplaceData[i].Thana = inventoryMarketplaceData[i].Inventory.Thana;
            inventoryMarketplaceData[i].Division = inventoryMarketplaceData[i].Inventory.Division;
            inventoryMarketplaceData[i].AddressDetails = inventoryMarketplaceData[i].Inventory.AddressDetails;
            inventoryMarketplaceData[i].Image = inventoryMarketplaceData[i].Inventory.Image;
            delete inventoryMarketplaceData[i].Inventory;
        }
        // Responding with success and the array of inventories
        res.status(200).json(inventoryMarketplaceData);
    } catch (error) {
        console.error('Error fetching inventory marketplace:', error);

        // Responding with server errors
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};



module.exports.leasedInventoriesNotTaken = async (req, res) => {
    const mid = req.body.mid;
    try {

        const inventoryMarketplaceData = await prisma.rental.findMany({
            where: {
                OwnerID: mid,
                RentalStatus: 'Not Rented',
            },
            select: {
                rid: true,
                iid: true,
                FreeFrom: true,
                FreeTill: true,
                PerDayRent: true,
                Details: true,
                Inventory: {
                    select: {
                        InventoryName: true,
                        Capacity: true,
                        Type: true,
                        Details: true,
                        HouseNumber: true,
                        Street: true,
                        zip: true,
                        Thana: true,
                        Division: true,
                        AddressDetails: true,
                        Image: true,
                    }
                }
            }
        });

        for(let i = 0; i < inventoryMarketplaceData.length; i++) {
            inventoryMarketplaceData[i].InventoryName = inventoryMarketplaceData[i].Inventory.InventoryName;
            inventoryMarketplaceData[i].Capacity = inventoryMarketplaceData[i].Inventory.Capacity;
            inventoryMarketplaceData[i].Type = inventoryMarketplaceData[i].Inventory.Type;
            inventoryMarketplaceData[i].Details = inventoryMarketplaceData[i].Inventory.Details;
            inventoryMarketplaceData[i].HouseNumber = inventoryMarketplaceData[i].Inventory.HouseNumber;
            inventoryMarketplaceData[i].Street = inventoryMarketplaceData[i].Inventory.Street;
            inventoryMarketplaceData[i].zip = inventoryMarketplaceData[i].Inventory.zip;
            inventoryMarketplaceData[i].Thana = inventoryMarketplaceData[i].Inventory.Thana;
            inventoryMarketplaceData[i].Division = inventoryMarketplaceData[i].Inventory.Division;
            inventoryMarketplaceData[i].AddressDetails = inventoryMarketplaceData[i].Inventory.AddressDetails;
            inventoryMarketplaceData[i].Image = inventoryMarketplaceData[i].Inventory.Image;
            delete inventoryMarketplaceData[i].Inventory;
        }
        // Responding with success and the array of inventories
        res.status(200).json(inventoryMarketplaceData);
    } catch (error) {
        console.error('Error fetching inventory marketplace:', error);

        // Responding with server errors
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};




module.exports.leasedInventoriesTaken = async (req, res) => {
    const mid = req.body.mid;
    try {

        const inventoryMarketplaceData = await prisma.rental.findMany({
            where: {
                OwnerID: mid,
                RentalStatus: 'Rented',
            },
            select: {
                rid: true,
                iid: true,
                FreeFrom: true,
                FreeTill: true,
                PerDayRent: true,
                Details: true,
                OccupiedFrom: true,
                OccupiedTill: true,
                Inventory: {
                    select: {
                        InventoryName: true,
                        Capacity: true,
                        Type: true,
                        Details: true,
                        HouseNumber: true,
                        Street: true,
                        zip: true,
                        Thana: true,
                        Division: true,
                        AddressDetails: true,
                        Image: true,
                    }
                },
                OwnedToID: true,
                Company_Rental_OwnedToIDToCompany: {
                    select: {
                        Name: true,
                        Logo: true,
                    }
                },
            }
        });

        for(let i = 0; i < inventoryMarketplaceData.length; i++) {
            inventoryMarketplaceData[i].InventoryName = inventoryMarketplaceData[i].Inventory.InventoryName;
            inventoryMarketplaceData[i].Capacity = inventoryMarketplaceData[i].Inventory.Capacity;
            inventoryMarketplaceData[i].Type = inventoryMarketplaceData[i].Inventory.Type;
            inventoryMarketplaceData[i].Details = inventoryMarketplaceData[i].Inventory.Details;
            inventoryMarketplaceData[i].HouseNumber = inventoryMarketplaceData[i].Inventory.HouseNumber;
            inventoryMarketplaceData[i].Street = inventoryMarketplaceData[i].Inventory.Street;
            inventoryMarketplaceData[i].zip = inventoryMarketplaceData[i].Inventory.zip;
            inventoryMarketplaceData[i].Thana = inventoryMarketplaceData[i].Inventory.Thana;
            inventoryMarketplaceData[i].Division = inventoryMarketplaceData[i].Inventory.Division;
            inventoryMarketplaceData[i].AddressDetails = inventoryMarketplaceData[i].Inventory.AddressDetails;
            inventoryMarketplaceData[i].Image = inventoryMarketplaceData[i].Inventory.Image;
            delete inventoryMarketplaceData[i].Inventory;
            inventoryMarketplaceData[i].CompanyName = inventoryMarketplaceData[i].Company_Rental_OwnedToIDToCompany.Name;
            inventoryMarketplaceData[i].CompanyLogo = inventoryMarketplaceData[i].Company_Rental_OwnedToIDToCompany.Logo;
            delete inventoryMarketplaceData[i].Company_Rental_OwnedToIDToCompany;
        }
        // Responding with success and the array of inventories
        res.status(200).json(inventoryMarketplaceData);
    } catch (error) {
        console.error('Error fetching inventory marketplace:', error);

        // Responding with server errors
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports.takeLease = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { rid, iid, OwnerID, OwnedToID, Duration } = req.body;

        const OccupiedFrom = new Date();
        const OccupiedTill = new Date();
        OccupiedTill.setDate(OccupiedFrom.getDate() + Duration);

        const rentedInventory = await prisma.rental.update({
            where: {
                rid: rid,
            },
            data: {
                OwnedToID: OwnedToID,
                OccupiedFrom: OccupiedFrom,
                OccupiedTill: OccupiedTill,
                RentalStatus: 'Rented',
            },
        });

        const changeMid = await prisma.inventory.update({
            where: {
                iid: iid,
            },
            data: {
                mid: OwnedToID,
            }
        });

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease taken successfully',
        });
    } catch (error) {
        console.error('Error taking lease:', error);
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};

module.exports.deleteFromRental = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { RID } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Remove inventory from rental in the database or perform other actions

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Inventory removed from rental successfully',
        });
    } catch (error) {
        console.error('Error removing inventory from rental:', error);

        // Responding with client errors
        if (error instanceof NotFoundError) {
            // Assuming NotFoundError is a custom error class for not found errors
            res.status(404).json({
                success: false,
                message: 'Not Found: Inventory not found in rental',
            });
        } else if (error instanceof UnauthorizedError) {
            // Assuming UnauthorizedError is a custom error class for authentication errors
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User authentication required',
            });
        } else if (error instanceof ForbiddenError) {
            // Assuming ForbiddenError is a custom error class for authorization errors
            res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient permissions',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
};