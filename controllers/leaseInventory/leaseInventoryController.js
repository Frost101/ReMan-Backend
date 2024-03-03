const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { parse } = require('dotenv');

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

        for(let i = 0; i < emptyInventories.length; i++) {
            // console.log(emptyInventories[i].iid)
            const inRental = await prisma.rental.findMany({
                where: {
                    iid: emptyInventories[i].iid,
                    RentalStatus: 'Not Rented',
                },
                select: {
                    rid: true,
                }
            });

            if(inRental.length > 0) {
                emptyInventories.splice(i, 1);
                i--;
            }
            // console.log(emptyInventories);
            // console.log("Length: ", emptyInventories.length);
        }
        res.status(200).json(emptyInventories);
    } catch (error) {
            // Responding with server errors
            console.error('Error empty inventories:', error);
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

        for(let i = 0; i < iid.length; i++) {
        const rentedInventories = await prisma.rental.create({
            data: {
                iid: iid[i],
                OwnerID: mid,
                OwnedToID: mid,
                FreeFrom: FreeFromDate,
                FreeTill: FreeTillDate,
                PerDayRent: PerDayRent,
                Details: Details,
                RentalStatus: 'Not Rented',
            },
        });
        }

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease given successfully',
        });

        for(let i = 0; i < iid.length; i++){
            const inventoryInfo = await prisma.inventory.findUnique({
                where: {
                    iid: iid[i],
                },
                select: {
                    InventoryName: true,
                }
            });

            const notification = await prisma.companyNotification.create({
                data: {
                    mid: mid,
                    Message: 'Your inventory ' + inventoryInfo.InventoryName + ' has been added to the Inventory Marketplace.',
                    DateAndTime: new Date(),
                    ReadStatus: false,
                    Priority: 'Low',
                },
            });
        }
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
                OwnerID: true,
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
                        Company: {
                            select: {
                                Name: true,
                                Logo: true,
                                PhoneNumber: true,
                                Email: true,
                            }
                        },
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
            inventoryMarketplaceData[i].OwnerName = inventoryMarketplaceData[i].Inventory.Company.Name;
            inventoryMarketplaceData[i].OwnerLogo = inventoryMarketplaceData[i].Inventory.Company.Logo;
            inventoryMarketplaceData[i].OwnerPhoneNumber = inventoryMarketplaceData[i].Inventory.Company.PhoneNumber;
            inventoryMarketplaceData[i].OwnerEmail = inventoryMarketplaceData[i].Inventory.Company.Email;
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




module.exports.ownLeasedInventories = async (req, res) => {
    const mid = req.body.mid;
    try {

        const inventoryMarketplaceData = await prisma.rental.findMany({
            where: {
                OwnedToID: mid,
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
                OwnerID: true,
                Company_Rental_OwnerIDToCompany: {
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
            inventoryMarketplaceData[i].CompanyName = inventoryMarketplaceData[i].Company_Rental_OwnerIDToCompany.Name;
            inventoryMarketplaceData[i].CompanyLogo = inventoryMarketplaceData[i].Company_Rental_OwnerIDToCompany.Logo;
            delete inventoryMarketplaceData[i].Company_Rental_OwnerIDToCompany;
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
        let { rid, iid, OwnedToID, Duration, TransactionID } = req.body;
        console.log(req.body);
        Duration = parseInt(Duration);

        const OccupiedFrom = new Date();
        let OccupiedTill = new Date();
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
                TransactionID: TransactionID,
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

        const inventoryInfo = await prisma.inventory.findUnique({
            where: {
                iid: iid,
            },
            select: {
                InventoryName: true,
                RealOwner: true,
            }
        });

        const OwnedToInfo = await prisma.company.findUnique({
            where: {
                mid: OwnedToID,
            },
            select: {
                Name: true,
            }
        });

        const notification = await prisma.companyNotification.create({
            data: {
                mid: inventoryInfo.RealOwner,
                Message: 'Your inventory ' + inventoryInfo.InventoryName + ' has been taken on lease for ' + Duration + ' days by ' + OwnedToInfo.Name,
                DateAndTime: new Date(),
                ReadStatus: false,
                Priority: 'Mid',
            },
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




module.exports.extendLease = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { rid, OccupiedTill, TransactionID } = req.body;

        const OccupiedTillDate = new Date(OccupiedTill);

        const rentedInventory = await prisma.rental.update({
            where: {
                rid: rid,
                RentalStatus: 'Rented',
            },
            data: {
                OccupiedTill: OccupiedTillDate,
                TransactionID: TransactionID,
            },
        });

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease Extended successfully',
        });

        const OwnerInfo = await prisma.rental.findUnique({
            where: {
                rid: rid,
            },
            select: {
                OwnerID: true,
                OwnedToID: true,
                Company_Rental_OwnedToIDToCompany: {
                    select: {
                        Name: true,
                    }
                },
                iid: true,
                Inventory: {
                    select: {
                        InventoryName: true,
                    },    
                }
            }
        });

        const notification = await prisma.companyNotification.create({
            data: {
                mid: OwnerInfo.OwnerID,
                Message: 'Your ' + OwnerInfo.Inventory.InventoryName + ' has been extended on lease till ' + OccupiedTill + ' by ' + OwnerInfo.Company_Rental_OwnedToIDToCompany.Name,
                DateAndTime: new Date(),
                ReadStatus: false,
                Priority: 'Mid',
            },
        });
    } catch (error) {
        console.error('Error extending lease:', error);
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};

module.exports.deleteFromRental = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { rid } = req.body;

        const deleteRental = await prisma.rental.delete({
            where: {
                rid: rid,
            }
        });

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Inventory removed from rental successfully',
        });
    } catch (error) {
        console.error('Error removing inventory from rental:', error);

            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};