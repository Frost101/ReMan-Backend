const express = require('express');
const { PrismaClient } = require('@prisma/client');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.COOKIE_SECRET, {
        expiresIn: maxAge
    });
};


const prisma = new PrismaClient();

module.exports.addRetailer = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            ShopPhoneNumber,
            TIN,
            ShopName,
            ShopType,
            Website,
            ShopEmail,
            Password,
            ShopImage,
            HouseNumber,
            Street,
            ZIP,
            Thana,
            Division,
            AddressDetails,
            OwnerName,
            OwnerDateOfBirth,
            OwnerImage,
            OwnerNID,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save retailer details to the database or perform other actions

        bcrypt.hash(Password, 10, async function (err, hash) {
            if (err) {
                res.status(400).json({ err });
                return;
            }
            else {
                const user = await prisma.shop.create({
                    data: {
                        PhoneNumber: ShopPhoneNumber,
                        Name: ShopName,
                        Type: ShopType,
                        tin: TIN,
                        RetailPoints: 0,
                        Email: ShopEmail,
                        Website: Website,
                        Password: hash,
                        Logo: ShopImage,
                        HouseNumber: HouseNumber,
                        Street: Street,
                        zip: ZIP,
                        Thana: Thana,
                        Division: Division,
                        AddressDetails: AddressDetails,
                    },
                });
                const token = createToken(user.ShopID);
                res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                res.status(201).json({
                    user: user.ShopID,
                    message: 'Retailer created successfully'
                });
            }
        });

        // const user = await prisma.shop.create({
        //     data: {
        //         PhoneNumber: ShopPhoneNumber,
        //         Name: ShopName,
        //         Type: ShopType,
        //         tin: TIN,
        //         RetailPoints: 0,
        //         Email: ShopEmail,
        //         Website: Website,
        //         Password: Password,
        //         Logo: ShopImage,
        //         HouseNumber: HouseNumber,
        //         Street: Street,
        //         zip: ZIP,
        //         Thana: Thana,
        //         Division: Division,
        //         AddressDetails: AddressDetails,
        //     },
        // });

        // // Responding with success
        // res.status(201).json({
        //     success: true,
        //     message: 'Retailer created successfully',
        // });
    } catch (error) {
        console.error('Error adding retailer:', error);
        if (error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
                success: false,
                message: 'Conflict: Retailer with the provided phone number already exists',
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

module.exports.addCompany = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            PhoneNumber,
            TIN,
            Name,
            Type,
            Website,
            Email,
            Password,
            Logo,
            HouseNumber,
            Street,
            ZIP,
            Thana,
            Division,
            AddressDetails,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save company details to the database or perform other actions

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Manufacturing company created successfully',
        });
    } catch (error) {
        console.error('Error adding manufacturing company:', error);

        // Responding with client errors
        if (error instanceof ValidationError) {
            // Assuming ValidationError is a custom error class for validation errors
            res.status(400).json({
                success: false,
                message: 'Bad Request: Invalid input data',
            });
        } else if (error instanceof DuplicateEntryError) {
            // Assuming DuplicateEntryError is a custom error class for duplicate entry errors
            res.status(409).json({
                success: false,
                message: 'Conflict: Company with the provided data already exists',
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

module.exports.addManufacturingCompanyOwner = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            MID,
            OwnerName,
            OwnerDateOfBirth,
            OwnerImage,
            OwnerEmail,
            OwnerPhone,
            OwnerNID,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save owner details to the database or perform other actions

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Owner created successfully under the manufacturing company',
        });
    } catch (error) {
        console.error('Error adding manufacturing company owner:', error);

        // Responding with client errors
        if (error instanceof ValidationError) {
            // Assuming ValidationError is a custom error class for validation errors
            res.status(400).json({
                success: false,
                message: 'Bad Request: Invalid input data',
            });
        } else if (error instanceof DuplicateEntryError) {
            // Assuming DuplicateEntryError is a custom error class for duplicate entry errors
            res.status(409).json({
                success: false,
                message: 'Conflict: Owner with the provided data already exists',
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
