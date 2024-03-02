const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports.addVoucher = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const VoucherCode = req.body.VoucherCode;
        const manufacturerId = req.body.manufacturerId;
        const VoucherDetails = req.body.VoucherDetails;
        const VoucherPercentage = req.body.VoucherPercentage;
        const Validity = new Date(req.body.Validity);
        const MinPurchase = req.body.MinPurchase;
        const MaxUsage = req.body.MaxUsage;

        const user = await prisma.voucher.create({
            data: {
              VoucherCode: VoucherCode,
              mid: manufacturerId,
              VoucherDetails: VoucherDetails,
              VoucherPercentage: VoucherPercentage,
              Validity: Validity,
              MinPurchase: MinPurchase,
              MaxUsage: MaxUsage,
            },
          });

        // Responding with success (201 - Created)
        res.status(201).json({
            success: true,
            message: 'Voucher added successfully',
        });
    } catch (error) {
            // Responding with server errors
            console.error('Error adding voucher:', error);
            if (error.code === 'P2002') {
                // P2002 is the Prisma error code for unique constraint violation
                console.error('Duplicate entry error:', error.meta.target);
                res.status(409).json({
                    success: false,
                    message: 'Conflict: Voucher with the provided code already exists',
                });
            } else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
            }    
    }
}

module.exports.deleteVoucher = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        

        const deleteVoucher = await prisma.voucher.delete({
            where: {
                VoucherCode: req.body.VoucherCode,
            },
        });

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Voucher deleted successfully',
        });
    } catch (error) {

            console.log('Error deleting voucher:', error);
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};

module.exports.fetchVouchers = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const sid = req.body.sid;
        const today = new Date();
        vouchers = [];

        const manufacturerInfo = await prisma.cart.findMany({
            where: {
              sid: sid,
            },
            distinct: ['mid'],
            select: {
                mid: true,
            },
        });
    
        for(let i = 0; i < manufacturerInfo.length; i++) {
 
            const totalPrice = await prisma.cart.groupBy({
                by: ['mid'],
                where: {
                    sid: sid,
                    mid: manufacturerInfo[i].mid,
                },
                _sum: {
                    Price: true,
                }
            });

            const vouchers1 = await prisma.voucher.findMany({
                where: {
                  mid: manufacturerInfo[i].mid,
                  MinPurchase: {
                    lte: totalPrice[0]._sum.Price,
                  },
                  Validity: {
                    gt: today,
                  },
                  VoucherCode: {
                    not: 'ZERO',
                  },
                },
              });

            for(let j = 0; j < vouchers1.length; j++) {
                const usage = await prisma.voucherUsage.findMany({
                    where: {
                      sid: sid,
                      VoucherCode: vouchers1[j].VoucherCode,
                    },
                  });
                
                if(usage.length){
                   if(usage[0].Usage >= vouchers1[j].MaxUsage){
                      vouchers1.splice(j, 1);
                      j--;    
                   } 
                }  
            }

            for (const voucher of vouchers1) {
                vouchers.push(voucher);
            }



        }
        res.status(200).json(vouchers);
    } catch (error) {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};



module.exports.fetchVouchersByManufacturer = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const mid = req.body.manufacturerId;

            const vouchers = await prisma.voucher.findMany({
                where: {
                  mid: mid,
                  VoucherCode: {
                    not: 'ZERO',
                  },
                },
                select: {
                    VoucherCode: true,
                    VoucherDetails: true,
                    VoucherPercentage: true,
                    Validity: true,
                    MinPurchase: true,
                    MaxUsage: true,
                }
              });

        res.status(200).json(vouchers);
    } catch (error) {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
    }
};


module.exports.updateVoucher = async (req, res) => {
    try {
        // Extracting input parameters from the request body
        const VoucherCode = req.body.VoucherCode;
        const VoucherDetails = req.body.VoucherDetails;
        const VoucherPercentage = req.body.VoucherPercentage;
        const Validity = new Date(req.body.Validity);
        const MinPurchase = req.body.MinPurchase;
        const MaxUsage = req.body.MaxUsage;

        const user = await prisma.voucher.update({
            where: {
                VoucherCode: VoucherCode,
            },
            data: {
              VoucherDetails: VoucherDetails,
              VoucherPercentage: VoucherPercentage,
              Validity: Validity,
              MinPurchase: MinPurchase,
              MaxUsage: MaxUsage,
            },
          });

        // Responding with success (201 - Created)
        res.status(200).json({
            success: true,
            message: 'Voucher updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });    
    }
};


module.exports.updateVoucherUsage = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const { voucherCode, SID } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Update the voucher usage in the database or perform other actions

        // Responding with success
        res.status(200).json({
            success: true,
            message: 'Voucher usage updated successfully',
        });
    } catch (error) {
        console.error('Error updating voucher usage:', error);

        // Responding with client errors
        if (error instanceof NotFoundError) {
            // Assuming NotFoundError is a custom error class for not found errors
            res.status(404).json({
                success: false,
                message: 'Not Found: Voucher not found',
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