const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.emptyInventoryList = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { MID } = req.body;

        // Example empty inventories data
        const emptyInventories = await prisma.inventory.findMany({
            where: {
                mid: MID,
                RealOwner: MID,
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
        console.error('Error fetching empty inventories:', error);

        // Responding with client errors
        if (error instanceof UnauthorizedError) {
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

module.exports.giveLease = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { IID, MID, Duration, PaymentPerDay } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save lease details to the database or perform other actions

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease given successfully',
        });
    } catch (error) {
        console.error('Error giving lease:', error);

        // Responding with client errors
        if (error instanceof NotFoundError) {
            // Assuming NotFoundError is a custom error class for not found errors
            res.status(404).json({
                success: false,
                message: 'Not Found: Inventory not found',
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

module.exports.inventoryMarketplace = (req, res) => {
    try {
        // TODO: Fetch inventories from the database based on lease status or other criteria

        // Example inventories data for demonstration purposes
        const inventoryMarketplaceData = [
            {
                RID: "RETAILER001",
                IID: "INV001",
                MID: "MANUFACTURER123",
                Duration: 30,
                PaymentPerDay: 10.0,
                InventoryName: "Warehouse A",
                Capacity: 1000,
                Type: "Warehouse",
                HouseNumber: "123",
                Street: "Main Street",
                ZIP: "12345",
                Thana: "Cityville Thana",
                Division: "Dhaka",
                AddressDetails: "123 Main Street, Cityville",
                Image: "warehouse_image_url.jpg",
            },
            {
                RID: "RETAILER002",
                IID: "INV002",
                MID: "MANUFACTURER456",
                Duration: 15,
                PaymentPerDay: 8.0,
                InventoryName: "Storage Facility B",
                Capacity: 500,
                Type: "Storage",
                HouseNumber: "456",
                Street: "Oak Avenue",
                ZIP: "67890",
                Thana: "Townsville Thana",
                Division: "Chittagong",
                AddressDetails: "456 Oak Avenue, Townsville",
                Image: "storage_image_url.jpg",
            },
            // Add more inventory objects as needed
        ];

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

module.exports.takeLease = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { RID, IID, LeaseFromMID, LeaseToMID } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save lease details to the database or perform other actions

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Lease taken successfully',
        });
    } catch (error) {
        console.error('Error taking lease:', error);

        // Responding with client errors
        if (error instanceof NotFoundError) {
            // Assuming NotFoundError is a custom error class for not found errors
            res.status(404).json({
                success: false,
                message: 'Not Found: Inventory not found',
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